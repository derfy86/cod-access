import {
  TRY_SIGN_IN,
  CHECK_IS_SIGNED_IN,
  SIGN_OUT,
  EDIT_PSEUDO_USER,
  EDIT_PASSWORD_USER,
  EDIT_EMAIL_USER,
  UPLOAD_FILE_PROFILE,
  GET_CSRF_TOKEN,
  FETCH_PROGRESS_BY_THEME,
  DELETE_ACCOUNT,
  SEND_PASSWORD_RESET_REQUEST,
  SAVE_NEW_PASSWORD,
  signIn,
  signOut,
  setInfoUser,
  setProgressByTheme,
  setSignInLoading,
  setPasswordResetRequestLoading,
} from 'src/actions/auth';

import {
  setMessage,
} from 'src/actions/other';

import axiosInstance from 'src/api';

export default (store) => (next) => async (action) => {
  switch (action.type) {
    case TRY_SIGN_IN:
      try {
        store.dispatch(setSignInLoading(true));

        const response = await axiosInstance.post('/signin', {
          email: action.email,
          password: action.password,
        });

        if (response.status !== 200) {
          console.log("erreur")
          throw new Error();
        }

        localStorage.setItem('isSignedIn', true);
        store.dispatch(signIn(response.data));
      }
      catch ({ response }) {
        if (response.data.message === 'miss client' || response.data.message === 'unauthorized') {
          store.dispatch(setMessage({
            type: 'error',
            message: 'L\'adresse e-mail ou le mot de passe n\'est pas valide.',
            targetComponent: 'SignInForm',
          }));
        }
      }
      finally {
        store.dispatch(setSignInLoading(false));
      }
      return next(action);
    case GET_CSRF_TOKEN:
      try {
        // upon loading the app, retrieve the csrf token from the server
        const { data, status } = await axiosInstance.get('/csrf-token');

        if (status !== 200) {
          throw new Error('CSRF error');
        }

        // server will check if our csrf cookie token value matches our header token value,
        // meaning the request comes from the app and not another site
        axiosInstance.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
        axiosInstance.defaults.headers.patch['X-CSRF-Token'] = data.csrfToken;
        axiosInstance.defaults.headers.delete['X-CSRF-Token'] = data.csrfToken;
      }
      catch (err) {
        console.log(err);
      }
      return next(action);
    case CHECK_IS_SIGNED_IN:
      try {
        // try to access the profile route
        // if our client has an HTTPOnly cookie with a valid JWT, server will respond 200
        // if response is 200, then sign in the user with profile info received. If not, do nothing.
        const { data, status } = await axiosInstance.get('/profile');

        if (status !== 200) {
          throw new Error();
        }

        store.dispatch(signIn(data));
      }
      catch (err) {
        console.log(err);
        store.dispatch(signOut());
      }
      return next(action);
    case SIGN_OUT:
      try {
        // calls the route to sign out which removes the HTTPOnly cookie with auth JWT
        const { status } = await axiosInstance.get('/signout');

        if (status !== 200) {
          throw new Error();
        }

        localStorage.removeItem('isSignedIn');
      }
      catch (err) {
        console.log(err);
      }
      return next(action);
    case EDIT_PSEUDO_USER:
      try {
        const response = await axiosInstance.patch('/profile', {
          pseudo: action.pseudo,
        });

        if (response.status !== 200) {
          throw new Error();
        }

        store.dispatch(setMessage({
          type: 'confirm',
          message: 'Votre pseudo a bien été modifié.',
          targetComponent: 'EditUserPseudoForm',
        }));

        store.dispatch(setInfoUser('pseudo', response.data.pseudo));
      }
      catch (err) {
        console.log(err);
        store.dispatch(setMessage({
          type: 'error',
          message: 'Une erreur est survenue lors de la modification de votre pseudo.',
          targetComponent: 'EditUserPseudoForm',
        }));
      }
      return next(action);
    case EDIT_EMAIL_USER:
      try {
        const response = await axiosInstance.patch('/profile', {
          email: action.email,
        });

        if (response.status !== 200) {
          throw new Error();
        }

        store.dispatch(setMessage({
          type: 'confirm',
          message: 'Votre adresse e-mail a bien été modifiée.',
          targetComponent: 'EditUserEmailForm',
        }));

        store.dispatch(setInfoUser('email', response.data.email));
      }
      catch (err) {
        console.log(err);
        store.dispatch(setMessage({
          type: 'error',
          message: 'Une erreur est survenue lors de la modification de votre adresse e-mail.',
          targetComponent: 'EditUserEmailForm',
        }));
      }
      return next(action);
    case EDIT_PASSWORD_USER:
      try {
        const response = await axiosInstance.patch('/profile', {
          password: action.currentPassword,
          newPassword: action.newPassword,
          newPasswordConfirm: action.newPasswordConfirm,
        });

        if (response.status !== 200) {
          throw new Error();
        }

        store.dispatch(setMessage({
          type: 'confirm',
          message: 'Votre mot de passe a bien été modifié.',
          targetComponent: 'EditUserPasswordForm',
        }));
      }
      catch (err) {
        console.log(err);
        store.dispatch(setMessage({
          type: 'error',
          message: 'Une erreur est survenue lors de la modification de votre mot de passe.',
          targetComponent: 'EditUserPasswordForm',
        }));
      }
      return next(action);
    case UPLOAD_FILE_PROFILE:
      try {
        const data = new FormData();
        data.append('picture', action.selectedFile);
        const response = await axiosInstance.post('/upload_client', data);

        if (response.status !== 200) {
          throw new Error();
        }

        store.dispatch(setMessage({
          type: 'confirm',
          message: 'Votre image a bien été modifiée.',
          targetComponent: 'EditUserImageForm',
        }));

        store.dispatch(setInfoUser('picturePath', response.data.picturePath));
      }
      catch (err) {
        console.log(err);
        store.dispatch(setMessage({
          type: 'error',
          message: 'Une erreur est survenue lors de la modification de votre image.',
          targetComponent: 'EditUserImageForm',
        }));
      }
      return next(action);
    case FETCH_PROGRESS_BY_THEME:
      try {
        const response = await axiosInstance.get('/themes_score');

        if (response.status !== 200) {
          throw new Error();
        }

        store.dispatch(setProgressByTheme(response.data));
      }
      catch (err) {
        console.log(err);
      }
      return next(action);
    case DELETE_ACCOUNT:
      try {
        const response = await axiosInstance.delete('/profile');

        if (response.status !== 200) {
          throw new Error();
        }

        store.dispatch(signOut());
      }
      catch (err) {
        console.log(err);
      }
      return next(action);
    case SEND_PASSWORD_RESET_REQUEST:
      try {
        store.dispatch(setPasswordResetRequestLoading(true));

        const response = await axiosInstance.post('/forget', {
          email: action.email,
        });

        if (response.status !== 200) {
          throw new Error();
        }

        store.dispatch(setMessage({
          type: 'confirm',
          message: 'Votre demande a été prise en compte, vous allez recevoir un lien de réinitialisation à l\'adresse e-mail indiquée.',
          canBeClosed: false,
          targetComponent: 'PasswordResetRequest',
        }));
      }
      catch (err) {
        console.log('error', err);
      }
      finally {
        store.dispatch(setPasswordResetRequestLoading(false));
      }
      return next(action);
    case SAVE_NEW_PASSWORD:
      try {
        store.dispatch(setPasswordResetRequestLoading(true));

        const response = await axiosInstance.patch('/forget',
          {
            password: action.password,
            passwordConfirm: action.passwordConfirm,
          },
          {
            headers: { Authorization: `Bearer ${action.token}` },
          });

        if (response.status !== 200) {
          throw new Error();
        }

        store.dispatch(setMessage({
          type: 'confirm',
          message: 'Votre mot de passe a bien été mis a jour vous allez recevoir un e-mail de confirmation et vous pouvez vous connecter dès à présent avec vos identifiants mis à jour.',
          canBeClosed: false,
          targetComponent: 'PasswordReset',
        }));
      }
      catch (err) {
        console.log('error', err);
      }
      finally {
        store.dispatch(setPasswordResetRequestLoading(false));
      }
      return next(action);
    default:
      return next(action);
  }
};
