import django from "../apis/djangoBackend";
import {
  FETCH_LIST_ITEMS,
  CREATE_LIST_ITEMS,
  UPDATE_LIST_ITEM_VALUE,
  UPDATE_LIST_ITEM,
  DELETE_LIST_ITEMS,
} from "./types";

export const fetchListItems = (id) => async (dispatch) => {
  const response = await django.get(`/listitems/?list=${id}`);
  dispatch({ type: FETCH_LIST_ITEMS, payload: response.data.results });
};

export const createListItems = (items) => async (dispatch) => {
  const response = await django.post("/listitems/", items);
  dispatch({ type: CREATE_LIST_ITEMS, payload: response.data });
};

export const updateListItemValue = (id, field, value) => {
  return {
    type: UPDATE_LIST_ITEM_VALUE,
    payload: { id, field, value },
  };
};

export const updateListItem = (id, field, value) => async (dispatch) => {
  // if total_price was changed then update the base_price accordingly
  // then send both of them together.

  console.log("requesting...");
  if (value !== "" && value <= 99999) {
    const response = await django.patch(`/listitems/${id}/`, {
      [field]: value,
    });
    dispatch({
      type: UPDATE_LIST_ITEM,
      payload: response.data,
    });
  }
};

export const deleteListItems = (selected) => async (dispatch) => {
  let deleted = [];
  for (const item of selected) {
    console.log(item);
    const response = await django.delete(`/listitems/${item.id}/`);
    console.log(response);
    if (response.status === 204) {
      deleted.push(item);
    } else {
      throw item.name + "Not deleted.";
    }
  }
  dispatch({
    type: DELETE_LIST_ITEMS,
    payload: deleted,
  });
};
