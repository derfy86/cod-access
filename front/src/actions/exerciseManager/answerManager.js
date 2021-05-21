export const SET_ANSWER_MANAGER_UPDATE_LOADING = 'SET_ANSWER_MANAGER_UPDATE_LOADING';

export const setAnswerManagerUpdateLoading = (status) => ({
  type: SET_ANSWER_MANAGER_UPDATE_LOADING,
  status,
});

export const SET_ANSWER_MANAGER_ERROR = 'SET_ANSWER_MANAGER_ERROR';

export const setAnswerManagerError = (status) => ({
  type: SET_ANSWER_MANAGER_ERROR,
  status,
});

export const SET_ANSWER_MANAGER_LOADING = 'SET_ANSWER_MANAGER_LOADING';

export const setAnswerManagerLoading = (status) => ({
  type: SET_ANSWER_MANAGER_LOADING,
  status,
});

export const SET_ANSWER_MANAGER_IS_SAVED = 'SET_ANSWER_MANAGER_IS_SAVED';

export const setAnswerManagerIsSaved = (status) => ({
  type: SET_ANSWER_MANAGER_IS_SAVED,
  status,
});

export const POST_ANSWER_MANAGER = 'POST_ANSWER_MANAGER';

export const postAnswerManager = (questionId) => ({
  type: POST_ANSWER_MANAGER,
  questionId,
});

export const PATCH_ANSWER_MANAGER = 'PATCH_ANSWER_MANAGER';

export const patchAnswerManager = ({ answerId, value, name }) => ({
  type: PATCH_ANSWER_MANAGER,
  answerId,
  value,
  name,
});

export const SET_ANSWER_MANAGER_FIELD_VALUE = 'SET_ANSWER_MANAGER_FIELD_VALUE';

export const setAnswerManagerFieldValue = ({
  value,
  name,
  answerId,
  questionId,
}) => ({
  type: SET_ANSWER_MANAGER_FIELD_VALUE,
  value,
  name,
  questionId,
  answerId,
});

export const SET_ANSWER_MANAGER = 'SET_ANSWER_MANAGER';

export const setAnswerManager = (answer) => ({
  type: SET_ANSWER_MANAGER,
  answer,
});

export const DELETE_ANSWER_MANAGER = 'DELETE_ANSWER_MANAGER';

export const deleteAnswerManager = (answerId) => ({
  type: DELETE_ANSWER_MANAGER,
  answerId,
});

export const UNSET_ANSWER_MANAGER = 'UNSET_ANSWER_MANAGER';

export const unsetAnswerManager = (answerId) => ({
  type: UNSET_ANSWER_MANAGER,
  answerId,
});

export const RESET_ANSWER_MANAGER = 'RESET_ANSWER_MANAGER';

export const resetAnswerManager = () => ({
  type: RESET_ANSWER_MANAGER,
});
