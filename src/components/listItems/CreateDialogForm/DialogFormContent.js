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
        name="baseUnit"
        id="baseUnit"
        inputLabel={"Base Units"}
        value={formState.baseUnit}
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
          name="baseQuantity"
          id="baseQuantity"
          inputLabel={`Base Quantity${
            formState.baseUnit !== "" ? ` in ${formState.baseUnit}` : ""
          }`}
          value={formState.baseQuantity}
          handleChange={handleChange}
          options={[
            ["0.25", "Quarter"],
            ["1.0", "Whole"],
            // ["QUARTER", "Quarter"],
            // ["WHOLE", "Whole"],
          ]}
          formHelperText={null}
        />
      )}
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
      {formState.baseUnit !== "dozen" && (
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
        name="totalQuantity"
        margin="dense"
        id="totalQuantity"
        label={`Total Quantity${
          formState.unit !== "" ? ` in ${formState.unit}` : ""
        }`}
        type="number"
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
        onChange={handleTotalPriceChange}
        value={totalPrice}
        fullWidth
      />
    </DialogContent>
  );
};

export default DialogFormContent;
