export const ADD_SUBTITLE = "ADD_SUBTITLE";
export const SELECT_SUB = "SELECT_SUB";
export const CACHE_SUB = "CACHE_SUB";

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
