import { SubmissionError } from "redux-form";
// import django from "../apis/djangoBackend";
import spring from "../apis/springBackend";
import history from "../services/history";
import { CREATE_LIST, DELETE_LIST, FETCH_LISTS } from "./types";

export const createList = (formProps, callback) => async (dispatch) => {
  try {
    const response = await spring.post("/lists", formProps);
    if (response.status === 201) {
      dispatch({ type: CREATE_LIST, payload: response.data });
      history.push(`/home/lists/edit/${response.data.id}`);
      callback();
    } else {
      throw new SubmissionError({
        _error: "Sorry, there was a problem creating the list.",
      });
    }
  } catch (e) {
    throw new SubmissionError({
      _error: "Sorry, there was a problem creating the list.",
    });
  }
};

export const fetchLists = () => async (dispatch, getState) => {
  // if (getState().auth.authenticated !== "") {
  if (localStorage.getItem("token") !== null) {
    const response = await spring.get("/lists");
    if (response.status !== 403) {
      dispatch({ type: FETCH_LISTS, payload: response.data });
    } else {
      console.log("permission denied to fetch lists");
    }
  }
};

export const deleteList = (id) => async (dispatch) => {
  try {
    await spring.delete(`/lists/${id}`);

    dispatch({
      type: DELETE_LIST,
      payload: id,
    });
  } catch (e) {
    console.log("failed to delete " + e);
  }
};

// export const createList = (formProps, callback) => async (dispatch) => {
//   try {
//     const response = await django.post("/lists/", formProps);
//     if (response.status === 201) {
//       dispatch({ type: CREATE_LIST, payload: response.data });
//       history.push(`/lists/edit/${response.data.id}`);
//       callback();
//     } else {
//       throw new SubmissionError({
//         _error: "Sorry, there was a problem creating the list.",
//       });
//     }
//   } catch (e) {
//     throw new SubmissionError({
//       _error: "Sorry, there was a problem creating the list.",
//     });
//   }
// };

// export const fetchLists = () => async (dispatch) => {
//   const response = await django.get("/lists/");
//   dispatch({ type: FETCH_LISTS, payload: response.data.results });
// };

// export const deleteList = (id) => async (dispatch) => {
//   await django.delete(`/lists/${id}/`);

//   dispatch({
//     type: DELETE_LIST,
//     payload: id,
//   });
// };
