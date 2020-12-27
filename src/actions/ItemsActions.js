//import django from "../apis/djangoBackend";
import spring from "../apis/springBackend";
import { FETCH_ITEMS, FILTER_ITEMS } from "../actions/types";
import _ from "lodash";

const transformResponseHelper = (response) => {
  // Transforming the response data in appropriate way in order
  // to be used for addition of items to list and
  // creation of listitem entity.
  return response.data.map((value) => {
    value.itemId = value.id;
    value.unit = value.defaultUnit;
    value.baseUnit = value.defaultUnit;
    value.baseQuantity =
      value.defaultQuantity === "WHOLE" ? "1.0" : "0.25";

    delete value.id;
    delete value.defaultUnit;
    delete value.defaultQuantity;
    delete value.category;

    return {
      ...value,
      totalQuantity: 0,
      basePrice: 0,
      listId: 0,
    };
  });
};

export const fetchItems = (query = "") => async (dispatch) => {
  let response;

  if (query === "") {
    response = await spring.get("/items/");
  } else {
    response = await spring.get(`/items?search=${query}`);
  }

  const transformedResponse = transformResponseHelper(response);

  dispatch({ type: FETCH_ITEMS, payload: transformedResponse });
  dispatch(filterItemsSet());
};

export const filterItemsSet = () => (dispatch, getState) => {
  const filteredItems = _.differenceBy(
    getState().itemsReducers,
    getState().listItemsReducers,
    "itemId"
  );
  dispatch({ type: FILTER_ITEMS, payload: filteredItems });
};


// const transformResponseHelper = (response) => {
//   // Transforming the response data in appropriate way in order
//   // to be used for addition of items to list and
//   // creation of listitem entity.
//   return response.data.results.map((value) => {
//     value.item = value.id;
//     value.unit = value.default_unit;
//     value.base_unit = value.default_unit;
//     value.base_quantity =
//       value.default_quantity === 1 ? "1.0" : value.default_quantity;

//     delete value.id;
//     delete value.default_unit;
//     delete value.default_quantity;
//     delete value.category;

//     return {
//       ...value,
//       total_quantity: 0,
//       base_price: 0,
//       list: 0,
//     };
//   });
// };

// export const fetchItems = (query = "") => async (dispatch) => {
//   let response;

//   if (query === "") {
//     response = await django.get("/items/");
//   } else {
//     response = await django.get(`/items/?search=${query}`);
//   }

//   const transformedResponse = transformResponseHelper(response);

//   dispatch({ type: FETCH_ITEMS, payload: transformedResponse });
//   dispatch(filterItemsSet());
// };

// export const filterItemsSet = () => (dispatch, getState) => {
//   const filteredItems = _.differenceBy(
//     getState().itemsReducers,
//     getState().listItemsReducers,
//     "item"
//   );
//   dispatch({ type: FILTER_ITEMS, payload: filteredItems });
// };

