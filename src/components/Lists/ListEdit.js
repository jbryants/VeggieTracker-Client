import React from "react";
import ListItemsCreate from "../listItems/ListItemsCreate";
import ListItemsTable from "../listItems/ListItemsTable";

function ListEdit(props) {
  return (
    <div>
      <ListItemsCreate />
      <ListItemsTable listId={props.match.params.id} />
    </div>
  );
}

export default ListEdit;
