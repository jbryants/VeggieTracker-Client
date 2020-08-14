import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Title from "../Title";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },

  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function DetailedAccordian() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {/* <Typography className={classes.heading}>Accordion 1</Typography> */}
          <Paper className={classes.paper}>
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
                  <Typography variant="subtitle1">
                    Number of items: 10
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    Total cost: ₹19.00
                  </Typography>
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
            </Grid>
          </Paper>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
