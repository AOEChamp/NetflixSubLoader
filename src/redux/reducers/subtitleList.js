import { ADD_SUBTITLE } from "../actions";

const initialState = {
  subtitles: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_SUBTITLE:
      return {
        ...state,
        subtitles: (state.subtitles || []).concat([action.payload.subtitle]),
      };
    default:
      return state;
  }
};
