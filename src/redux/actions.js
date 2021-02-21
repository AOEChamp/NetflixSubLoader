export const ADD_SUBTITLE = "ADD_SUBTITLE";
export const SELECT_SUB = "SELECT_SUB";
export const CACHE_SUB = "CACHE_SUB";
export const SHOW_DIALOG = "SHOW_DIALOG";
export const HIDE_DIALOG = "HIDE_DIALOG";
export const SET_ALIGNMENT = "SET_ALIGNMENT";

export const DIALOGS = {
  ALIGNMENT_DIALOG: "ALIGNMENT_DIALOG",
};

export const addSubtitle = (subtitle) => ({
  type: ADD_SUBTITLE,
  payload: {
    subtitle,
  },
});

export const selectSub = (subtitle) => ({
  type: SELECT_SUB,
  payload: {
    subtitle,
  },
});

export const cacheSub = (subtitle, limit) => ({
  type: CACHE_SUB,
  payload: {
    subtitle,
    limit,
  },
});

export const showDialog = (name, options) => ({
  type: SHOW_DIALOG,
  payload: {
    name,
    options,
  },
});

export const hideDialog = (name) => ({
  type: HIDE_DIALOG,
  payload: {
    name,
  },
});

export const setAlignment = (alignment) => ({
  type: SET_ALIGNMENT,
  payload: {
    alignment,
  },
});
