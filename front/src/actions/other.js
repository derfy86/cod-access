export const TOGGLE_MENU_VISIBILITY = 'TOGGLE_MENU_VISIBILITY';

export const toggleMenuVisibility = () => ({
  type: TOGGLE_MENU_VISIBILITY,
});

export const FETCH_THEMES = 'FETCH_THEMES';

export const fetchThemes = () => ({
  type: FETCH_THEMES,
});

export const SET_THEMES = 'SET_THEMES';

export const setThemes = (themes) => ({
  type: SET_THEMES,
  themes,
});

export const SET_MODAL_CONFIRM = 'SET_MODAL_CONFIRM';

export const setModalConfirm = (modalConfirmParams) => ({
  type: SET_MODAL_CONFIRM,
  modalConfirmParams,
});

export const UNSET_MODAL_CONFIRM = 'UNSET_MODAL_CONFIRM';

export const unsetModalConfirm = () => ({
  type: UNSET_MODAL_CONFIRM,
});

export const SET_MESSAGE = 'SET_MESSAGE';

export const setMessage = (messageParams) => ({
  type: SET_MESSAGE,
  messageParams,
});

export const UNSET_MESSAGE = 'UNSET_MESSAGE';

export const unsetMessage = () => ({
  type: UNSET_MESSAGE,
});

export const SET_APP_LOADING = 'SET_APP_LOADING';

export const setAppLoading = (loading) => ({
  type: SET_APP_LOADING,
  loading,
});

export const SET_MOBILE_MENU_VISIBILITY = 'SET_MOBILE_MENU_VISIBILITY';

export const setMobileMenuVisibility = (visibility) => ({
  type: SET_MOBILE_MENU_VISIBILITY,
  visibility,
});

/* contact */
export const TRY_SEND_CONTACT_MESSAGE = 'TRY_SEND_CONTACT_MESSAGE';

export const trySendContactMessage = ({ name, email, message }) => ({
  type: TRY_SEND_CONTACT_MESSAGE,
  name,
  email,
  message,
});

export const SET_CONTACT_LOADING = 'SET_CONTACT_LOADING';

export const setContactLoading = (isLoading) => ({
  type: SET_CONTACT_LOADING,
  isLoading,
});
