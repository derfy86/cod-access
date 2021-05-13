import {
  POST_QUESTION_MANAGER,
  PATCH_QUESTION_MANAGER,
  DELETE_QUESTION_MANAGER,
  UPLOAD_QUESTION_MANAGER_IMAGE,
  DELETE_QUESTION_MANAGER_IMAGE,
  setQuestionManager,
  setQuestionManagerImageId,
  resetQuestionManagerImage,
} from 'src/actions/exerciseManager/questionManager';
import {
  unsetAnswerManager,
} from 'src/actions/exerciseManager/answerManager';
import {
  setExerciseManagerUpdateLoading,
  setExerciseManagerError,
  setExerciseManagerIsSaved,
} from 'src/actions/exerciseManager';
import { setMessage } from 'src/actions/other';

import axiosInstance from 'src/api';

export default (store) => (next) => async (action) => {
  switch (action.type) {
    case POST_QUESTION_MANAGER:
      try {
        store.dispatch(setExerciseManagerIsSaved(false));
        store.dispatch(setExerciseManagerUpdateLoading(true));
        const {
          exerciseManager: { id },
        } = store.getState();
        const { status, data } = await axiosInstance.post(`/admin/exercises/new_question/${id}`, {
          brief: '',
          code: '',
          explanation: '',
        });

        if (status !== 200) {
          throw new Error();
        }

        store.dispatch(setQuestionManager({
          id: data.id,
          brief: data.brief,
          code: data.code,
          explanation: data.explanation,
          imageAlternative: '',
          selectedFile: null,
          imageId: null,
          imagePath: '',
        }));

        store.dispatch(setExerciseManagerIsSaved(true));
      }
      catch (err) {
        console.log(err);
        store.dispatch(setExerciseManagerError(true));
      }
      finally {
        store.dispatch(setExerciseManagerUpdateLoading(false));
      }
      return next(action);
    case PATCH_QUESTION_MANAGER:
      try {
        store.dispatch(setExerciseManagerIsSaved(false));
        store.dispatch(setExerciseManagerUpdateLoading(true));
        const {
          questionManager: {
            questions,
          },
        } = store.getState();

        const thisQuestion = questions.find((question) => question.id === action.questionId);

        const { status } = await axiosInstance.patch(`/admin/exercises/new_question/${action.questionId}`, {
          title: thisQuestion.title,
          brief: thisQuestion.brief,
          code: thisQuestion.code,
          published: thisQuestion.published,
          explanation: thisQuestion.explanation,
        });

        if (status !== 200) {
          throw new Error();
        }

        store.dispatch(setExerciseManagerIsSaved(true));
      }
      catch (err) {
        console.log(err);
        store.dispatch(setExerciseManagerError(true));
      }
      finally {
        store.dispatch(setExerciseManagerUpdateLoading(false));
      }
      return next(action);
    case DELETE_QUESTION_MANAGER:
      try {
        store.dispatch(setExerciseManagerIsSaved(false));
        store.dispatch(setExerciseManagerUpdateLoading(true));
        const {
          answerManager: {
            possibleAnswers,
          },
        } = store.getState();

        const relatedAnswers = possibleAnswers.filter(
          (answer) => answer.questionId === action.questionId,
        );

        relatedAnswers.forEach((answer) => {
          store.dispatch(unsetAnswerManager(answer.id));
        });

        const { status: statusQuestion } = await axiosInstance.delete(`/admin/exercises/new_question/${action.questionId}`);

        if (statusQuestion !== 200) {
          throw new Error('question delete fail');
        }

        store.dispatch(setExerciseManagerIsSaved(true));
      }
      catch (err) {
        console.log(err);
        store.dispatch(setExerciseManagerError(true));
      }
      finally {
        store.dispatch(setExerciseManagerUpdateLoading(false));
      }
      return next(action);
    case UPLOAD_QUESTION_MANAGER_IMAGE:
      try {
        store.dispatch(setExerciseManagerIsSaved(false));
        store.dispatch(setExerciseManagerUpdateLoading(true));

        const fileInfo = new FormData();
        fileInfo.append('picture', action.file);
        fileInfo.append('question_id', action.questionId);
        fileInfo.append('alternative', action.alternative);

        if (!action.file) {
          return next(action);
        }
        const response = await axiosInstance.post('/upload_question', fileInfo);
        if (response.status !== 200) {
          throw new Error();
        }

        store.dispatch(setQuestionManagerImageId({
          imageId: response.data.pictureId,
          imageAlternative: response.data.pictureAlt,
          imagePath: response.data.picturePath,
          questionId: action.questionId,
        }));
        store.dispatch(setMessage({
          type: 'confirm',
          message: 'L\'image a bien été associée à cette question',
          targetComponent: `QuestionManager-q${action.questionId}`,
        }));
        store.dispatch(setExerciseManagerIsSaved(true));
      }
      catch (err) {
        console.log(err);
        store.dispatch(setMessage({
          type: 'error',
          message: 'L\'image n\'a pas pu être chargée sur le serveur',
          targetComponent: `QuestionManager-q${action.questionId}`,
        }));
      }
      finally {
        store.dispatch(setExerciseManagerUpdateLoading(false));
      }
      return next(action);
    case DELETE_QUESTION_MANAGER_IMAGE:
      try {
        store.dispatch(setExerciseManagerIsSaved(false));
        store.dispatch(setExerciseManagerUpdateLoading(true));

        const response = await axiosInstance.delete(`/admin/image/${action.imageId}`);

        if (response.status !== 200) {
          throw new Error('image delete fail');
        }

        store.dispatch(resetQuestionManagerImage({ questionId: action.questionId }));
      }
      catch (err) {
        console.log(err);
        store.dispatch(setExerciseManagerError(true));
      }
      finally {
        store.dispatch(setExerciseManagerUpdateLoading(false));
      }
      return next(action);
    default:
      return next(action);
  }
};
