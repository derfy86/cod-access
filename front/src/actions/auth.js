/* login / logout actions */
export const SET_SIGN_IN_LOADING = 'SET_SIGN_IN_LOADING';

export const setSignInLoading = (isLoading) => ({
  type: SET_SIGN_IN_LOADING,
  isLoading,
});

export const TOGGLE_CONNECTION_VISIBILITY = 'TOGGLE_CONNECTION_VISIBILITY';

export const toggleConnectionVisibility = () => ({
  type: TOGGLE_CONNECTION_VISIBILITY,
});

export const SET_CONNECTION_VISIBILITY = 'SET_CONNECTION_VISIBILITY';

export const setConnectionVisibility = (isVisible) => ({
  type: SET_CONNECTION_VISIBILITY,
  isVisible,
});

export const TRY_SIGN_IN = 'TRY_SIGN_IN';

export const trySignIn = ({ email, password }) => ({
  type: TRY_SIGN_IN,
  email,
  password,
});

export const SIGN_IN = 'SIGN_IN';

export const signIn = ({
  id,
  email,
  pseudo,
  client_picture: { path: picturePath },
  responsibility: { entitled: role },
}) => ({
  type: SIGN_IN,
  id,
  email,
  pseudo,
  picturePath,
  role,
});

export const SIGN_OUT = 'SIGN_OUT';

export const signOut = () => ({
  type: SIGN_OUT,
});

export const CHECK_IS_SIGNED_IN = 'CHECK_IS_SIGNED_IN';

export const checkIsSignedIn = () => ({
  type: CHECK_IS_SIGNED_IN,
});

export const GET_CSRF_TOKEN = 'GET_CSRF_TOKEN';

export const getCSRFToken = () => ({
  type: GET_CSRF_TOKEN,
});

/* Settings actions */

export const EDIT_EMAIL_USER = 'EDIT_EMAIL_USER';

export const editEmailUser = ({ email }) => ({
  type: EDIT_EMAIL_USER,
  email,
});

export const EDIT_PSEUDO_USER = 'EDIT_PSEUDO_USER';

export const editPseudoUser = ({ pseudo }) => ({
  type: EDIT_PSEUDO_USER,
  pseudo,
});

export const EDIT_PASSWORD_USER = 'EDIT_PASSWORD_USER';

export const editPasswordUser = ({ currentPassword, newPassword, newPasswordConfirm }) => ({
  type: EDIT_PASSWORD_USER,
  currentPassword,
  newPassword,
  newPasswordConfirm,
});

export const SET_INFO_USER = 'SET_INFO_USER';

export const setInfoUser = (name, newInfo) => ({
  type: SET_INFO_USER,
  name,
  newInfo,
});

export const UPLOAD_FILE_PROFILE = 'UPLOAD_FILE_PROFILE';

export const uploadFileProfile = ({ selectedFile }) => ({
  type: UPLOAD_FILE_PROFILE,
  selectedFile,
});

/* users */
export const FETCH_PROGRESS_BY_THEME = 'FETCH_PROGRESS_BY_THEME';

export const fetchProgressByTheme = () => ({
  type: FETCH_PROGRESS_BY_THEME,
});

export const SET_PROGRESS_BY_THEME = 'SET_PROGRESS_BY_THEME';

export const setProgressByTheme = (progress) => ({
  type: SET_PROGRESS_BY_THEME,
  progress,
});

export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';

export const deleteAccount = () => ({
  type: DELETE_ACCOUNT,
});

/* password reset actions */
export const SET_PASSWORD_RESET_REQUEST_LOADING = 'SET_PASSWORD_RESET_REQUEST_LOADING';

export const setPasswordResetRequestLoading = (isLoading) => ({
  type: SET_PASSWORD_RESET_REQUEST_LOADING,
  isLoading,
});

export const SEND_PASSWORD_RESET_REQUEST = 'SEND_PASSWORD_RESET_REQUEST';

export const sendPasswordResetRequest = ({ email }) => ({
  type: SEND_PASSWORD_RESET_REQUEST,
  email,
});

export const SAVE_NEW_PASSWORD = 'SAVE_NEW_PASSWORD';

export const saveNewPassword = ({ token, password, passwordConfirm }) => ({
  type: SAVE_NEW_PASSWORD,
  token,
  password,
  passwordConfirm,
});
