import django from "../apis/djangoBackend";
import { AUTH_USER } from "./types";
import history from "../services/history";
import { SubmissionError } from "redux-form";

export const signup = (formProps) => async (dispatch) => {
  try {
    formProps.username = formProps.email;
    const response = await django.post("/rest-auth/registration/", formProps);

    if (response.status === 201) {
      dispatch({ type: AUTH_USER, payload: response.data.key });
      localStorage.setItem("token", response.data.key);
      history.push("/lists");
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

export const signout = () => {
  localStorage.removeItem("token");
  history.push("/");

  return {
    type: AUTH_USER,
    payload: "",
  };
};

export const signin = (formProps) => async (dispatch) => {
  try {
    const response = await django.post("/rest-auth/login/", formProps);

    if (response.status === 200) {
      dispatch({ type: AUTH_USER, payload: response.data.key });
      localStorage.setItem("token", response.data.key);
      history.push("/lists");
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
