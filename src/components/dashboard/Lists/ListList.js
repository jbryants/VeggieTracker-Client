import React from "react";
import ListCreateFab from "./ListCreateFab";

import Grid from "@material-ui/core/Grid";
import ListDetail from "./ListDetail";

function ListList() {
  return (
    <Grid container spacing={3}>
      <ListDetail />
      <ListDetail />
      <ListDetail />
      <ListCreateFab />
    </Grid>
  );
}

export default ListList;
