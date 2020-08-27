import { FETCH_ITEMS, FILTER_ITEMS } from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return action.payload;
    // case FETCH_ITEMS_BY_QUERY:
    //   return action.payload;
    case FILTER_ITEMS:
      return action.payload;
    default:
      return state;
  }
};
