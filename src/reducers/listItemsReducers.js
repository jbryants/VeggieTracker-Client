import { FETCH_LIST_ITEMS, UPDATE_LIST_ITEMS } from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LIST_ITEMS:
      return action.payload;
    case UPDATE_LIST_ITEMS:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          item.name = action.payload.name;
        }
        return item;
      });

    default:
      return state;
  }
};
