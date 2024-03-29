import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import drawer from "./drawer";
import dialogReducers from "./dialogReducers";
import listReducers from "./listReducers";
import itemsReducers from "./itemsReducers";
import listItemsReducers from "./listItemsReducers";
import listItemsCreateFormValuesReducers from "./listItemsCreateFormValuesReducers";

export default combineReducers({
  auth,
  drawer,
  dialogReducers,
  listReducers,
  itemsReducers,
  listItemsReducers,
  listItemsCreateFormValuesReducers,
  form: formReducer,
});
