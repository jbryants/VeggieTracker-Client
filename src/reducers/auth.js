import { AUTH_USER, VERIFY_EMAIL } from "../actions/types";

const INITIAL_STATE = {
  authenticated: "",
  isEmailVerified: true,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: action.payload };
    case VERIFY_EMAIL:
      return { ...state, isEmailVerified: action.payload };
    default:
      return state;
  }
}

