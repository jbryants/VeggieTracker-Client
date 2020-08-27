import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { submitListItemCreateFormValues } from "../../actions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
}));

function FormDialog(props) {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    list: props.listId ? props.listId : null,
    item: null,
    unit: "kg",
    base_quantity: "0",
    base_price: "0",
    total_quantity: "0",
  });
  const [totalPrice, setTotalPrice] = useState("0");

  console.log(props.item);

  useEffect(() => {
    setFormState({
      ...formState,
      list: props.listId ? props.listId : null,
      item: props.item ? props.item.item : null,
      unit: props.item ? props.item.unit : "kg",
      base_quantity: props.item ? `${props.item.base_quantity}` : "0.25",
      base_price: props.item ? `${props.item.base_price}` : "0",
      total_quantity: props.item ? `${props.item.total_quantity}` : "0",
    });

    return () => {
      // reset back to original state
      setFormState({
        ...formState,
        unit: "kg",
        base_quantity: "0",
        base_price: "0",
        total_quantity: "0",
      });
      setTotalPrice("0");
    };
  }, [props.item]);

  const handleChange = (event) => {
    const name = event.target.name;
    setFormState({
      ...formState,
      [name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    props.submitListItemCreateFormValues({
      ...formState,
      base_unit: formState.unit,
    });
    props.handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleSubmit}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {props.item ? props.item.name : "Item name"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add this item to your list, please fill in the additional details
            requested below.
          </DialogContentText>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-helper">Units</InputLabel>
            <NativeSelect
              value={formState.unit}
              onChange={handleChange}
              inputProps={{
                name: "unit",
                id: "units-native-helper",
              }}
              autoFocus
            >
              {/* <option aria-label="None" value="" /> */}
              <option value={"kg"}>Kilos</option>
              <option value={"dozen"}>Dozens</option>
              {/* <option value={"units"}>Units</option> */}
            </NativeSelect>
            <FormHelperText>Type of units for item</FormHelperText>
          </FormControl>
          {formState.unit !== "dozen" && (
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-helper">{`Base Quantity${
                formState.unit !== "" ? ` in ${formState.unit}` : ""
              }`}</InputLabel>

              <NativeSelect
                value={formState.base_quantity}
                onChange={handleChange}
                inputProps={{
                  name: "base_quantity",
                  id: "base_quantity",
                }}
              >
                <option value={"0.25"}>Quarter</option>
                <option value={"1.0"}>Whole</option>
              </NativeSelect>
              {/* <FormHelperText>Type of units for item</FormHelperText> */}
            </FormControl>
          )}
          <TextField
            name="base_price"
            margin="dense"
            id="base_price"
            label="Base Price"
            type="number"
            onChange={handleChange}
            value={formState.base_price}
            fullWidth
          />
          <TextField
            name="total_quantity"
            margin="dense"
            id="total_quantity"
            label={`Total Quantity${
              formState.unit !== "" ? ` in ${formState.unit}` : ""
            }`}
            type="number"
            className={classes.quantityTextField}
            onChange={handleChange}
            value={formState.total_quantity}
            fullWidth
          />
          <TextField
            name="totalPrice"
            margin="dense"
            id="totalPrice"
            label="Total Price"
            type="number"
            onChange={handleChange}
            value={totalPrice}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleSubmit} color="primary">
            Fill in later
          </Button> */}
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default connect(null, { submitListItemCreateFormValues })(FormDialog);
