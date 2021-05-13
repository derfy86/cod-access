export const SET_QUESTION_MANAGER_UPDATE_LOADING = 'SET_QUESTION_MANAGER_UPDATE_LOADING';

export const setQuestionManagerUpdateLoading = (status) => ({
  type: SET_QUESTION_MANAGER_UPDATE_LOADING,
  status,
});

export const SET_QUESTION_MANAGER_ERROR = 'SET_QUESTION_MANAGER_ERROR';

export const setQuestionManagerError = (status) => ({
  type: SET_QUESTION_MANAGER_ERROR,
  status,
});

export const SET_QUESTION_MANAGER_LOADING = 'SET_QUESTION_MANAGER_LOADING';

export const setQuestionManagerLoading = (status) => ({
  type: SET_QUESTION_MANAGER_LOADING,
  status,
});

export const SET_QUESTION_MANAGER_IS_SAVED = 'SET_QUESTION_MANAGER_IS_SAVED';

export const setQuestionManagerIsSaved = (status) => ({
  type: SET_QUESTION_MANAGER_IS_SAVED,
  status,
});

export const POST_QUESTION_MANAGER = 'POST_QUESTION_MANAGER';

export const postQuestionManager = () => ({
  type: POST_QUESTION_MANAGER,
});

export const PATCH_QUESTION_MANAGER = 'PATCH_QUESTION_MANAGER';

export const patchQuestionManager = (questionId) => ({
  type: PATCH_QUESTION_MANAGER,
  questionId,
});

export const SET_QUESTION_MANAGER_FIELD_VALUE = 'SET_QUESTION_MANAGER_FIELD_VALUE';

export const setQuestionManagerFieldValue = ({ value, name, questionId }) => ({
  type: SET_QUESTION_MANAGER_FIELD_VALUE,
  value,
  name,
  questionId,
});

export const SET_QUESTION_MANAGER = 'SET_QUESTION_MANAGER';

export const setQuestionManager = (question) => ({
  type: SET_QUESTION_MANAGER,
  question,
});

export const DELETE_QUESTION_MANAGER = 'DELETE_QUESTION_MANAGER';

export const deleteQuestionManager = (questionId) => ({
  type: DELETE_QUESTION_MANAGER,
  questionId,
});

export const RESET_QUESTION_MANAGER = 'RESET_QUESTION_MANAGER';

export const resetQuestionManager = () => ({
  type: RESET_QUESTION_MANAGER,
});

export const SET_QUESTION_MANAGER_FILE = 'SET_QUESTION_MANAGER_FILE';

export const setQuestionManagerFile = (file) => ({
  type: SET_QUESTION_MANAGER_FILE,
  file,
});

export const UPLOAD_QUESTION_MANAGER_IMAGE = 'UPLOAD_QUESTION_MANAGER_IMAGE';

export const uploadQuestionManagerImage = ({ questionId, file, alternative }) => ({
  type: UPLOAD_QUESTION_MANAGER_IMAGE,
  questionId,
  file,
  alternative,
});

export const SET_QUESTION_MANAGER_SELECTED_FILE = 'SET_QUESTION_MANAGER_SELECTED_FILE';

export const setQuestionManagerSelectedFile = ({ questionId, file }) => ({
  type: SET_QUESTION_MANAGER_SELECTED_FILE,
  questionId,
  file,
});

export const PATCH_QUESTION_MANAGER_IMAGE_ALT = 'PATCH_QUESTION_MANAGER_IMAGE_ALT';

export const patchQuestionManagerImageAlt = (imageId) => ({
  type: PATCH_QUESTION_MANAGER_IMAGE_ALT,
  imageId,
});

export const SET_QUESTION_MANAGER_IMAGE_ID = 'SET_QUESTION_MANAGER_IMAGE_ID';

export const setQuestionManagerImageId = ({
  imageId, questionId, imagePath, imageAlternative,
}) => ({
  type: SET_QUESTION_MANAGER_IMAGE_ID,
  imageId,
  questionId,
  imageAlternative,
  imagePath,
});

export const DELETE_QUESTION_MANAGER_IMAGE = 'DELETE_QUESTION_MANAGER_IMAGE';

export const deleteQuestionManagerImage = ({ questionId, imageId }) => ({
  type: DELETE_QUESTION_MANAGER_IMAGE,
  questionId,
  imageId,
});

export const RESET_QUESTION_MANAGER_IMAGE = 'RESET_QUESTION_MANAGER_IMAGE';

export const resetQuestionManagerImage = ({ questionId, imageId }) => ({
  type: RESET_QUESTION_MANAGER_IMAGE,
  questionId,
  imageId,
});
