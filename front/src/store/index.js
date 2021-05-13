import { createStore, compose, applyMiddleware } from 'redux';

import reducer from 'src/reducers';
import otherMiddleware from 'src/middlewares/other';
import authMiddleware from 'src/middlewares/auth';
import signupMiddleware from 'src/middlewares/signup';
import exercisesMiddleware from 'src/middlewares/exercises';
import exerciseManagerMiddleware from 'src/middlewares/exerciseManager/';
import questionManagerMiddleware from 'src/middlewares/exerciseManager/questionManager/';
import answerManagerMiddleware from 'src/middlewares/exerciseManager/answerManager/';
import themeManagerMiddleware from 'src/middlewares/exerciseManager/themeManager/';
import usersMiddleware from 'src/middlewares/users';
import adminExercisesListMiddleware from 'src/middlewares/adminExercisesList';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    otherMiddleware,
    authMiddleware,
    signupMiddleware,
    exercisesMiddleware,
    exerciseManagerMiddleware,
    questionManagerMiddleware,
    answerManagerMiddleware,
    themeManagerMiddleware,
    usersMiddleware,
    adminExercisesListMiddleware,
  ),
);

const store = createStore(
  reducer,
  enhancers,
);

export default store;
