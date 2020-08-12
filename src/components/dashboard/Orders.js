import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Title>Veggies list</Title>
          </Grid>
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1">
              Pachakari karan
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">Number of items: 10</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">Total cost: ₹19.00</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            endIcon={<EditIcon />}
          >
            Edit
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            className={classes.button}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
