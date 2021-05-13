export const TRY_SIGN_UP = 'TRY_SIGN_UP';

export const trySignUp = ({
  email, pseudo, password, passwordConfirm,
}) => ({
  type: TRY_SIGN_UP,
  email,
  pseudo,
  password,
  passwordConfirm,
});

export const SET_SIGN_UP_LOADING = 'SET_SIGN_UP_LOADING';

export const setSignUpLoading = (loading) => ({
  type: SET_SIGN_UP_LOADING,
  loading,
});
