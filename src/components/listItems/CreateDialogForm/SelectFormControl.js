import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
    marginTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const SelectFormControl = (props) => {
  const classes = useStyles();

  const {
    name,
    id,
    inputLabel,
    value,
    handleChange,
    options,
    formHelperText,
  } = props;

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={`${inputLabel}-native-helper`}>
        {inputLabel}
      </InputLabel>

      <Select
        value={value}
        onChange={handleChange}
        inputProps={{
          name: name,
          id: id,
        }}
      >
        {/* <MenuItem aria-label="None" value="" ><em>None</em><MenuItem/> */}
        {options.map((value, index) => {
          return (
            <MenuItem key={index} value={value[0]}>
              {value[1]}
            </MenuItem>
          );
        })}
        {/* <MenuItem value={"units"}>Units</MenuItem> */}
      </Select>
      {formHelperText && <FormHelperText>{formHelperText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectFormControl;
