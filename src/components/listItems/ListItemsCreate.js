/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormDialog from "./ListItemsCreateFormDialog";
import { connect } from "react-redux";
import {
  fetchItems,
  filterItemsSet,
  createListItems,
  appendListItemsFormValue,
  deleteListItemsFormValue,
} from "../../actions";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.name,
});

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
    props.filterItemsSet();
  }, []);

  useEffect(() => {
    // Debouncing
    const timerId = setTimeout(() => {
      props.fetchItems(inputValue);
      props.filterItemsSet();
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

  const handleChange = (event, newValues) => {
    if (newValues.length > props.values.length) {
      props.appendListItemsFormValue(newValues[newValues.length - 1]);
      handleClickOpen();
    } else if (newValues.length < props.values.length) {
      props.deleteListItemsFormValue(newValues);
    }
  };

  const handleSubmit = () => {
    if (props.values.length > 0) {
      props.createListItems(props.values);
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
        filterOptions={filterOptions}
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
        listId={props.listId}
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
  filterItemsSet,
  createListItems,
  appendListItemsFormValue,
  deleteListItemsFormValue,
})(ListItemsCreate);
