import axios from "axios";
import { AUTH_USER } from "./types";
import history from "../services/history";
import { SubmissionError } from "redux-form";

export const signup = (formProps) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3090/signup",
      formProps
    );

    if (response.data.token !== "") {
      dispatch({ type: AUTH_USER, payload: response.data.token });
      localStorage.setItem("token", response.data.token);
      history.push("/dashboard");
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
    const response = await axios.post(
      "http://localhost:3090/signin",
      formProps
    );

    if (response.data.token !== "") {
      dispatch({ type: AUTH_USER, payload: response.data.token });
      localStorage.setItem("token", response.data.token);
      history.push("/dashboard");
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
