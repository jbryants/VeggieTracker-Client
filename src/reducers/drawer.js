import { OPEN_DRAWER, CLOSE_DRAWER } from "../actions/types";

const INITIAL_STATE = {
  open: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case OPEN_DRAWER:
      return { ...state, open: action.payload };
    case CLOSE_DRAWER:
      return { ...state, open: action.payload };
    default:
      return state;
  }
}
