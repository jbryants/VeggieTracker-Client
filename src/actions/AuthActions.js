import spring from "../apis/springBackend";
import { AUTH_USER, VERIFY_EMAIL, RESET_LISTS, RESET_LIST_ITEMS } from "./types";
import history from "../services/history";
import { reset, SubmissionError } from "redux-form";

export const signup = (formProps) => async (dispatch) => {
  try {
    formProps.username = formProps.email;
    // const response = await spring.post("/rest-auth/registration/", formProps);
    const response = await spring.post("/auth/signup", formProps);

    if (response.status === 201) {
      // dispatch({ type: AUTH_USER, payload: response.data.key });
      // localStorage.setItem("token", response.data.key);
      // history.push("/lists");
      dispatch({ type: VERIFY_EMAIL, payload: false });
      history.push("/signin");
    } else {
      throw new SubmissionError({
        _error: "Email in use",
      });
    }
  } catch (e) {
    throw new SubmissionError({
      _error: "Email in use",
    });
  }
};

export const signout = () => async (dispatch) => {
  localStorage.removeItem("token");
  history.push("/");

  dispatch({
    type: AUTH_USER, 
    payload: null
  });
  dispatch(resetList());
  dispatch(resetListItems());
};

const resetList = () => async (dispatch) => {
  dispatch({ 
    type: RESET_LISTS,
    payload: {},
  });
}

const resetListItems = () => async (dispatch) => {
  dispatch({
    type: RESET_LIST_ITEMS,
    payload: [],
  });
}

export const signin = (formProps) => async (dispatch) => {
  dispatch({ type: VERIFY_EMAIL, payload: true });
  try {
    const response = await spring.post("/auth/login", formProps);
    
    if (response.status === 200) {
      // dispatch({ type: AUTH_USER, payload: response.data.key });
      // localStorage.setItem("token", response.data.key);
      dispatch({ type: AUTH_USER, payload: response.data.authenticationToken });
      // dispatch({ type: VERIFY_EMAIL, payload: true });
      localStorage.setItem("token", response.data.authenticationToken);
      history.push("/home/lists");
    } else {
      throw new SubmissionError({
        _error: "Invalid login credentials",
      });
    }
  } catch (e) {
    throw new SubmissionError({
      _error: "Invalid login credentials",
    });
  }
};

//   localStorage.removeItem("token");
// export const signout = () => {
//   history.push("/");
//   return {
//     type: AUTH_USER,
//     payload: "",
//   };
// };
