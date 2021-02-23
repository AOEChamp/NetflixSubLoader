import { ADD_SUBTITLE, CLEAR_SUBS, SELECT_SUB } from "../actions";

const initialState = {
  subtitles: [],
  selectedSub: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_SUBTITLE:
      return {
        ...state,
        subtitles: (state.subtitles || []).concat([action.payload.subtitle]),
      };
    case SELECT_SUB:
      return {
        ...state,
        selectedSub: action.payload.subtitle,
      };
    case CLEAR_SUBS:
      return initialState;
    default:
      return state;
  }
};
