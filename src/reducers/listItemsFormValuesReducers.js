import {
  LIST_ITEM_CREATE_FORM_VALUES,
  APPEND_LIST_ITEMS_FORM_VALUE,
  DELETE_LIST_ITEMS_FORM_VALUE,
  RESET_LIST_ITEMS_FORM_VALUES,
} from "../actions/types";
import _ from "lodash";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APPEND_LIST_ITEMS_FORM_VALUE:
      return [...state, action.payload];
    case LIST_ITEM_CREATE_FORM_VALUES:
      // changing the existing item values to the
      // values submitted in list item creation form
      return state.map((value) => {
        if (value.item === action.payload.item) {
          return action.payload;
        }
        return value;
      });
    case DELETE_LIST_ITEMS_FORM_VALUE:
      return _.intersectionBy(state, action.payload, "item");
    case RESET_LIST_ITEMS_FORM_VALUES:
      return action.payload;
    default:
      return state;
  }
};
