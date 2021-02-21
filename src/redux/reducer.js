import { combineReducers } from "redux";
import subtitleList from "./reducers/subtitleList";
import subCache from "./reducers/subCache";
import settings from "./reducers/settings";
import dialogs from "./reducers/dialogs";
import movie from "./reducers/movie";

export default combineReducers({
  subtitleList,
  subCache,
  settings,
  dialogs,
  movie,
});
