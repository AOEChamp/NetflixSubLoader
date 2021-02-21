import { SHOW_DIALOG, HIDE_DIALOG, DIALOGS } from "../actions";

const initialState = {};
Object.keys(DIALOGS).forEach((key) => {
  initialState[DIALOGS[key]] = {
    hidden: true,
    options: {},
  };
});

export default (state = initialState, action) => {
  switch (action.type) {
    case HIDE_DIALOG:
      return {
        ...state,
        [action.payload.name]: {
          hidden: true,
          options: {},
        },
      };
    case SHOW_DIALOG:
      return {
        ...state,
        [action.payload.name]: {
          hidden: false,
          options: action.payload.options,
        },
      };
    default:
      return state;
  }
};
