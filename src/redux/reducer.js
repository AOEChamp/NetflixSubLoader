import { combineReducers } from "redux";
import subtitleList from "./reducers/subtitleList";
import subCache from "./reducers/subCache";
import settings from "./reducers/settings";

export default combineReducers({ subtitleList, subCache, settings });
