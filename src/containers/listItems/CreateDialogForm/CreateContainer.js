/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ListItemsCreate from "../../../components/listItems/CreateDialogForm/Create";
import {
  fetchItems,
  filterItemsSet,
  createListItems,
  appendListItemsFormValue,
  deleteListItemsFormValue,
  resetListItemsFormValues,
} from "../../../actions";

function CreateContainer(props) {
  const [inputValue, setInputValue] = useState("");
  const [inputValues, setInputValues] = useState([]);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    listId,
    items,
    values,
    fetchItems,
    filterItemsSet,
    createListItems,
    appendListItemsFormValue,
    deleteListItemsFormValue,
    resetListItemsFormValues,
  } = props;

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    // Debouncing
    const timerId = setTimeout(() => {
      props.fetchItems(inputValue);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [inputValue]);

  useEffect(() => {
    if (inputValues.length > values.length) {
      appendListItemsFormValue(inputValues[inputValues.length - 1]);
      handleClickOpen();
    } else if (inputValues.length < values.length) {
      deleteListItemsFormValue(inputValues);
    } else if (inputValues.length === 0) {
      resetListItemsFormValues();
    }
  }, [inputValues]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (values.length > 0) {
      createListItems(values);
    } else {
      setError(true);
    }
    setInputValues([]);
  };

  return (
    <ListItemsCreate
      listId={listId}
      setInputValue={setInputValue}
      error={error}
      setError={setError}
      open={open}
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      inputValues={inputValues}
      setInputValues={setInputValues}
      items={items}
      values={values}
      fetchItems={fetchItems}
      filterItemsSet={filterItemsSet}
      createListItems={createListItems}
      appendListItemsFormValue={appendListItemsFormValue}
      deleteListItemsFormValue={deleteListItemsFormValue}
      resetListItemsFormValues={resetListItemsFormValues}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    items: state.itemsReducers,
    values: state.listItemsCreateFormValuesReducers,
  };
};

export default connect(mapStateToProps, {
  fetchItems,
  filterItemsSet,
  createListItems,
  appendListItemsFormValue,
  deleteListItemsFormValue,
  resetListItemsFormValues,
})(CreateContainer);
