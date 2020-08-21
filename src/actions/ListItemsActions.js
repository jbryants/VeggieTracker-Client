import django from "../apis/djangoBackend";
import { FETCH_LIST_ITEMS, UPDATE_LIST_ITEMS } from "./types";

// used for search where we need all items to select from
export const fetchListItems = () => async (dispatch) => {
  const response = await django.get("/listitems/?list=13");
  console.log(response);
  dispatch({ type: FETCH_LIST_ITEMS, payload: response.data });
};

export const updateListItems = (id, name) => {
  return {
    type: UPDATE_LIST_ITEMS,
    payload: { id, name },
  };
};
