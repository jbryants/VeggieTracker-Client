import { FETCH_ITEMS, FETCH_ITEMS_BY_QUERY } from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return action.payload;
    case FETCH_ITEMS_BY_QUERY:
      return action.payload;
    default:
      return state;
  }
};
