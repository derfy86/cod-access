import {
  UPDATE_THEME_MANAGER,
  setThemeManagerIsSaved,
  setThemeManagerUpdateLoading,
  setThemeManagerError,
} from 'src/actions/exerciseManager/themeManager';

import axiosInstance from 'src/api';

export default (store) => (next) => async (action) => {
  switch (action.type) {
    case UPDATE_THEME_MANAGER:
      try {
        store.dispatch(setThemeManagerUpdateLoading(true));

        const {
          exerciseManager: {
            id: exerciseId,
          },
        } = store.getState();
        let response;

        if (action.isChecked) {
          response = await axiosInstance.post('/admin/exercises/associate_exercise_theme', {
            exercise_id: exerciseId,
            theme_id: action.themeId,
          });
        }
        else {
          response = await axiosInstance.delete('/admin/exercises/associate_exercise_theme', {
            data: {
              exercise_id: exerciseId,
              theme_id: action.themeId,
            },
          });
        }

        if (response.status !== 200) {
          throw new Error();
        }

        store.dispatch(setThemeManagerIsSaved(true));
      }
      catch (err) {
        console.log(err);
        store.dispatch(setThemeManagerError(true));
      }
      finally {
        store.dispatch(setThemeManagerUpdateLoading(false));
      }
      return next(action);
    default:
      return next(action);
  }
};
