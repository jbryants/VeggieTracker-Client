import { SET_LIST_ITEMS_FORM_VALUES } from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LIST_ITEMS_FORM_VALUES:
      return [...state, action.payload];
    // case APPEND_LIST_ITEMS_FORM_VALUES:
    //return [...state, action.payload];
    default:
      return state;
  }
};
