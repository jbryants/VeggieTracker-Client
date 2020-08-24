import { SET_LIST_ITEMS_FORM_VALUES } from "./types";

export const setListItemsFormValues = (value) => {
  return {
    type: SET_LIST_ITEMS_FORM_VALUES,
    payload: value,
  };
};
