import { OPEN_LIST_CREATE_DIALOG, CREATE_LIST } from "../actions/types";

const INITIAL_STATE = {
  openFormDialog: false,
  list: {},
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case OPEN_LIST_CREATE_DIALOG:
      return { ...state, openFormDialog: action.payload };
    case CREATE_LIST:
      return { ...state, list: action.payload };
    default:
      return state;
  }
}
