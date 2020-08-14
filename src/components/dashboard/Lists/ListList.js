import React from "react";

import Grid from "@material-ui/core/Grid";
import ListDetail from "./ListDetail";
import { Fab } from "@material-ui/core";

import NoteAddIcon from "@material-ui/icons/NoteAdd";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PostAddOutlinedIcon from "@material-ui/icons/PostAddOutlined";
import PostAddRoundedIcon from "@material-ui/icons/PostAddRounded";
import PostAddTwoToneIcon from "@material-ui/icons/PostAddTwoTone";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3),
      marginRight: theme.spacing(3),
    },
    [theme.breakpoints.up("md")]: {
      marginBottom: theme.spacing(5),
      marginRight: theme.spacing(9),
    },
    [theme.breakpoints.up("lg")]: {
      marginBottom: theme.spacing(6),
      marginRight: theme.spacing(10),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function ListList() {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <ListDetail />
      <ListDetail />
      <ListDetail />
      <Grid item xs={3}>
        <Fab
          color="primary"
          className={classes.fab}
          aria-label="add"
          variant="extended"
        >
          <PostAddRoundedIcon
            fontSize="large"
            className={classes.extendedIcon}
          />
          NEW LIST
        </Fab>
      </Grid>
    </Grid>
  );
}

export default ListList;
