import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import drawer from "./drawer";
import listReducers from "./listReducers";

export default combineReducers({
  auth,
  drawer,
  listReducers,
  form: formReducer,
});
