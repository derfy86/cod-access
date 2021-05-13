import {
  TRY_SIGN_UP,
  setSignUpLoading,
} from 'src/actions/signup';
import {
  setMessage,
} from 'src/actions/other';

import axiosInstance from 'src/api';

export default (store) => (next) => async (action) => {
  switch (action.type) {
    case TRY_SIGN_UP:
      try {
        store.dispatch(setSignUpLoading(true));

        const response = await axiosInstance.post('/signup', {
          email: action.email,
          pseudo: action.pseudo,
          password: action.password,
          passwordConfirm: action.passwordConfirm,
        });

        if (response.status !== 200) {
          throw new Error();
        }

        store.dispatch(setMessage({
          type: 'confirm',
          message: `Votre compte a bien été créé avec l'adresse "${action.email}". Vous pouvez vous connecter dès à présent`,
          targetComponent: 'SignUp',
        }));
      }
      catch ({ response }) {
        if (response?.data?.message === 'email used') {
          store.dispatch(setMessage({
            type: 'error',
            message: `L'adresse e-mail ${action.email} est déjà utilisée`,
            targetComponent: 'SignUp',
          }));
        }
      }
      finally {
        store.dispatch(setSignUpLoading(false));
      }
      return next(action);
    default:
      return next(action);
  }
};
