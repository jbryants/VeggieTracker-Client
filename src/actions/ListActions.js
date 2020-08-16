import { OPEN_LIST_CREATE_DIALOG, CREATE_LIST } from "./types";
import django from "../apis/djangoBackend";
import { SubmissionError } from "redux-form";

export const handleListCreateFormDialog = (open) => {
  return {
    type: OPEN_LIST_CREATE_DIALOG,
    payload: open,
  };
};

export const createList = (formProps) => async (dispatch) => {
  try {
    const response = await django.post("/lists/", formProps);
    console.log(response);
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
