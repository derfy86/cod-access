import {
  FETCH_EXERCISES,
  DELETE_EXERCISE,
  setLoadingExercisesList,
  setExercises,
} from 'src/actions/adminExercisesList';
import { setMessage } from 'src/actions/other';

import axiosInstance from 'src/api';

export default (store) => (next) => async (action) => {
  switch (action.type) {
    case FETCH_EXERCISES:
      try {
        store.dispatch(setLoadingExercisesList(true));

        const response = await axiosInstance.get(`/exercises?limit=20&page=${action.page}`);
        if (response.status !== 200) {
          throw new Error();
        }

        store.dispatch(setExercises(response.data));
      }
      catch (err) {
        console.log('error', err);
      }
      finally {
        store.dispatch(setLoadingExercisesList(false));
      }
      return next(action);
    case DELETE_EXERCISE:
      try {
        const response = await axiosInstance.delete(`/admin/exercises/${action.idExercise}`);
        if (response.status !== 200) {
          throw new Error();
        }

        store.dispatch(setMessage({
          type: 'confirm',
          message: `L'exercice #${action.idExercise} a bien été supprimé.`,
          targetComponent: 'AdminExercisesList',
        }));
      }
      catch (err) {
        console.log('error', err);
        store.dispatch(setMessage({
          type: 'error',
          message: 'Une erreur est survenue lors de la suppression.',
          targetComponent: 'AdminExercisesList',
        }));
      }
      finally {
        //loader?
      }
      return next(action);
    default:
      return next(action);
  }
};
