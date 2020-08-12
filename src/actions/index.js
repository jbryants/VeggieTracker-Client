import axios from "axios";
import { AUTH_USER } from "./types";
import { SubmissionError } from "redux-form";

export const signup = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3090/signup",
      formProps
    );

    if (response.data.token !== "") {
      dispatch({ type: AUTH_USER, payload: response.data.token });
      localStorage.setItem("token", response.data.token);
      callback();
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

  return {
    type: AUTH_USER,
    payload: "",
  };
};

export const signin = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3090/signin",
      formProps
    );

    if (response.data.token !== "") {
      dispatch({ type: AUTH_USER, payload: response.data.token });
      localStorage.setItem("token", response.data.token);
      callback();
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

// export function signin(formProps, callback) {
//   return (dispatch) => {
//     return axios
//       .post("http://localhost:3090/signin", formProps)
//       .then((response) => {
//         if (response.data.token !== "") {
//           dispatch({ type: AUTH_USER, payload: response.data.token });
//           localStorage.setItem("token", response.data.token);
//           callback();
//         } else {
//           throw new SubmissionError({
//             _error: "Invalid login credentials",
//           });
//         }
//       })
//       .catch((error) => {
//         throw new SubmissionError({
//           _error: "Invalid login credentials",
//         });
//       });
//   };
// }
