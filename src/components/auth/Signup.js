import React from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { signup } from "../../actions";
import { Link as ReactRouterLink } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

const validate = (values) => {
  const errors = {};
  const requiredFields = ["email", "password1", "password2"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }

  if (values.password1 !== values.password2) {
    console.log("passwords don't match.");
    errors.password2 = "Passwords don't match";
  }

  if (values.password1 && values.password1.length < 8) {
    console.log("passwords must 8 characters long");
    errors.password1 = "Password must contain at least 8 characters";
  }

  if (/^\d+$/i.test(values.password1)) {
    console.log("passwords cannot have all numbers");
    errors.password1 =
      "Password is entirely numeric, please include some characters.";
  }

  return errors;
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.type === "dark" ? "#121212" : "",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    variant="outlined"
    margin="normal"
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

const SignUp = (props) => {
  const { handleSubmit, error } = props;
  const classes = useStyles();

  const onSubmit = (formProps) => {
    return props.signup(formProps);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {error && <Alert severity="error">{error}</Alert>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                component={renderTextField}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="password1"
                label="Password"
                type="password"
                id="password1"
                component={renderTextField}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                component={renderTextField}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                to="/"
                variant="body2"
                underline="hover"
                component={ReactRouterLink}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

// Compose helps us to apply multiple higher order components to a single component
export default compose(
  connect(null, { signup }),
  reduxForm({ form: "signup", validate })
)(SignUp);
