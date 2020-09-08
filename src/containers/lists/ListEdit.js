import React from "react";
import ListItemsCreate from "../listItems/CreateDialogForm/CreateContainer";
import ListItemsTable from "../listItems/Table/ListItemsTableContainer";

function ListEdit({ match }) {
  return (
    <div>
      <ListItemsCreate listId={match.params.id} />
      <ListItemsTable listId={match.params.id} />
    </div>
  );
}

export default ListEdit;
