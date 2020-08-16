import React, { useState } from "react";
import ListDelete from "./ListDelete";

import { makeStyles } from "@material-ui/core/styles";
import Title from "../Title";
import { Grid, Typography, Divider, Chip } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ListItemChipList from "../ListItems/ListItemChipList";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },

  expandIcon: {
    transition: theme.transitions.create(["transform"], {
      duration: theme.transitions.duration.short,
    }),
  },
  expandLess: {
    transform: "rotate(+180deg)",
  },
  expandMore: {
    transform: "rotate(0)",
  },
}));

const ListDetail = (props) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="row-reverse"
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid item>
              <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="flex-end"
                spacing={1}
              >
                <Grid item xs>
                  <ExpandMoreIcon
                    onClick={handleExpand}
                    fontSize="large"
                    className={`
                      ${classes.expandIcon} 
                      ${expanded ? classes.expandLess : classes.expandMore}
                    `}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                spacing={2}
              >
                <Grid item xs>
                  <Title>{props.name}</Title>
                </Grid>
                <Grid item xs>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    color="secondary"
                  >
                    {props.shop}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    Number of items: 10
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    Total cost: ₹19.00
                  </Typography>
                </Grid>

                {expanded && (
                  <Grid item>
                    <ListItemChipList />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
            spacing={1}
          >
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
              <ListDelete listId={props.id} listName={props.name} />
              {/* <Button
                variant="contained"
                color="secondary"
                size="small"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={() => {
                  console.log(props.id + props.name);
                }}
              >
                Delete
              </Button> */}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default ListDetail;
