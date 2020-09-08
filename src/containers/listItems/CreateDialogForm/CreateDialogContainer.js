import React, { useState, useEffect } from "react";
import CreateDialog from "../../../components/listItems/CreateDialogForm/CreateDialog";
import { connect } from "react-redux";
import { submitListItemCreateFormValues } from "../../../actions";

// Get all the common formulae separated.
// ####
//   setFormState({
//     ...formState,
//     base_price:
//       formState.base_quantity === "0.25"
//         ? formState.base_price / 4
//         : formState.base_price * 4,
//   });
// }, [formState.base_quantity]);

// ####
//   setFormState({
//     ...formState,
//     total_quantity:
//       formState.unit === "kg"
//         ? formState.total_quantity / 1000
//         : formState.unit === "gram"
//         ? formState.total_quantity * 1000
//         : "0",
//   });
// }, [formState.unit]);

function CreateDialogContainer(props) {
  const {
    submitListItemCreateFormValues,
    handleClickOpen,
    handleClose,
    listId,
    item,
    open,
  } = props;
  const [formState, setFormState] = useState({
    list: listId ? listId : null,
    item: null,
    base_unit: "kg",
    unit: "kg",
    base_quantity: "0.25",
    base_price: "0",
    total_quantity: "0",
  });
  const [totalPrice, setTotalPrice] = useState("0");

  const getTotalQuantityInKilos = () => {
    let totalQuantity = 0;
    if (formState.unit === "gram") {
      totalQuantity = parseFloat(formState.total_quantity) / 1000;
    } else {
      totalQuantity = parseFloat(formState.total_quantity);
    }

    return totalQuantity;
  };

  const updateTotalPrice = () => {
    const totalQuantity = getTotalQuantityInKilos();

    setTotalPrice(
      (totalQuantity / parseFloat(formState.base_quantity)) *
        parseFloat(formState.base_price)
    );
  };

  useEffect(() => {
    if (formState.base_unit === "dozen" || formState.unit === "dozen") {
      setFormState({
        ...formState,
        unit: formState.base_unit,
      });
    }
  }, [formState.base_unit]);

  useEffect(() => {
    // while base_quantity changes, we need to update base_price
    setFormState({
      ...formState,
      base_price:
        formState.base_quantity === "0.25"
          ? formState.base_price / 4
          : formState.base_price * 4,
    });
  }, [formState.base_quantity]);

  useEffect(() => {
    // while base_price changes, we need to update total_price
    updateTotalPrice();
  }, [formState.base_price]);

  useEffect(() => {
    setFormState({
      ...formState,
      total_quantity:
        formState.unit === "kg"
          ? formState.total_quantity / 1000
          : formState.unit === "gram"
          ? formState.total_quantity * 1000
          : "0",
    });
  }, [formState.unit]);

  useEffect(() => {
    // while total_quantity changes, we need to update total_price
    updateTotalPrice();
  }, [formState.total_quantity]);

  const handleTotalPriceChange = (event) => {
    setTotalPrice(event.target.value);
    // while total_quantity changes, we need to update base_price
    const totalQuantity = getTotalQuantityInKilos();

    setFormState({
      ...formState,
      base_price:
        parseFloat(event.target.value) /
        (totalQuantity / parseFloat(formState.base_quantity)),
    });
  };

  useEffect(() => {
    // this will have to changed to directly reflect the formState.
    // so can get rid of this hopefully.
    setFormState({
      ...formState,
      list: listId ? listId : null,
      item: item ? item.item : null,
      base_unit: item ? item.base_unit : "kg",
      base_quantity: item ? `${item.base_quantity}` : "0.25",
      base_price: item ? `${item.base_price}` : "0",
      unit: item ? item.unit : "kg",
      total_quantity: item ? `${item.total_quantity}` : "0",
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
  }, [item]);

  const handleChange = (event) => {
    const name = event.target.name;
    setFormState({
      ...formState,
      [name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    if (formState.unit === "gram") {
      submitListItemCreateFormValues({
        ...formState,
        unit: "kg",
        base_unit: "kg",
        total_quantity: parseInt(formState.total_quantity) / 1000,
      });
    } else {
      submitListItemCreateFormValues(formState);
    }
    handleClose();
  };

  return (
    <CreateDialog
      submitListItemCreateFormValues={submitListItemCreateFormValues}
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
      listId={listId}
      item={item}
      open={open}
      formState={formState}
      handleChange={handleChange}
      totalPrice={totalPrice}
      handleTotalPriceChange={handleTotalPriceChange}
      handleSubmit={handleSubmit}
    />
  );
}

// const mapStateToProps = (state) => {
//   return { formState: state.listItemsCreateFormValuesReducers };
// };

export default connect(null, { submitListItemCreateFormValues })(
  CreateDialogContainer
);
