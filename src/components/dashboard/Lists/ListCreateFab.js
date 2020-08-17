import React, { useEffect } from "react";
import { connect } from "react-redux";
import { handleListCreateFormDialog } from "../../../actions";
import history from "../../../services/history";

import Grid from "@material-ui/core/Grid";
import { Fab } from "@material-ui/core";
import PostAddRoundedIcon from "@material-ui/icons/PostAddRounded";
import { makeStyles } from "@material-ui/core/styles";

import ListCreateFormDialog from "./ListCreateFormDialog";

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

const ListCreateFab = (props) => {
  const classes = useStyles();

  useEffect(() => {
    if (window.location.pathname === "/lists/new") {
      props.handleListCreateFormDialog(true);
    }
  }, [props]);

  const handleClickOpen = () => {
    props.handleListCreateFormDialog(true);
    history.push("/lists/new");
  };

  return (
    <div>
      <Grid item xs={3}>
        <Fab
          color="primary"
          className={classes.fab}
          aria-label="add"
          variant="extended"
          onClick={handleClickOpen}
        >
          <PostAddRoundedIcon
            fontSize="large"
            className={classes.extendedIcon}
          />
          NEW LIST
        </Fab>
      </Grid>
      <ListCreateFormDialog />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { open: state.dialogReducers.openListCreateFormDialog };
};

export default connect(mapStateToProps, { handleListCreateFormDialog })(
  ListCreateFab
);
