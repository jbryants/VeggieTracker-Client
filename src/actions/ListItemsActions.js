//import django from "../apis/djangoBackend";
import spring from "../apis/springBackend";
import {
  FETCH_LIST_ITEMS,
  CREATE_LIST_ITEMS,
  UPDATE_LIST_ITEM_VALUE,
  UPDATE_LIST_ITEM,
  DELETE_LIST_ITEMS,
} from "./types";
import _ from "lodash";

const listItemsResponseDtoHelper = (responseData) => {
  responseData.map(data => {
    data.baseQuantity = data.baseQuantity === "WHOLE" ? "1.0" : "0.25";
  });
  return responseData;
}

export const fetchListItems = (id) => async (dispatch) => {
  const response = await spring.get(`/listitems?listId=${id}`);
  const responseData = listItemsResponseDtoHelper(response.data);
  dispatch({ type: FETCH_LIST_ITEMS, payload: responseData });
};

const createListItemsRequestDtoHelper = (items) => {
  items.map(item => {
    item.baseUnit = item.baseUnit === "gram" ? "kg" : item.baseUnit;
    item.baseQuantity = item.baseQuantity === "1.0" ? "WHOLE" : "QUARTER";
  });
  return items;
}


export const createListItems = (items) => async (dispatch) => {
  const listItemsData = createListItemsRequestDtoHelper(items);
  const response = await spring.post("/listitems", listItemsData);
  const responseData = listItemsResponseDtoHelper(response.data);
  dispatch({ type: CREATE_LIST_ITEMS, payload: responseData });
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
    parseFloat(listItem.totalPrice) /
    (parseFloat(listItem.totalQuantity) / parseFloat(listItem.baseQuantity));
  return ["basePrice", basePrice.toPrecision(2)];
};

const updateListItemResponseDtoHelper = (data) => {
  data.baseQuantity = data.baseQuantity === "WHOLE" ? "1.0" : "0.25";
  return data;
}

export const updateListItem = (id, field, value) => async (
  dispatch,
  getState
) => {
  if (field === "totalPrice") {
    // if total_price was changed then update the base_price
    // and send that instead of total_price - as total_price updation is handled on server.
    [field, value] = updateBasePriceHelper(getState().listItemsReducers, id);
  }
  if (value !== "" && parseFloat(value) <= 99999) {
    if (field === "baseQuantity") {
      // DTO request mapping needed for base quantity
      value = value === "0.25" ? "QUARTER" : "WHOLE";
    }
    const response = await spring.patch(`/listitems/${id}`, {
      [field]: value,
    });
    const responseData = updateListItemResponseDtoHelper(response.data);
    if (response) {
      dispatch({
        type: UPDATE_LIST_ITEM,
        payload: responseData,
      });
    }
  }
};

export const deleteListItems = (selected) => async (dispatch) => {
  const selectedIds = selected.map((item) => item.id);
  const response = await spring.delete("/listitems", { data: selectedIds });
  const deleted = response.status === 204 ? selected : [];

  dispatch({
    type: DELETE_LIST_ITEMS,
    payload: deleted,
  });
};


// export const fetchListItems = (id) => async (dispatch) => {
//   const response = await django.get(`/listitems/?list=${id}`);
//   dispatch({ type: FETCH_LIST_ITEMS, payload: response.data.results });
// };

// export const createListItems = (items) => async (dispatch) => {
//   const response = await django.post("/listitems/", items);
//   dispatch({ type: CREATE_LIST_ITEMS, payload: response.data });
// };

// export const updateListItemValue = (id, field, value) => {
//   return {
//     type: UPDATE_LIST_ITEM_VALUE,
//     payload: { id, field, value },
//   };
// };

// const updateBasePriceHelper = (listItems, id) => {
//   const index = _.findIndex(listItems, ["id", id]);
//   const listItem = listItems[index];
//   const basePrice =
//     parseFloat(listItem.total_price) /
//     (parseFloat(listItem.total_quantity) / parseFloat(listItem.base_quantity));
//   return ["base_price", basePrice.toPrecision(2)];
// };

// export const updateListItem = (id, field, value) => async (
//   dispatch,
//   getState
// ) => {
//   if (field === "total_price") {
//     // if total_price was changed then update the base_price
//     // and send that instead of total_price - as total_price updation is handled on server.
//     [field, value] = updateBasePriceHelper(getState().listItemsReducers, id);
//   }
//   if (value !== "" && value <= 99999) {
//     const response = await django.patch(`/listitems/${id}/`, {
//       [field]: value,
//     });
//     console.log(response);
//     if (response) {
//       dispatch({
//         type: UPDATE_LIST_ITEM,
//         payload: response.data,
//       });
//     }
//   }
// };

// export const deleteListItems = (selected) => async (dispatch) => {
//   let deleted = [];
//   for (const item of selected) {
//     const response = await django.delete(`/listitems/${item.id}/`);
//     if (response.status === 204) {
//       deleted.push(item);
//     } else {
//       throw item.name + "Not deleted.";
//     }
//   }
//   dispatch({
//     type: DELETE_LIST_ITEMS,
//     payload: deleted,
//   });
// };
