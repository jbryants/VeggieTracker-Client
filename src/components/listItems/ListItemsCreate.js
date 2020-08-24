/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormDialog from "./ListItemsCreateFormDialog";
import { connect } from "react-redux";
import {
  fetchItems,
  fetchItemsByQuery,
  setListItemsFormValues,
} from "../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
  },
}));

function ListItemsCreate(props) {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    props.fetchItems();
  }, []);

  useEffect(() => {
    // Debouncing
    const timerId = setTimeout(() => {
      props.fetchItemsByQuery(inputValue);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [inputValue]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    if (newValue.length > props.values.length) {
      console.log("increasing...", newValue);
      handleClickOpen();
    } else if (newValue.length < props.values.length) {
      console.log("decreasing...time to filter", newValue);
    }
  };

  const handleSubmit = () => {
    if (props.values.length > 0) {
      console.log("Submitting...", props.values);
    } else {
      setError(true);
    }
  };

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={props.items}
        getOptionLabel={(option) => option.name}
        onOpen={() => setError(false)}
        onChange={handleChange}
        onInputChange={(e, value) => setInputValue(value)}
        renderInput={(params) => (
          <TextField
            name="listItems"
            {...params}
            variant="standard"
            label="List items"
            placeholder="Items"
            autoFocus
            required
            error={error}
            helperText={error ? "Required" : null}
          />
        )}
      />
      <FormDialog
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        item={
          props.values.length > 0 ? props.values[props.values.length - 1] : null
        }
      />
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" className={classes.clearValuesButton}>
            Clear Values
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    items: state.itemsReducers,
    values: state.listItemsFormValuesReducers,
  };
};

export default connect(mapStateToProps, {
  fetchItems,
  fetchItemsByQuery,
  setListItemsFormValues,
})(ListItemsCreate);
