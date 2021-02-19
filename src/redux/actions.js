export const ADD_SUBTITLE = "ADD_SUBTITLE";
export const SELECT_SUB = "SELECT_SUB";

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
