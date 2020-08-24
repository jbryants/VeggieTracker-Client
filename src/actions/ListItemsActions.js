import django from "../apis/djangoBackend";
import { FETCH_LIST_ITEMS, UPDATE_LIST_ITEMS } from "./types";

export const fetchListItems = (id) => async (dispatch) => {
  const response = await django.get(`/listitems/?list=${id}`);
  dispatch({ type: FETCH_LIST_ITEMS, payload: response.data.results });
};

export const updateListItems = (id, name) => {
  return {
    type: UPDATE_LIST_ITEMS,
    payload: { id, name },
  };
};
