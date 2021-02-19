export const ADD_SUBTITLE = "ADD_SUBTITLE";

export const addSubtitle = (subtitle) => ({
  type: ADD_SUBTITLE,
  payload: {
    subtitle,
  },
});
