import { combineReducers } from "redux";
import tracesReducer from "./tracesReducer";

const rootReducer = combineReducers({
  traces: tracesReducer,
});

export default rootReducer;
