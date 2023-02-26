const express = require('express');
const router = express.Router();

const clientController = require('./controllers/clientController');
const authController = require('./controllers/authController');
const exerciseController = require('./controllers/exerciseController');
const themeController = require('./controllers/themeController');
const imageController = require('./controllers/imageController');
const multerConfig = require('./middleware/multer-config');

/**
 * @function sanitizer - used to filter any dirty html
 */
const sanitizer = require('./middleware/bodySanitizer');

/**
 * @function isAdmin - used to check if the user is an admin
 */
const isAdmin = require('./middleware/isAdmin');

/**
 * @module jwt - used to check the token validity,
 * jwtSecret and algorithmsJWT are required to setup,
 * jwt is stored into httpOnly cookie,
 * If token is valid, will go to next middleware, if not, will throw an error
 */
const { expressjwt: jwt } = require('express-jwt');
const jwtSecret = process.env.JWTSECRET;
const algorithmsJWT = process.env.JWTALGO;
/**
 * @function authorizationMiddlewareLetPass - used to check the token but let pass everyone if the token is not present by the line credentialsRequired: false
 */
const authorizationMiddlewareLetPass = jwt({
  secret: jwtSecret,
  algorithms: [algorithmsJWT],
  credentialsRequired: false,
  getToken: (req) => req.cookies.token,
});
/**
 * @function authorizationMiddlewareNotPass - used to check the token and stop everyone if the token is not valid
 */
const authorizationMiddlewareNotPass = jwt({
  secret: jwtSecret,
  algorithms: [algorithmsJWT],
  getToken: (req) => req.cookies.token,
});
/**
 * @function authorizationMiddlewareNewPassword - used to check the token in the headers and stop everyone if the token is not valid
 */
const authorizationMiddlewareNewPassword = jwt({
  secret: jwtSecret,
  algorithms: [algorithmsJWT],
});

router
  .route('/csrf-token')
  /**
   * road used by the React App upon loading to retrieve a csrf token,
   * this token will be sent into a cookie as well as a header set by the React App,
   * the csrf middleware in the entry file of the server is in charge of checking
   * that both the tokens (sent in cookie + sent in header) are a match,
   * this is to ensure the React App is the source of the request
   * @route GET /csrf-token
   * @group auth - authorisation and security
   * @returns {Error}  default - invalid csrf token
   */
  .get(authController.getCSRFToken);

router
  .route('/admin/image/:id')
  /**
   * @route DELETE /admin/image/:id
   * @param {Number} [id] - id from picture
   * @group picture - picture management
   * @returns {object} 200 - { message: "picture deleted" }
   * @returns {Error}  406 - { errorType: 406, message: `the provided id must be a number` }
   * @returns {Error}  404 - { errorType: 404, message: `miss image` }
   * @returns {Error}  500 - { error: err, message: 'error deleting file' }
   */
  .delete(authorizationMiddlewareNotPass, sanitizer, isAdmin, imageController.deleteOneImage);

router
  .route('/signout')
  /**
   * @route GET /signout
   * @group auth - authorisation and security
   * @returns {object} 200 - { message: 'signed out' }
   */
  .get(sanitizer, authController.signout);

router
  .route('/clients')
  /**
   * @route GET /clients
   * @group client - everythings about user
   * @returns {object} 200 - count of total users and an array with all users
   * @returns {Error}  500 - Unexpected error
   */
  .get(authorizationMiddlewareNotPass, sanitizer, isAdmin, clientController.getAllClients);

router
  .route('/clients/:id')
  /**
   * @route PATCH /clients/:id
   * @param {Number} [id] - id from user
   * @group client - everythings about user
   * @returns {object} 200 - { message: 'client update' }
   * @returns {Error}  406 - { errorType: 406, message: `the provided id must be a number` }
   * @returns {Error}  400 - { errorType: 400, message: `the status must be client or admin` }
   * @returns {Error}  404 - { errorType: 404, message: `miss client` }
   * @returns {Error}  500 - Unexpected error
   */
  .patch(authorizationMiddlewareNotPass, sanitizer, isAdmin, clientController.changeRoleClient)
  /**
   * @route DELETE /clients/:id
   * @param {Number} [id] - id from user
   * @group client - everythings about user
   * @returns {object} 200 - { message: 'client deleted' }
   * @returns {Error}  406 - { errorType: 406, message: `the provided id must be a number` }
   * @returns {Error}  404 - { errorType: 404, message: `miss client` }
   * @returns {Error}  500 - Unexpected error
   */
  .delete(authorizationMiddlewareNotPass, sanitizer, isAdmin, clientController.deleteOneClient);

router
  .route('/profile')
  /**
   * Road used by the user to see/change/delete his profile.
   * @route GET /profile
   * @group client - everythings about user
   * @returns {object} 200 - An object with user info
   * @returns {Error}  406 - { errorType: 406, message: `the provided id must be a number` }
   * @returns {Error}  500 - Unexpected error
   */
  .get(authorizationMiddlewareNotPass, sanitizer, clientController.getOneClient)
  /**
   * @route PATCH /profile
   * @group client - everythings about user
   * @returns {object} 200 - An object with user info
   * @returns {Error}  401 - { errorType: 401, message: `unauthorized` }
   * @returns {Error}  406 - { errorType: 406, message: `the provided id must be a number, or email used, or incorrect, or password and confirm is not the same` }
   * @returns {Error}  411 - { errorType: 411, message: `password need 6` }
   * @returns {Error}  500 - Unexpected error
   */
  .patch(authorizationMiddlewareNotPass, sanitizer, clientController.updateClient)
  /**
   * @route DELETE /profile
   * @group client - everythings about user
   * @returns {object} 200 - { message: 'profile deleted' }
   * @returns {Error}  404 - { errorType: 404, message: `miss client` }
   * @returns {Error}  406 - { errorType: 406, message: `the provided id must be a number` }
   * @returns {Error}  500 - Unexpected error
   */
  .delete(authorizationMiddlewareNotPass, sanitizer, clientController.deleteProfileClient);

router
  .route('/signin')
  /**
   * @route POST /signin
   * @group auth - authorisation and security
   * @returns {object} 200 - { id: client.id, pseudo: client.pseudo, email: client.email, responsibility: client.responsibility, picture_id: client.picture_id, client_picture: client.client_picture }
   * @returns {Error}  401 - { errorType: 401, message: `unauthorized` }
   * @returns {Error}  404 - { errorType: 404, message: `miss client` }
   * @returns {Error}  411 - { errorType: 411, message: `need email or password` }
   * @returns {Error}  500 - Unexpected error
   */
  .post(sanitizer, authController.submitLoginForm);

router
  .route('/upload_client')
  /**
   * @route POST /upload_client
   * @group client - everythings about user
   * @returns {object} 200 - { message: 'ok' }
   * @returns {Error}  406 - { errorType: 406, message: `the provided id must be a number` }
   * @returns {Error}  500 - Unexpected error
   */
  .post(authorizationMiddlewareNotPass, sanitizer, multerConfig, clientController.addImageToClient);

router
  .route('/upload_question')
  /**
   * @route POST /upload_question
   * @group picture - picture management
   * @returns {object} 200 - { pictureId: result.id, picturePath: result.path, pictureAlt: result.alternative }
   * @returns {Error}  500 - Unexpected error
   */
  .post(
    authorizationMiddlewareNotPass,
    sanitizer,
    isAdmin,
    multerConfig,
    exerciseController.addImageToQuestion,
  );

router
  .route('/signup')
  /**
   * @route POST /signup
   * @group auth - authorisation and security
   * @returns {object} 200 - An object with user info
   * @returns {Error}  411 - { errorType: 411, message: `need pseudo, or password need 6` }
   * @returns {Error}  406 - { errorType: 406, message: `email incorrect, or password and confirm not same, or email used` }
   * @returns {Error}  500 - Unexpected error or { errorType: 500, message: `mail failed` }
   */
  .post(sanitizer, authController.submitSignupForm);

router
  .route('/contact')
  /**
   * @route POST /contact
   * @group auth - authorisation and security
   * @returns {object} 200 - An array of user info
   * @returns {Error}  411 - { errorType: 411, message: `need name, or need content` }
   * @returns {Error}  406 - { errorType: 406, message: `email incorrect` }
   * @returns {Error}  500 - Unexpected error or { errorType: 500, message: `mail failed` }
   */
  .post(sanitizer, authController.submitContact);

router
  .route('/exercises')
  /**
   * @route GET /exercises
   * @group exercise - gestion exercises
   * @returns {object} 200 - An object with all exercises
   * @returns {Error}  500 - Unexpected error
   */
  .get(authorizationMiddlewareNotPass, sanitizer, isAdmin, exerciseController.getAllExercises);

router
  .route('/exercises_score')
  /**
   * @route GET /exercises_score
   * @group exercise - gestion exercises
   * @returns {object} 200 - An object with all exercises and score about the user
   * @returns {Error}  500 - Unexpected error
   */
  .get(authorizationMiddlewareNotPass, sanitizer, exerciseController.getAllExercisesWithScore);

router
  .route('/exercises/dragndrop/:id')
  /**
   * @route GET /exercises/dragndrop/:id
   * @param {Number} [id] - id from exercise
   * @group exercise - gestion exercises
   * @returns {object} 200 - An object with a complete exercise
   * @returns {Error}  406 - { errorType: 406, message: `the provided id must be a number` }
   * @returns {Error}  500 - Unexpected error
   */
  .get(authorizationMiddlewareLetPass, sanitizer, exerciseController.getOneExerciseVisitor)
  /**
 * @route POST /exercises/dragndrop/:id
 * @param {Number} [id] - id from exercise
 * @group exercise - gestion exercises
 * @returns {object} 200 - {
                message: `user finish with score: ${scoreResult}`,
                correction,
                scoreResult,
            }
 * @returns {Error}  406 - { errorType: 406, message: `the provided id must be a number` }
 * @returns {Error}  500 - Unexpected error 
 */
  .post(authorizationMiddlewareLetPass, exerciseController.submitExercise);

router
  .route('/themes_exercises')
  /**
   * @route GET /themes_exercises
   * @group themes - all themes for exercises
   * @returns {object} 200 - An object with all themes and exercises published
   * @returns {Error}  500 - Unexpected error
   */
  .get(authorizationMiddlewareLetPass, sanitizer, themeController.getAllThemesForExercises);

router
  .route('/themes_score')
  /**
   * @route GET /themes_score
   * @group themes - all themes for exercises
   * @returns {object} 200 - An object with all score by themes
   * @returns {Error}  500 - Unexpected error
   */
  .get(authorizationMiddlewareNotPass, sanitizer, themeController.getScoreByTheme);

router
  .route('/themes')
  /**
   * @route GET /themes
   * @group themes - all themes for exercises
   * @returns {object} 200 - An object with all themes
   * @returns {Error}  500 - Unexpected error
   */
  .get(sanitizer, themeController.getAllThemes);

router
  .route('/admin/exercises/new_exercise')
  /**
   * create exercise
   * @route POST /admin/exercises/new_exercise
   * @group exercise - gestion exercises
   * @returns {object} 200 - An object with a new exercise
   * @returns {Error}  500 - Unexpected error
   */
  .post(authorizationMiddlewareNotPass, sanitizer, isAdmin, exerciseController.newExercise);

router
  .route('/admin/exercises/new_question/:id')
  /**
   * create question
   * @route POST /admin/exercises/new_question/:id
   * @param {Number} [id] - id from exercise
   * @group exercise - gestion exercises
   * @returns {object} 200 - An object with a new question
   * @returns {Error}  406 - { errorType: 406, message: `the provided id must be a number` }
   * @returns {Error}  500 - Unexpected error
   */
  .post(authorizationMiddlewareNotPass, sanitizer, isAdmin, exerciseController.newQuestion)
  /**
   * @route PATCH /admin/exercises/new_question/:id
   * @param {Number} [id] - id from exercise
   * @group exercise - gestion exercises
   * @returns {object} 200 - An object with the question changed
   * @returns {Error}  406 - { errorType: 406, message: `the provided id must be a number` }
   * @returns {Error}  500 - Unexpected error
   */
  .patch(authorizationMiddlewareNotPass, sanitizer, isAdmin, exerciseController.changeQuestion)
  /**
   * @route DELETE /admin/exercises/new_question/:id
   * @param {Number} [id] - id from exercise
   * @group exercise - gestion exercises
   * @returns {object} 200 - { message: 'question deleted' }
   * @returns {Error}  404 - { errorType: 404, message: `question does not exist` }
   * @returns {Error}  406 - { errorType: 406, message: `the provided id must be a number` }
   * @returns {Error}  500 - Unexpected error
   */
  .delete(authorizationMiddlewareNotPass, sanitizer, isAdmin, exerciseController.deleteQuestion);

router
  .route('/admin/exercises/new_answer/:id')
  /**
   * create answer
   * @route POST /admin/exercises/new_answer/:id
   * @param {Number} [id] - id from question
   * @group exercise - gestion exercises
   * @returns {object} 200 - An object with a new answer
   * @returns {Error}  406 - { errorType: 406, message: `the provided id must be a number` }
   * @returns {Error}  500 - Unexpected error
   */
  .post(authorizationMiddlewareNotPass, sanitizer, isAdmin, exerciseController.newAnswer)
  /**
   * @route PATCH /admin/exercises/new_answer/:id
   * @param {Number} [id] - id from question
   * @group exercise - gestion exercises
   * @returns {object} 200 - An object with the answer changed
   * @returns {Error}  406 - { errorType: 406, message: `the provided id must be a number` }
   * @returns {Error}  500 - Unexpected error
   */
  .patch(authorizationMiddlewareNotPass, sanitizer, isAdmin, exerciseController.changeAnswer)
  /**
   * @route DELETE /admin/exercises/new_answer/:id
   * @param {Number} [id] - id from question
   * @group exercise - gestion exercises
   * @returns {object} 200 - { message: 'answer deleted' }
   * @returns {Error}  404 - { errorType: 404, message: `answer does not exist` }
   * @returns {Error}  406 - { errorType: 406, message: `the provided id must be a number` }
   * @returns {Error}  500 - Unexpected error
   */
  .delete(authorizationMiddlewareNotPass, sanitizer, isAdmin, exerciseController.deleteAnswer);

router
  .route('/admin/exercises/associate_exercise_theme')
  /**
   * create assosiation exercise/theme
   * @route POST /admin/exercises/associate_exercise_theme
   * @param {Number} [exercise_id] - id from exercise
   * @param {Number} [theme_id] - id from theme
   * @group exercise - gestion exercises
   * @returns {object} 200 - An object with the current exercise
   * @returns {Error}  406 - { errorType: 406, message: `need exercise_id and theme_id`, or need exercise and theme }
   * @returns {Error}  500 - Unexpected error
   */
  .post(
    authorizationMiddlewareNotPass,
    sanitizer,
    isAdmin,
    exerciseController.associate_exercise_theme,
  )
  /**
   * @route DELETE /admin/exercises/associate_exercise_theme
   * @param {Number} [exercise_id] - id from exercise
   * @param {Number} [theme_id] - id from theme
   * @group exercise - gestion exercises
   * @returns {object} 200 - An object with the current exercise
   * @returns {Error}  406 - { errorType: 406, message: `need exercise_id and theme_id`, or need exercise and theme }
   * @returns {Error}  500 - Unexpected error
   */
  .delete(
    authorizationMiddlewareNotPass,
    sanitizer,
    isAdmin,
    exerciseController.delete_exercise_theme,
  );

router
  .route('/admin/exercises/:id')
  /**
   * @route GET /admin/exercises/:id
   * @param {Number} [id] - id from exercise
   * @group exercise - gestion exercises
   * @returns {object} 200 - An object with a complete exercise
   * @returns {Error}  406 - { errorType: 406, message: `the provided id must be a number` }
   * @returns {Error}  500 - Unexpected error
   */
  .get(authorizationMiddlewareNotPass, sanitizer, isAdmin, exerciseController.getOneExerciseAdmin)
  /**
   * @route PATCH /admin/exercises/:id
   * @param {Number} [id] - id from exercise
   * @group exercise - gestion exercises
   * @returns {object} 200 - An object with the exercise changed
   * @returns {Error}  406 - { errorType: 406, message: `the provided id must be a number` }
   * @returns {Error}  500 - Unexpected error
   */
  .patch(authorizationMiddlewareNotPass, sanitizer, isAdmin, exerciseController.changeExercise)
  /**
   * @route DELETE /admin/exercises/:id
   * @param {Number} [id] - id from exercise
   * @group exercise - gestion exercises
   * @returns {object} 200 - { message: 'exercise deleted' }
   * @returns {Error}  404 - { errorType: 404, message: `miss exercise` }
   * @returns {Error}  406 - { errorType: 406, message: `the provided id must be a number` }
   * @returns {Error}  500 - Unexpected error
   */
  .delete(authorizationMiddlewareNotPass, sanitizer, isAdmin, exerciseController.deleteOneExercise);

router
  .route('/forget')
  /**
   * forget password client
   * @route POST /forget
   * @group auth - authorisation and security
   * @returns {object} 200 - { message: 'mail send' }
   * @returns {Error}  404 - { errorType: 404, message: `email not found` }
   * @returns {Error}  406 - { errorType: 406, message: `email incorrect` }
   * @returns {Error}  411 - { errorType: 411, message: `need name` }
   * @returns {Error}  500 - Unexpected error, or { errorType: 500, message: `mail failed` }
   */
  .post(sanitizer, authController.forgetPassword)
  /**
   * @route PATCH /forget
   * @group auth - authorisation and security
   * @returns {object} 200 - { message: ''mdp updated, mail send' }
   * @returns {Error}  404 - { errorType: 404, message: `user not found` }
   * @returns {Error}  406 - { errorType: 406, message: `password and confirm not same` }
   * @returns {Error}  411 - { errorType: 411, message: `password need 6` }
   * @returns {Error}  500 - Unexpected error, or { errorType: 500, message: `mail failed` }
   */
  .patch(authorizationMiddlewareNewPassword, sanitizer, authController.newPassword);

module.exports = router;
