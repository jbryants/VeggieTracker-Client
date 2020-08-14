import React from "react";
import requireAuth from "../requireAuth";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "./Header";
import Content from "./Content";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.type === "dark" ? "#121212" : "",
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <Content />
    </div>
  );
};

export default requireAuth(Dashboard);
