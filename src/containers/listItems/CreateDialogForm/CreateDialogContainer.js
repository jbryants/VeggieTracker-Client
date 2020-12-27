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
    listId: listId ? listId : null,
    itemId: null,
    baseUnit: "kg",
    unit: "kg",
    baseQuantity: "0.25",
    basePrice: "0",
    totalQuantity: "0",
  });
  const [totalPrice, setTotalPrice] = useState("0");

  const getTotalQuantityInKilos = () => {
    let totalQuantity = 0;
    if (formState.unit === "gram") {
      totalQuantity = parseFloat(formState.totalQuantity) / 1000;
    } else {
      totalQuantity = parseFloat(formState.totalQuantity);
    }

    return totalQuantity;
  };

  const updateTotalPrice = () => {
    const totalQuantity = getTotalQuantityInKilos();

    setTotalPrice(
      (totalQuantity / parseFloat(formState.baseQuantity)) *
        parseFloat(formState.basePrice)
    );
  };

  useEffect(() => {
    if (formState.baseUnit === "dozen" || formState.unit === "dozen") {
      setFormState({
        ...formState,
        unit: formState.baseUnit,
      });
    }
  }, [formState.baseUnit]);

  useEffect(() => {
    // while base_quantity changes, we need to update base_price
    setFormState({
      ...formState,
      basePrice:
        formState.baseQuantity === "0.25"
          ? formState.basePrice / 4
          : formState.basePrice * 4,
    });
  }, [formState.baseQuantity]);

  useEffect(() => {
    // while base_price changes, we need to update total_price
    updateTotalPrice();
  }, [formState.basePrice]);

  useEffect(() => {
    setFormState({
      ...formState,
      totalQuantity:
        formState.unit === "kg"
          ? formState.totalQuantity / 1000
          : formState.unit === "gram"
          ? formState.totalQuantity * 1000
          : "0",
    });
  }, [formState.unit]);

  useEffect(() => {
    // while total_quantity changes, we need to update total_price
    updateTotalPrice();
  }, [formState.totalQuantity]);

  const handleTotalPriceChange = (event) => {
    setTotalPrice(event.target.value);
    // while total_quantity changes, we need to update base_price
    const totalQuantity = getTotalQuantityInKilos();

    setFormState({
      ...formState,
      basePrice:
        parseFloat(event.target.value) /
        (totalQuantity / parseFloat(formState.baseQuantity)),
    });
  };

  useEffect(() => {
    // this will have to changed to directly reflect the formState.
    // so can get rid of this hopefully.
    setFormState({
      ...formState,
      listId: listId ? listId : null,
      itemId: item ? item.itemId : null,
      baseUnit: item ? item.baseUnit : "kg",
      baseQuantity: item ? `${item.baseQuantity}` : "0.25",
      basePrice: item ? `${item.basePrice}` : "0",
      unit: item ? item.unit : "kg",
      totalQuantity: item ? `${item.totalQuantity}` : "0",
    });

    return () => {
      // reset back to original state
      setFormState({
        ...formState,
        unit: "kg",
        baseQuantity: "0",
        basePrice: "0",
        totalQuantity: "0",
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
        baseUnit: "kg",
        totalQuantity: parseInt(formState.totalQuantity) / 1000,
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
