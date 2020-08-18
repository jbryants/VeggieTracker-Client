import { FETCH_LIST_ITEMS } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  if (action.type === FETCH_LIST_ITEMS) {
    return state;
  }

  return state;
};
