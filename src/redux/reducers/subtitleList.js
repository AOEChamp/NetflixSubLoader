import { ADD_SUBTITLE, SELECT_SUB } from "../actions";

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
    default:
      return state;
  }
};
