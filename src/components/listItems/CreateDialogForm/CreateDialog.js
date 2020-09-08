import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import DialogFormContent from "./DialogFormContent";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
  },
}));

const CreateDialog = (props) => {
  const classes = useStyles();
  const {
    item,
    open,
    formState,
    handleChange,
    totalPrice,
    handleTotalPriceChange,
    handleSubmit,
  } = props;

  const veggies = ["🍅", "🧅", "🍌", "🥔"];
  const random = Math.floor(Math.random() * veggies.length);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleSubmit}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Box display="flex" justifyContent="center">
            <Avatar
              alt={item ? item.name : "Item name"}
              src={item ? item.image_small : null}
              className={classes.large}
            />
          </Box>
          {veggies[random]} {item ? item.name : "Item name"} {veggies[random]}
        </DialogTitle>

        <DialogFormContent
          formState={formState}
          handleChange={handleChange}
          totalPrice={totalPrice}
          handleTotalPriceChange={handleTotalPriceChange}
        />
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
};

export default CreateDialog;
