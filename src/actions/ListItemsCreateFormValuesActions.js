import {
  LIST_ITEM_CREATE_FORM_VALUES,
  APPEND_LIST_ITEMS_FORM_VALUE,
  DELETE_LIST_ITEMS_FORM_VALUE,
  RESET_LIST_ITEMS_FORM_VALUES,
} from "./types";

export const submitListItemCreateFormValues = (value) => {
  return {
    type: LIST_ITEM_CREATE_FORM_VALUES,
    payload: value,
  };
};

export const appendListItemsFormValue = (value) => {
  return {
    type: APPEND_LIST_ITEMS_FORM_VALUE,
    payload: value,
  };
};

export const deleteListItemsFormValue = (values) => {
  return {
    type: DELETE_LIST_ITEMS_FORM_VALUE,
    payload: values,
  };
};

export const resetListItemsFormValues = () => {
  return {
    type: RESET_LIST_ITEMS_FORM_VALUES,
    payload: [],
  };
};
