import { SubmissionError } from "redux-form";
import django from "../apis/djangoBackend";
import { CREATE_LIST, DELETE_LIST, FETCH_LISTS } from "./types";

export const createList = (formProps) => async (dispatch) => {
  try {
    const response = await django.post("/lists/", formProps);
    if (response.status === 201) {
      dispatch({ type: CREATE_LIST, payload: response.data });
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

export const fetchLists = () => async (dispatch) => {
  const response = await django.get("/lists/");
  console.log(response);
  dispatch({ type: FETCH_LISTS, payload: response.data.results });
};

export const deleteList = (id) => async (dispatch) => {
  await django.delete(`/lists/${id}/`);

  dispatch({
    type: DELETE_LIST,
    payload: id,
  });

  // history.push("/dashboard");
};
