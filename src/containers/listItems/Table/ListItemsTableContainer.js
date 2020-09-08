import React, { useEffect } from "react";
import ListItemsTable from "./ListItemsTable";
import { connect } from "react-redux";
import {
  fetchItems,
  updateListItemValue,
  updateListItem,
  fetchListItems,
  filterItemsSet,
  deleteListItems,
} from "../../../actions";
import _ from "lodash";

const EnhancedTable = (props) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const debouncedFn = React.useCallback(
    _.debounce((id, name, val) => props.updateListItem(id, name, val), 900),
    []
  );
  const [total, setTotal] = React.useState({
    base_quantity: 0.0,
    total_quantity: 0.0,
    base_price: 0.0,
    total_price: 0.0,
  });

  useEffect(() => {
    props.fetchListItems(props.listId);
  }, []);

  useEffect(() => {
    //console.log("On data change.");
    //props.filterItemsSet();
    // might need this for something else in future.
  }, [props.rows]);

  useEffect(() => {
    props.fetchItems();
    //if (props.rows.length > 0) {
    //console.log("Calculate total when rows count change.");
    updateTotal(props.rows);
  }, [props.rows.length]);

  useEffect(() => {
    if (selected.length === 0 && props.rows.length > 0) {
      //console.log("Total calculation when nothing is selected.");
      updateTotal(props.rows);
    } else if (selected.length > 0) {
      //console.log("recalculate total based on items selected.");
      updateTotal(selected);
    }
  }, [selected]);

  const updateTotal = (items) => {
    console.log("Calculating total on the basis of: ", items);
    let base_quantity = 0.0;
    let total_quantity = 0.0;
    let base_price = 0.0;
    let total_price = 0.0;

    for (const item of items) {
      base_quantity += parseFloat(item.base_quantity);
      total_quantity += parseFloat(item.total_quantity);
      base_price += parseFloat(item.base_price);
      total_price += parseFloat(item.total_price);
    }

    setTotal({
      base_quantity,
      total_quantity,
      base_price,
      total_price,
    });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.rows;
      //.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, rowId) => {
    const selectedIndex = selected.indexOf(rowId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, rowId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChange = (e, id) => {
    /* signal to React not to nullify the event object */
    e.persist();

    const target = e.target;
    props.updateListItemValue(id, target.name, target.value);

    // Debouncing server patch method request
    debouncedFn(id, target.name, target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleDelete = (event) => {
    console.log(event, selected);
    props.deleteListItems(selected);
    setSelected([]);
  };

  const isSelected = (rowId) => selected.indexOf(rowId) !== -1;

  return (
    <ListItemsTable
      order={order}
      orderBy={orderBy}
      selected={selected}
      page={page}
      dense={dense}
      rowsPerPage={rowsPerPage}
      handleRequestSort={handleRequestSort}
      handleSelectAllClick={handleSelectAllClick}
      handleClick={handleClick}
      handleChange={handleChange}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handleChangeDense={handleChangeDense}
      isSelected={isSelected}
      listId={props.listId}
      fetchListItems={props.fetchListItems}
      filterItemsSet={props.filterItemsSet}
      rows={props.rows}
      updateListItems={props.updateListItems}
      handleDelete={handleDelete}
      total={total}
    />
  );
};

const mapStateToProps = (state) => {
  return { rows: state.listItemsReducers, items: state.itemsReducers };
};

export default connect(mapStateToProps, {
  fetchItems,
  updateListItemValue,
  updateListItem,
  fetchListItems,
  filterItemsSet,
  deleteListItems,
})(EnhancedTable);
