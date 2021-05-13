import { SET_SIGN_UP_LOADING } from 'src/actions/signup';

const initialState = {
  loading: false,
  isSignedUp: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_SIGN_UP_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};
