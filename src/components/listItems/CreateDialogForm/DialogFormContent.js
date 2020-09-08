import React from "react";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import SelectFormControl from "./SelectFormControl";

const DialogFormContent = (props) => {
  const { formState, handleChange, totalPrice, handleTotalPriceChange } = props;

  return (
    <DialogContent>
      <DialogContentText>
        To add this item to your list, please fill in the additional details
        requested below.
      </DialogContentText>
      <SelectFormControl
        name="base_unit"
        id="base_unit"
        inputLabel={"Base Units"}
        value={formState.base_unit}
        handleChange={handleChange}
        options={[
          ["gram", "Gram"],
          ["kg", "Kilogram"],
          ["dozen", "Dozen"],
        ]}
        formHelperText={"Type of units for base quantity"}
        autoFocus
      />
      {formState.base_unit !== "dozen" && (
        <SelectFormControl
          name="base_quantity"
          id="base_quantity"
          inputLabel={`Base Quantity${
            formState.base_unit !== "" ? ` in ${formState.base_unit}` : ""
          }`}
          value={formState.base_quantity}
          handleChange={handleChange}
          options={[
            ["0.25", "Quarter"],
            ["1.0", "Whole"],
          ]}
          formHelperText={null}
        />
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
      {formState.base_unit !== "dozen" && (
        <SelectFormControl
          name="unit"
          id="unit"
          inputLabel={"Units for Total"}
          value={formState.unit}
          handleChange={handleChange}
          options={[
            ["gram", "Gram"],
            ["kg", "Kilogram"],
          ]}
          formHelperText={"Type of units for total quantity"}
        />
      )}
      <TextField
        name="total_quantity"
        margin="dense"
        id="total_quantity"
        label={`Total Quantity${
          formState.unit !== "" ? ` in ${formState.unit}` : ""
        }`}
        type="number"
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
        onChange={handleTotalPriceChange}
        value={totalPrice}
        fullWidth
      />
    </DialogContent>
  );
};

export default DialogFormContent;
