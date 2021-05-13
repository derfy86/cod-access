import {
  FETCH_THEMES,
  setThemes,
  TRY_SEND_CONTACT_MESSAGE,
  setContactLoading,
  setMessage,
} from 'src/actions/other';

import {
  setThemeManagerCheckboxes,
} from 'src/actions/exerciseManager/themeManager';

import axiosInstance from 'src/api';

export default (store) => (next) => async (action) => {
  switch (action.type) {
    case FETCH_THEMES:
      try {
        const response = await axiosInstance.get('/themes');

        if (response.status !== 200) {
          throw new Error();
        }

        store.dispatch(setThemes(response.data));
        store.dispatch(setThemeManagerCheckboxes(response.data));
      }
      catch (err) {
        console.log(err);
      }
      return next(action);
    case TRY_SEND_CONTACT_MESSAGE:
      try {
        store.dispatch(setContactLoading(true));

        const response = await axiosInstance.post('/contact', {
          name: action.name,
          email: action.email,
          content: action.message,
        });

        if (response.status !== 200) {
          throw new Error();
        }

        store.dispatch(setMessage({
          type: 'confirm',
          message: 'Merci votre message a bien été envoyé. Vous allez recevoir un e-mail de confirmation.',
          canBeClosed: false,
          targetComponent: 'Contact',
        }));
      }
      catch (err) {
        console.log('error', err);
        store.dispatch(setMessage({
          type: 'error',
          message: 'Une erreur est survenue lors de l\'envoi de votre message',
          targetComponent: 'Contact',
        }));
      }
      finally {
        store.dispatch(setContactLoading(false));
      }
      return next(action);
    default:
      return next(action);
  }
};
