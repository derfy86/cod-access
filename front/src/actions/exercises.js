export const SET_EXERCISE_RESULTS_LOADING = 'SET_EXERCISE_RESULTS_LOADING';

export const setExerciseResultsLoading = (status) => ({
  type: SET_EXERCISE_RESULTS_LOADING,
  status,
});

export const FETCH_THEMES_EXERCISES = 'FETCH_THEMES_EXERCISES';

export const fetchThemesExercises = () => ({
  type: FETCH_THEMES_EXERCISES,
});

export const FETCH_EXERCISE = 'FETCH_EXERCISE';

export const fetchExercise = (exerciseId) => ({
  type: FETCH_EXERCISE,
  exerciseId,
});

export const SET_THEMES_EXERCISES = 'SET_THEMES_EXERCISES';

export const setThemesExercises = (data) => ({
  type: SET_THEMES_EXERCISES,
  data,
});

export const SET_CURRENT_EXERCISE = 'SET_CURRENT_EXERCISE';

export const setCurrentExercise = (currentExercise) => ({
  type: SET_CURRENT_EXERCISE,
  currentExercise,
});

export const SET_EXERCISESPAGE_LOADING = 'SET_EXERCISESPAGE_LOADING';

export const setExercisesPageLoading = (loading) => ({
  type: SET_EXERCISESPAGE_LOADING,
  loading,
});

export const TOGGLE_FILTER_THEME_VISIBILITY = 'TOGGLE_FILTER_THEME_VISIBILITY';

export const toogleFilterThemeVisibility = () => ({
  type: TOGGLE_FILTER_THEME_VISIBILITY,
});

export const SET_ALL_THEMES_FILTER_CHECKBOX = 'SET_ALL_THEMES_FILTER_CHECKBOX';

export const setAllThemesFilterCheckbox = (newThemesFilter) => ({
  type: SET_ALL_THEMES_FILTER_CHECKBOX,
  newThemesFilter,
});

export const SET_THEME_CHECKBOX = 'SET_THEME_CHECKBOX';

export const setThemeCheckbox = (idTheme, checked) => ({
  type: SET_THEME_CHECKBOX,
  idTheme,
  checked,
});

export const SET_THEMES_ID_TO_DISPLAY = 'SET_THEMES_ID_TO_DISPLAY';

export const setThemesIdToDisplay = () => ({
  type: SET_THEMES_ID_TO_DISPLAY,
});

export const SET_ALL_THEMES_ID_TO_DISPLAY = 'SET_ALL_THEMES_ID_TO_DISPLAY';

export const setAllThemesIdToDisplay = (themesId) => ({
  type: SET_ALL_THEMES_ID_TO_DISPLAY,
  themesId,
});

export const SET_NEW_USER_ANSWER = 'SET_NEW_USER_ANSWER';

export const setNewUserAnswer = ({ questionId, answerId, previousAnswers }) => ({
  type: SET_NEW_USER_ANSWER,
  questionId,
  answerId,
  previousAnswers,
});

export const REMOVE_USER_ANSWER = 'REMOVE_USER_ANSWER';

export const removeUserAnswer = ({ questionId, answerId, previousAnswers }) => ({
  type: REMOVE_USER_ANSWER,
  questionId,
  answerId,
  previousAnswers,
});

export const SHOW_QUESTION = 'SHOW_QUESTION';

export const showQuestion = (questionIndex) => ({
  type: SHOW_QUESTION,
  questionIndex,
});

export const SEND_ANSWERS = 'SEND_ANSWERS';

export const sendAnswers = () => ({
  type: SEND_ANSWERS,
});

export const SET_RESULTS = 'SET_RESULTS';

export const setResults = ({
  corrections,
  userScore,
}) => ({
  type: SET_RESULTS,
  corrections,
  userScore,
});

export const FETCH_PROGRESS_BY_THEME = 'FETCH_PROGRESS_BY_THEME';

export const fetchProgressByTheme = () => ({
  type: FETCH_PROGRESS_BY_THEME,
});

export const RESET_CURRENT_EXERCISE = 'RESET_CURRENT_EXERCISE';

export const resetCurrentExercise = () => ({
  type: RESET_CURRENT_EXERCISE,
});
