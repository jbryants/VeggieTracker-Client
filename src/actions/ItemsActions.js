import django from "../apis/djangoBackend";
import { FETCH_ITEMS, FETCH_ITEMS_BY_QUERY } from "../actions/types";

// used for search where we need all items to select from
export const fetchItems = () => async (dispatch) => {
  const response = await django.get("/items/");
  dispatch({ type: FETCH_ITEMS, payload: response.data.results });
};

export const fetchItemsByQuery = (query) => async (dispatch) => {
  const response = await django.get(`/items/?search=${query}`);
  dispatch({ type: FETCH_ITEMS, payload: response.data.results });
};
