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
import { setListItemsFormValues } from "../../actions";

const useStyles = makeStyles((theme) => ({
  quantityTextField: {
    //width: "70%",
  },
  formControl: {
    //margin: theme.spacing(1),
    width: "100%",
  },
}));

function FormDialog(props) {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    itemName: null,
    units: props.item ? props.item.default_unit : "dozens",
    baseQuantity: props.item ? `${props.item.default_quantity}` : "",
    basePrice: "",
    totalQuantity: "",
    totalPrice: "",
  });

  useEffect(() => {
    setFormState({
      ...formState,
      itemName: props.item ? props.item.name : null,
      units: props.item ? props.item.default_unit : "dozens",
      baseQuantity: props.item ? `${props.item.default_quantity}` : "",
    });

    return () => {
      // reset back to original state
      setFormState({
        itemName: null,
        units: "kilos",
        baseQuantity: "",
        basePrice: "",
        totalQuantity: "",
        totalPrice: "",
      });
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
    props.setListItemsFormValues(formState);
    props.handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {props.item ? props.item.title : "Item name"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add this item to your list, please fill in the additional details
            requested below.
          </DialogContentText>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-helper">Units</InputLabel>
            <NativeSelect
              value={formState.units}
              onChange={handleChange}
              inputProps={{
                name: "units",
                id: "units-native-helper",
              }}
              autoFocus
            >
              {/* <option aria-label="None" value="" /> */}
              <option value={"kg"}>Kilos</option>
              <option value={"dozens"}>Dozens</option>
              <option value={"units"}>Units</option>
            </NativeSelect>
            <FormHelperText>Type of units for item</FormHelperText>
          </FormControl>
          <TextField
            name="baseQuantity"
            margin="dense"
            id="baseQuantity"
            label={`Base Quantity${
              formState.units !== "" ? ` in ${formState.units}` : ""
            }`}
            type="number"
            className={classes.quantityTextField}
            onChange={handleChange}
            value={formState.baseQuantity}
            fullWidth
          />
          <TextField
            name="basePrice"
            margin="dense"
            id="basePrice"
            label="Base Price"
            type="number"
            onChange={handleChange}
            value={formState.basePrice}
            fullWidth
          />
          <TextField
            name="totalQuantity"
            margin="dense"
            id="totalQuantity"
            label={`Total Quantity${
              formState.units !== "" ? ` in ${formState.units}` : ""
            }`}
            type="number"
            className={classes.quantityTextField}
            onChange={handleChange}
            value={formState.totalQuantity}
            fullWidth
          />
          <TextField
            name="totalPrice"
            margin="dense"
            id="totalPrice"
            label="Total Price"
            type="number"
            onChange={handleChange}
            value={formState.totalPrice}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={props.handleClose} color="primary">
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

export default connect(null, { setListItemsFormValues })(FormDialog);

// {
//   "total_quantity": 1.0,
//   "unit": "kg",
//   "base_quantity": 1.0,
//   "base_unit": "kg",
//   "base_price": 20,
//   "list": 6,
//   "item": 2
// }

// {
//   "total_quantity": "",
//   "unit": "kg",
//   "base_quantity": "0.25",
//   "base_unit": "kg",
//   "base_price": "",
//   "order": "",
//   "list": 13,
//   "item": 3
// }

// [
//   {
//     total_quantity: "1",
//     unit: "kg",
//     base_quantity: "0.25",
//     base_unit: "kg",
//     base_price: "20",
//     list: 24,
//     item: 3,
//   },
//   {
//     total_quantity: "1",
//     unit: "kg",
//     base_quantity: "0.25",
//     base_unit: "kg",
//     base_price: "30",
//     list: 24,
//     item: 2,
//   },
// ];

// [
//   {
//       "total_quantity": 1.0,
//       "unit": "kg",
//       "base_quantity": 1.0,
//       "base_unit": "kg",
//       "base_price": 20,
//       "list": 37,
//       "item": 2
//   },
//   {
//       "total_quantity": 1.0,
//       "unit": "kg",
//       "base_quantity": 0.25,
//       "base_unit": "kg",
//       "base_price": 40,
//       "list": 37,
//       "item": 1
//   }
// ]
