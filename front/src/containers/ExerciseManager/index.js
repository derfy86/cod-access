import ExerciseManager from 'src/components/ExerciseManager';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { postQuestionManager } from 'src/actions/exerciseManager/questionManager';

import {
  setExerciseManagerFieldValue,
  patchExerciseManager,
  postExerciseManager,
  deleteExerciseManager,
  fetchExerciseManager,
  resetManagers,
} from 'src/actions/exerciseManager/';

const mapStateToProps = ({ exerciseManager, questionManager, other }) => ({
  title: exerciseManager.title,
  brief: exerciseManager.brief,
  themes: exerciseManager.themes,
  error: exerciseManager.error,
  published: exerciseManager.published,
  loading: other.loading || exerciseManager.loading,
  updateLoading: exerciseManager.updateLoading,
  isSaved: exerciseManager.isSaved,
  questions: [...questionManager.questions],
  isLeaving: exerciseManager.isLeaving,
});

const mapDispatchToProps = (
  dispatch,
  { match },
) => ({
  getExercise: () => dispatch(fetchExerciseManager(match.params.exerciseId)),
  changeValue: ({ value, name }) => dispatch(setExerciseManagerFieldValue({ value, name })),
  createQuestion: () => dispatch(postQuestionManager()),
  createExercise: () => dispatch(postExerciseManager()),
  removeExercise: () => dispatch(deleteExerciseManager()),
  saveOnBlur: () => dispatch(patchExerciseManager()),
  resetManagerStates: () => dispatch(resetManagers()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ExerciseManager),
);
