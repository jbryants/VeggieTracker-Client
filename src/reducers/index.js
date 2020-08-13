import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import drawer from "./drawer";

export default combineReducers({
  auth,
  drawer,
  form: formReducer,
});
