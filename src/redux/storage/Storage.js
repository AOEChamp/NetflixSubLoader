import { saveObject, loadObject } from "./LocalStorage";

export const storeState = (state, key) => {
  saveObject(key, state);
};

export const loadState = (defaultState, key) => {
  const loadedState = loadObject(key);
  return loadedState === undefined ? defaultState : loadedState;
};
