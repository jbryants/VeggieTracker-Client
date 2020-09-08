import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CreateDialogContainer from "../../../containers/listItems/CreateDialogForm/CreateDialogContainer";
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

const ListItemsCreate = (props) => {
  const classes = useStyles();
  const {
    listId,
    setInputValue,
    error,
    setError,
    open,
    handleClose,
    handleSubmit,
    inputValues,
    handleClickOpen,
    setInputValues,
    items,
    values,
  } = props;
  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={items}
        getOptionLabel={(option) => option.name}
        onOpen={() => setError(false)}
        onInputChange={(e, value) => setInputValue(value)}
        filterOptions={filterOptions}
        value={inputValues}
        onChange={(e, values) => setInputValues(values)}
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
      <CreateDialogContainer
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        listId={listId}
        item={values.length > 0 ? values[values.length - 1] : null}
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
          <Button
            onClick={() => setInputValues([])}
            variant="contained"
            className={classes.clearValuesButton}
          >
            Clear Values
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ListItemsCreate;
