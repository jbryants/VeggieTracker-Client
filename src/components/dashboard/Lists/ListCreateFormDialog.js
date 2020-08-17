import React from "react";
import { connect } from "react-redux";
import { handleListCreateFormDialog, createList } from "../../../actions";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import history from "../../../services/history";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";

const validate = (values) => {
  console.log(values);
  const errors = {};
  const requiredFields = ["name", "shop"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  // if (
  //   values.email &&
  //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  // ) {
  //   errors.email = "Invalid email address";
  // }
  return errors;
};

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    margin="dense"
    required
    fullWidth
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const ListCreateFormDialog = (props) => {
  const { handleSubmit, reset, error } = props;

  const handleClose = () => {
    props.handleListCreateFormDialog(false);
    reset();
    history.push("/lists");
  };

  const onSubmit = (formProps) => {
    console.log(formProps);
    return props.createList(formProps);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create List</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText>
              To create a vegetable shopping list, please fill in the requested
              details below.
            </DialogContentText>
            <Grid container spacing={2}>
              {error && (
                <Grid item xs={12}>
                  <Alert variant="outlined" severity="error">
                    {error}
                  </Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                <Field
                  autoFocus
                  id="name"
                  name="name"
                  label="Name"
                  type="text"
                  component={renderTextField}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  id="shop"
                  name="shop"
                  label="Shop"
                  type="text"
                  component={renderTextField}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { open: state.dialogReducers.openListCreateFormDialog };
};

// Compose helps us to apply multiple higher order components to a single component
export default compose(
  connect(mapStateToProps, { handleListCreateFormDialog, createList }),
  reduxForm({ form: "create-list", validate })
)(ListCreateFormDialog);
