import {
  TOGGLE_MENU_VISIBILITY,
  SET_THEMES,
  SET_MODAL_CONFIRM,
  UNSET_MODAL_CONFIRM,
  SET_MESSAGE,
  UNSET_MESSAGE,
  SET_APP_LOADING,
  SET_MOBILE_MENU_VISIBILITY,
  SET_CONTACT_LOADING,
} from 'src/actions/other';

const initialState = {
  mobileMenuVisibility: false,
  themes: {
    loading: true,
    data: [],
  },
  contact: {
    isLoading: false,
  },
  appLoading: false,
  modalConfirmParams: {
    heading: '',
    message: '',
    confirmParams: {
      onConfirm: () => { },
      label: '',
    },
    cancelParams: {
      onCancel: () => { },
      label: '',
    },
    isVisible: false,
  },
  messageParams: {
    type: '',
    message: '',
    canBeClosed: true,
    targetComponent: '',
  },
};

const other = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_MOBILE_MENU_VISIBILITY:
      return {
        ...state,
        mobileMenuVisibility: action.visibility,
      };
    case SET_MESSAGE:
      return {
        ...state,
        messageParams: {
          ...action.messageParams,
        },
      };
    case UNSET_MESSAGE:
      return {
        ...state,
        messageParams: {
          ...initialState.messageParams,
        },
      };
    case UNSET_MODAL_CONFIRM:
      return {
        ...state,
        modalConfirmParams: {
          ...initialState.modalConfirmParams,
        },
      };
    case SET_MODAL_CONFIRM:
      return {
        ...state,
        modalConfirmParams: {
          ...action.modalConfirmParams,
          isVisible: true,
        },
      };
    case SET_THEMES:
      return {
        ...state,
        themes: {
          loading: false,
          data: action.themes,
        },
      };
    case TOGGLE_MENU_VISIBILITY:
      return {
        ...state,
        mobileMenuVisibility: !state.mobileMenuVisibility,
      };
    case SET_APP_LOADING:
      return {
        ...state,
        appLoading: action.loading,
      };
    case SET_CONTACT_LOADING:
      return {
        ...state,
        contact: {
          ...state.contact,
          isLoading: action.isLoading,
        },
      };
    default:
      return state;
  }
};

export default other;
