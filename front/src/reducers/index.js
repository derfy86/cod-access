import { combineReducers } from 'redux';

import exerciseManager from 'src/reducers/exerciseManager';
import questionManager from 'src/reducers/exerciseManager/questionManager';
import answerManager from 'src/reducers/exerciseManager/answerManager';
import themeManager from 'src/reducers/exerciseManager/themeManager';
import other from 'src/reducers/other';
import auth from 'src/reducers/auth';
import signup from 'src/reducers/signup';
import exercises from 'src/reducers/exercises';
import adminExercisesList from 'src/reducers/adminExercisesList';
import users from './users';

export default combineReducers({
  other,
  auth,
  signup,
  exercises,
  exerciseManager,
  questionManager,
  answerManager,
  themeManager,
  adminExercisesList,
  users,
});
