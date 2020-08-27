import React from "react";
import ListItemsCreate from "../listItems/ListItemsCreate";
import ListItemsTable from "../listItems/ListItemsTable";

function ListEdit({ match }) {
  return (
    <div>
      <ListItemsCreate listId={match.params.id} />
      <ListItemsTable listId={match.params.id} />
    </div>
  );
}

export default ListEdit;
