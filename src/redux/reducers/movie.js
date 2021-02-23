import { SET_ALIGNMENT, SET_MOVIE_ID } from "../actions";
import { getMovieId } from "../../utils/LLNInterface";

const initialState = {
  alignment: 0,
  movieId: getMovieId(),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALIGNMENT:
      return {
        ...state,
        alignment: action.payload.alignment,
      };
    case SET_MOVIE_ID:
      return {
        ...state,
        movieId: action.payload.movieId,
      };
    default:
      return state;
  }
};
