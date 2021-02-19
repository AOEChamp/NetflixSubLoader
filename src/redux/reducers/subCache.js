import { CACHE_SUB } from "../actions";
import { loadState, storeState } from "../storage/Storage";

const STORAGE_KEY = "sub-cache";

const initialState = loadState([], STORAGE_KEY);

export default (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CACHE_SUB:
      newState = state.filter(
        (s) =>
          !(
            s.name === action.payload.subtitle.name &&
            s.movieId === action.payload.subtitle.movieId
          )
      );
      while (newState.length >= action.payload.limit) {
        newState.shift();
      }
      newState.push(action.payload.subtitle);
  }
  if (newState != undefined) {
    storeState(newState, STORAGE_KEY);
  }

  return newState == undefined ? state : newState;
};
