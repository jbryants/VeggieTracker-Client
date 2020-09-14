import django from "../apis/djangoBackend";
import {
  FETCH_LIST_ITEMS,
  CREATE_LIST_ITEMS,
  UPDATE_LIST_ITEM_VALUE,
  UPDATE_LIST_ITEM,
  DELETE_LIST_ITEMS,
} from "./types";
import _ from "lodash";

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

const updateBasePriceHelper = (listItems, id) => {
  const index = _.findIndex(listItems, ["id", id]);
  const listItem = listItems[index];
  const basePrice =
    parseFloat(listItem.total_price) /
    (parseFloat(listItem.total_quantity) / parseFloat(listItem.base_quantity));
  return ["base_price", basePrice.toPrecision(2)];
};

export const updateListItem = (id, field, value) => async (
  dispatch,
  getState
) => {
  if (field === "total_price") {
    // if total_price was changed then update the base_price
    // and send that instead of total_price - as total_price updation is handled on server.
    [field, value] = updateBasePriceHelper(getState().listItemsReducers, id);
  }
  if (value !== "" && value <= 99999) {
    const response = await django.patch(`/listitems/${id}/`, {
      [field]: value,
    });
    console.log(response);
    if (response) {
      dispatch({
        type: UPDATE_LIST_ITEM,
        payload: response.data,
      });
    }
  }
};

export const deleteListItems = (selected) => async (dispatch) => {
  let deleted = [];
  for (const item of selected) {
    const response = await django.delete(`/listitems/${item.id}/`);
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
