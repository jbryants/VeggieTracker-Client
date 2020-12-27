import React, { useEffect } from "react";
import ListItemsTable from "../../../components/listItems/Table/ListItemsTable";
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
import { getComparator, stableSort } from "./sortingHelper";

const EnhancedTable = (props) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [searchTerm, setSearchTerm] = React.useState("");

  const [filteredRows, setFilteredRows] = React.useState([]);
  let rowsView = props.rows.filter((row) => {
    if (!filteredRows.includes(row.id)) {
      return row;
    }
  });

  const updateFilteredRows = (items) => {
    if (searchTerm === "") {
      setFilteredRows([]);
      return;
    }

    const filteredRowsSet = new Set();

    items.forEach((item) => {
      if (item.name.includes(searchTerm)) {
        return;
      }
      filteredRowsSet.add(item.id);
    });

    setFilteredRows(Array.from(filteredRowsSet));
  };

  useEffect(() => {
    // Debouncing till there is a pause.
    const timerId = setTimeout(() => {
      updateFilteredRows(props.rows);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    rowsView = props.rows.filter((row) => {
      if (!filteredRows.includes(row.id)) {
        return row;
      }
    });
    updateTotal(rowsView);
  }, [filteredRows]);

  const debouncedFn = React.useCallback(
    _.debounce((id, name, val) => props.updateListItem(id, name, val), 900),
    []
  );
  const [total, setTotal] = React.useState({
    baseQuantity: 0.0,
    totalQuantity: 0.0,
    basePrice: 0.0,
    totalPrice: 0.0,
  });

  useEffect(() => {
    props.fetchListItems(props.listId);
  }, []);

  useEffect(() => {
    // On rows data change
    // Debouncing till there is a pause.
    const timerId = setTimeout(() => {
      updateTotal(rowsView);
    }, 700);

    return () => {
      clearTimeout(timerId);
    };
  }, [props.rows]);

  useEffect(() => {
    props.fetchItems();
    //if (props.rows.length > 0) {
    //console.log("Calculate total when rows count change.");
    updateTotal(rowsView);
    //    setRowsView(
    // rowsView = props.rows.filter((row) => {
    //   if (!filteredRows.includes(row.id)) {
    //     return row;
    //   }
    // });
    //    );
  }, [props.rows.length]);

  useEffect(() => {
    if (selected.length === 0 && props.rows.length > 0) {
      //console.log("Total calculation when nothing is selected.");
      updateTotal(rowsView);
    } else if (selected.length > 0) {
      //console.log("recalculate total based on items selected.");
      updateTotal(selected);
    }
  }, [selected]);

  useEffect(() => {
    if (selected.length === 0) {
      updateTotal(stableSort(props.rows, getComparator(order, orderBy)));
    }
  }, [page, rowsPerPage, order, orderBy]);

  const updateTotal = (items) => {
    console.log("Calculating total on the basis of: ", items);
    if (selected.length === 0) {
      // total on the basis of rows in current page
      const start = page * rowsPerPage;
      const end = start + rowsPerPage;
      items = items.slice(start, end);
    }

    let baseQuantity = 0.0;
    let totalQuantity = 0.0;
    let basePrice = 0.0;
    let totalPrice = 0.0;

    for (const item of items) {
      baseQuantity += parseFloat(item.baseQuantity);
      totalQuantity += parseFloat(item.totalQuantity);
      basePrice += parseFloat(item.basePrice);
      totalPrice += parseFloat(item.totalPrice);
    }

    setTotal({
      baseQuantity,
      totalQuantity,
      basePrice,
      totalPrice,
    });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rowsView;
      //.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    const selectedIndex = selected.indexOf(row);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
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

  // change name from handleChange to handleCellValueChange
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
      rows={rowsView}
      updateListItems={props.updateListItems}
      handleDelete={handleDelete}
      total={total}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
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
