const {
  Exercise,
  Client,
  Client_exercise,
  Question,
  Possible_answer,
  Theme,
  Picture,
} = require('../models');

/**
 * @module exerciseController
 */
module.exports = {
  getAllExercisesWithScore: async (req, res, next) => {
    try {
      let clientId = null;
      if (req.auth) {
        clientId = req.auth.clientId;
      }
      const exercises = await Exercise.findAndCountAll({
        where: {
          published: true,
        },
        include: [
          'themes',
          {
            association: 'clients',
            where: {
              id: clientId,
            },
            required: false,
            attributes: {
              exclude: ['password', 'email', 'pseudo', 'responsibility_id', 'picture_id'],
            },
          },
        ],
      });
      return res.status(200).json(exercises);
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  getAllExercises: async (req, res, next) => {
    try {
      const page = Number(req.query.page) - 1 || 0;
      const limit = Number(req.query.limit) || 30;
      const exercises = await Exercise.findAndCountAll({
        include: ['themes'],
        distinct: true,
        offset: page * limit,
        limit: limit,
      });
      return res.status(200).json(exercises);
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  getOneExerciseVisitor: async (req, res, next) => {
    try {
      let clientId = null;
      if (req.auth) {
        clientId = req.auth.clientId;
      }
      /** @name id - id of exercise */
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(406).json({
          errorType: 406,
          message: `the provided id must be a number`,
        });
      }
      const exercise = await Exercise.findByPk(id, {
        include: [
          'kind',
          'themes',
          {
            association: 'questions',
            attributes: { exclude: ['explanation'] },
            include: [
              {
                association: 'possible_answers',
                attributes: { exclude: ['correct'] },
              },
              'question_picture',
            ],
          },
          { model: Client, as: 'clients', where: { id: clientId }, required: false },
        ],
      });
      return res.status(200).json(exercise);
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  getOneExerciseAdmin: async (req, res, next) => {
    try {
      /** @name id - id of exercise */
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(406).json({
          errorType: 406,
          message: `the provided id must be a number`,
        });
      }
      const exercise = await Exercise.findByPk(id, {
        include: [
          'kind',
          'themes',
          {
            association: 'questions',
            include: ['possible_answers', 'question_picture'],
          },
        ],
      });
      return res.status(200).json(exercise);
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  changeExercise: async (req, res, next) => {
    try {
      const dataExercise = req.body;
      /** @name id - id of exercise */
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(406).json({
          errorType: 406,
          error: `the provided id must be a number`,
        });
      }
      const exercise = await Exercise.findByPk(id);
      if (dataExercise.published) {
        dataExercise.published = Boolean(dataExercise.published);
      } else {
        dataExercise.published = false;
      }
      for (const properties in dataExercise) {
        if (typeof exercise[properties] !== 'undefined') {
          exercise[properties] = dataExercise[properties];
        }
      }
      await exercise.save();
      return res.status(200).json(exercise);
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  deleteOneExercise: async (req, res, next) => {
    try {
      /** @name id - id of exercise */
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(406).json({
          errorType: 406,
          message: `the provided id must be a number`,
        });
      }
      const exercise = await Exercise.findByPk(id);

      if (!exercise) {
        return res.status(404).json({
          errorType: 404,
          message: 'miss exercise',
        });
      }
      await exercise.destroy({
        include: [
          {
            association: 'questions',
            include: ['possible_answers', 'question_picture'],
          },
        ],
      });
      return res.json({ message: 'exercise deleted' });
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  newExercise: async (req, res, next) => {
    try {
      const newExercise = new Exercise({
        title: req.body.title,
        brief: req.body.brief,
        slug: req.body.slug,
        content: req.body.content,
        published: false,
        picture_id: Number(req.body.picture_id),
      });
      await newExercise.save();
      return res.status(200).json(newExercise);
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  newQuestion: async (req, res, next) => {
    try {
      /** @name id - id of exercise */
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(406).json({
          errorType: 406,
          message: `the provided id must be a number`,
        });
      }
      if (req.body.picture_id) {
        req.body.picture_id = Number(req.body.picture_id);
      } else {
        req.body.picture_id = null;
      }
      const newQuestion = new Question({
        brief: req.body.brief,
        code: req.body.code,
        explanation: req.body.explanation,
        exercise_id: id,
        picture_id: req.body.picture_id,
      });
      await newQuestion.save();
      return res.status(200).json(newQuestion);
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  changeQuestion: async (req, res, next) => {
    try {
      const dataQuestion = req.body;
      if (dataQuestion.picture_id) {
        dataQuestion.picture_id = Number(dataQuestion.picture_id);
      } else {
        dataQuestion.picture_id = null;
      }
      /** @name id - id of question */
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(406).json({
          errorType: 406,
          message: `the provided id must be a number`,
        });
      }
      const question = await Question.findByPk(id);
      for (const properties in dataQuestion) {
        if (typeof question[properties] !== 'undefined') {
          question[properties] = dataQuestion[properties];
        }
      }
      await question.save();
      return res.status(200).json(question);
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  deleteQuestion: async (req, res, next) => {
    try {
      /** @name id - id of question */
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(406).json({
          errorType: 406,
          message: `the provided id must be a number`,
        });
      }
      const question = await Question.findByPk(id);

      if (!question) {
        return res.status(404).json({
          errorType: 404,
          message: 'question does not exist',
        });
      }
      await question.destroy({
        include: ['possible_answers', 'question_picture'],
      });
      return res.json({ message: 'question deleted' });
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  newAnswer: async (req, res, next) => {
    try {
      /** @name id - id of question */
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(406).json({
          errorType: 406,
          message: `the provided id must be a number`,
        });
      }
      const newAnswer = new Possible_answer({
        content: req.body.content,
        correct: Boolean(req.body.correct),
        question_id: id,
      });
      await newAnswer.save();
      return res.status(200).json(newAnswer);
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  changeAnswer: async (req, res, next) => {
    try {
      const dataAnswer = req.body;
      dataAnswer.correct = Boolean(dataAnswer.correct);
      /** @name id - id of answer */
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(406).json({
          errorType: 406,
          message: `the provided id must be a number`,
        });
      }
      const answer = await Possible_answer.findByPk(id);
      for (const properties in dataAnswer) {
        if (typeof answer[properties] !== 'undefined') {
          answer[properties] = dataAnswer[properties];
        }
      }
      await answer.save();
      return res.status(200).json(answer);
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  deleteAnswer: async (req, res, next) => {
    try {
      /** @name id - id of answer */
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(406).json({
          errorType: 406,
          message: `the provided id must be a number`,
        });
      }
      const answer = await Possible_answer.findByPk(id);

      if (!answer) {
        return res.status(404).json({
          errorType: 404,
          message: 'answer does not exist',
        });
      }
      await answer.destroy();
      return res.json({ message: 'answer delete' });
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  associate_exercise_theme: async (req, res, next) => {
    try {
      const exerciseId = Number(req.body.exercise_id);
      const themeId = Number(req.body.theme_id);
      if ((exerciseId || themeId) === null) {
        return res.status(406).json({
          errorType: 406,
          message: `need exercise_id and theme_id`,
        });
      }
      let exercise = await Exercise.findByPk(exerciseId);
      let theme = await Theme.findByPk(themeId);
      if (!exercise || !theme) {
        return res.status(406).json({
          errorType: 406,
          message: `need exercise and theme`,
        });
      }
      await exercise.addTheme(theme);
      exercise = await Exercise.findByPk(exerciseId, {
        include: 'themes',
      });
      return res.status(200).json(exercise);
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  delete_exercise_theme: async (req, res, next) => {
    try {
      const exerciseId = Number(req.body.exercise_id);
      const themeId = Number(req.body.theme_id);
      if ((exerciseId || themeId) === null) {
        return res.status(406).json({
          errorType: 406,
          message: `need exercise_id and theme_id`,
        });
      }
      let exercise = await Exercise.findByPk(exerciseId);
      let theme = await Theme.findByPk(themeId);
      if (!exercise || !theme) {
        return res.status(406).json({
          errorType: 406,
          message: `need exercise and theme`,
        });
      }
      await exercise.removeTheme(theme);
      exercise = await Exercise.findByPk(exerciseId, {
        include: 'themes',
      });
      return res.status(200).json(exercise);
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  submitExercise: async (req, res, next) => {
    try {
      /** we check the id about the exercise */
      const exerciseId = Number(req.params.id);
      if (isNaN(exerciseId)) {
        return res.status(406).json({
          errorType: 406,
          message: `the provided id must be a number`,
        });
      }

      /** we take in database the exercise with: the relation about user, all questions and only the correct possible answers */
      const exercise = await Exercise.findByPk(exerciseId, {
        include: [
          'clients',
          {
            association: 'questions',
            include: [
              {
                association: 'possible_answers',
                attributes: { exclude: ['content', 'correct'] },
                where: {
                  correct: true,
                },
              },
            ],
          },
        ],
      });

      /** here we make an array with: for each question an object contains the id of the question, the id of the correct answer and the explaination
       *  example about correction: [ { id: 6, rightAnswers: [ 20 ], explanation: '<p>@todo</p>' } ]
       */
      const correction = exercise.questions.map((question) => ({
        id: question.id,
        rightAnswers: question.possible_answers.map((answer) => answer.id),
        explanation: question.explanation,
      }));

      /** then we init the function reducer and the successfulQuestions by an empty array */
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const successfulQuestions = [];

      /** for every question the user can give all answers, but we want to say that the user have good only if he give the correct answers
       * to check we count all the user answers by the id's and count all the correct answers by the id's too
       * if the counting is match the user have a good point
       */
      for (question of correction) {
        /** here we take the id of every answers that give the user */
        const userAnswers = req.body.find(
          (userData) => userData.questionId === question.id,
        ).answers;
        /** and the we count the id's */
        const countUserAnswers = userAnswers.reduce(reducer);
        /** we count the id's too about only correct answers */
        const countRightAnswers = question.rightAnswers.reduce(reducer);
        /** check match counting */
        if (countUserAnswers === countRightAnswers) {
          successfulQuestions.push(question.id);
        }
      }

      /** we make a pourcentage about the user good answers and the number total of questions in this exercise */
      const scoreResult = Math.round(
        (successfulQuestions.length / exercise.questions.length) * 100,
      );

      /** if conected user, we take he's infomations in database */
      if (req.auth) {
        const clientId = req.auth.clientId;
        const client = await Client.findByPk(clientId, {
          include: [
            { model: Exercise, as: 'exercises', where: { id: exercise.id }, required: false },
          ],
        });

        /** If user never played this exercise, i can directly save his score and return the result */
        if (!client.exercises[0]) {
          const result = new Client_exercise({
            score: scoreResult,
            client_id: clientId,
            exercise_id: exerciseId,
          });
          await result.save();
          return res.status(200).json({
            message: `user finish with score: ${scoreResult}`,
            correction,
            scoreResult,
          });
        } else {
          /** if user has already played this exercise, we need to compare last and new scores */
          const oldScore = client.exercises[0].Client_exercise.score;
          if (oldScore === null || oldScore < scoreResult) {
            /** the new score is the best, we save it and return */
            const updateScore = await Client_exercise.findOne({
              where: { client_id: clientId, exercise_id: exerciseId },
            });
            await updateScore.update({ score: scoreResult });
            return res.status(200).json({
              message: `user finish with score: ${scoreResult}`,
              correction,
              explanation,
            });
          } else {
            /** the new score is NOT the best, we DON'T save it and we return */
            return res.status(200).json({
              message: `user finish with score: ${scoreResult}`,
              correction,
              scoreResult,
            });
          }
        }
      }

      /** the user is not connected, we return the score without saving it */
      return res.status(200).json({
        message: `user finish with score: ${scoreResult}`,
        correction,
        scoreResult,
      });
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },

  addImageToQuestion: async (req, res, next) => {
    try {
      const questionId = Number(req.body.question_id);
      const myFile = req.file;
      const pathPicture = myFile.path.substring(6);
      const picture = new Picture({
        name: myFile.filename,
        path: pathPicture,
        alternative: req.body.alternative,
      });

      picture.save().then((result) => {
        Question.findByPk(questionId, {
          include: 'question_picture',
        }).then((question) => {
          question.update({ picture_id: result.id });
          return res.status(200).json({
            pictureId: result.id,
            picturePath: result.path,
            pictureAlt: result.alternative,
          });
        });
      });
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  },
};
