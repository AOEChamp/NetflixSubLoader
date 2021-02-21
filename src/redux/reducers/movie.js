import { SET_ALIGNMENT } from "../actions";

const initialState = {
  alignment: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALIGNMENT:
      return {
        ...state,
        alignment: action.payload.alignment,
      };
    default:
      return state;
  }
};
