import { CREATE_LIST, FETCH_LISTS, DELETE_LIST, RESET_LISTS } from "../actions/types";
import _ from "lodash";

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_LISTS:
      return { ...state, ..._.mapKeys(action.payload, "id") };

    case CREATE_LIST:
      return { ...state, [action.payload.id]: action.payload };

    case DELETE_LIST:
      return _.omit(state, action.payload);

    case RESET_LISTS:
      return action.payload;

    default:
      return state;
  }
}
