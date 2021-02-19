import {} from "../actions";
import { loadState, storeState } from "../storage/Storage";

const STORAGE_KEY = "settings";

const initialState = loadState(
  {
    storeLastUsedSub: true,
    maxSubsToCache: 5,
  },
  STORAGE_KEY
);

export default (state = initialState, action) => {
  let newState;
  switch (action.type) {
  }
  if (newState != undefined) {
    storeState(newState, STORAGE_KEY);
  }

  return newState == undefined ? state : newState;
};
