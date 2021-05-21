import {
  SET_THEME_MANAGER_LOADING,
  SET_THEME_MANAGER_UPDATE_LOADING,
  SET_THEME_MANAGER_ERROR,
  SET_THEME_MANAGER_FIELD_VALUE,
  SET_THEME_MANAGER_IS_SAVED,
  SET_THEME_MANAGER_CHECKBOXES,
} from 'src/actions/exerciseManager/themeManager';

import {
  SET_MANAGERS_FROM_DB,
  RESET_MANAGERS,
} from 'src/actions/exerciseManager';

const initialState = {
  loading: true,
  updateLoading: false,
  error: false,
  themes: [],
  isSaved: true,
};

const themeManager = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_MANAGERS_FROM_DB:
      return {
        ...state,
        themes: state.themes.map((theme) => {
          if (action.themes.includes(theme.id)) {
            theme.checked = true;
          }
          return theme;
        }),
      };
    case SET_THEME_MANAGER_ERROR:
      return {
        ...state,
        error: action.status,
      };
    case SET_THEME_MANAGER_LOADING:
      return {
        ...state,
        loading: action.status,
      };
    case SET_THEME_MANAGER_UPDATE_LOADING:
      return {
        ...state,
        updateLoading: action.status,
      };
    case SET_THEME_MANAGER_CHECKBOXES:
      return {
        ...state,
        themes: action.themes.map((theme) => ({
          ...theme,
          checked: false,
        })),
      };
    case SET_THEME_MANAGER_FIELD_VALUE:
      return {
        ...state,
        themes: state.themes.map((theme) => {
          const newTheme = { ...theme };

          if (theme.id === action.themeId) {
            newTheme.checked = action.isChecked;
          }

          return newTheme;
        }),
      };
    case SET_THEME_MANAGER_IS_SAVED:
      return {
        ...state,
        isSaved: action.status,
      };
    default:
      return state;
  }
};

export default themeManager;
