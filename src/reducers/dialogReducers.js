import { OPEN_LIST_CREATE_DIALOG } from "../actions/types";

const INITIAL_STATE = {
  openListCreateFormDialog: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case OPEN_LIST_CREATE_DIALOG:
      return { ...state, openListCreateFormDialog: action.payload };
    default:
      return state;
  }
}
