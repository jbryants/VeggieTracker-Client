import {
  FETCH_LIST_ITEMS,
  CREATE_LIST_ITEMS,
  UPDATE_LIST_ITEM_VALUE,
  UPDATE_LIST_ITEM,
  DELETE_LIST_ITEMS,
  RESET_LIST_ITEMS,
} from "../actions/types";
import _ from "lodash";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LIST_ITEMS:
      return action.payload;
    case CREATE_LIST_ITEMS:
      return [...state, ...action.payload];
    case UPDATE_LIST_ITEM_VALUE:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, [action.payload.field]: action.payload.value };
        }
        return item;
      });
    case UPDATE_LIST_ITEM:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    case DELETE_LIST_ITEMS:
      return _.differenceBy(state, action.payload, "id");
    case RESET_LIST_ITEMS:
      return action.payload;
    default:
      return state;
  }
};
