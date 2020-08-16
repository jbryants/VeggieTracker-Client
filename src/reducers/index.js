import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import drawer from "./drawer";
import dialogReducers from "./dialogReducers";
import listReducers from "./listReducers";

export default combineReducers({
  auth,
  drawer,
  dialogReducers,
  listReducers,
  form: formReducer,
});
