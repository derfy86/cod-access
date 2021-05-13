import {
  TOGGLE_CONNECTION_VISIBILITY,
  SIGN_IN,
  SIGN_OUT,
  SET_INFO_USER,
  SET_PROGRESS_BY_THEME,
  SET_CONNECTION_VISIBILITY,
  SET_SIGN_IN_LOADING,
  SET_PASSWORD_RESET_REQUEST_LOADING,
} from 'src/actions/auth';

const initialState = {
  signIn: {
    isVisible: false,
    loading: false,
  },
  passwordReset: {
    loading: false,
  },
  user: {
    id: null,
    email: '',
    pseudo: '',
    role: '',
    picturePath: '',
    progressByTheme: [],
    isLogged: false,
  },
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_SIGN_IN_LOADING:
      return {
        ...state,
        signIn: {
          ...state.signIn,
          loading: action.isLoading,
        },
      };
    case SET_CONNECTION_VISIBILITY:
      return {
        ...state,
        signIn: {
          ...state.signIn,
          isVisible: action.isVisible,
        },
      };
    case TOGGLE_CONNECTION_VISIBILITY:
      return {
        ...state,
        signIn: {
          ...state.signIn,
          isVisible: !state.isVisible,
        },
      };
    case SIGN_IN:
      return {
        ...state,
        user: {
          ...state.user,
          id: action.id,
          email: action.email,
          pseudo: action.pseudo,
          role: action.role,
          picturePath: action.picturePath,
          isLogged: true,
        },
      };
    case SIGN_OUT:
      return {
        ...initialState,
      };
    case SET_INFO_USER:
      return {
        ...state,
        user: {
          ...state.user,
          [action.name]: action.newInfo,
        },
      };
    case SET_PROGRESS_BY_THEME:
      return {
        ...state,
        user: {
          ...state.user,
          progressByTheme: action.progress,
        },
      };
    case SET_PASSWORD_RESET_REQUEST_LOADING:
      return {
        ...state,
        passwordReset: {
          ...state.passwordReset,
          loading: action.isLoading,
        },
      };
    default:
      return state;
  }
};

export default reducer;
