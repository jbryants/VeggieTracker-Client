import { OPEN_LIST_CREATE_DIALOG } from "./types";

export const handleListCreateFormDialog = (open) => {
  return {
    type: OPEN_LIST_CREATE_DIALOG,
    payload: open,
  };
};
