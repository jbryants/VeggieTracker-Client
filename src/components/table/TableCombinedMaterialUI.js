import Checkbox from "@material-ui/core/Checkbox";
import InputBase from "@material-ui/core/InputBase";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { usePagination, useRowSelect, useSortBy, useTable } from "react-table";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import TablePaginationActions from "./TablePaginationActions";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import { lighten, makeStyles } from "@material-ui/core/styles";
import TableSortLabel from "@material-ui/core/TableSortLabel";

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  //   return <input value={value} onChange={onChange} onBlur={onBlur} />;
  return (
    <InputBase
      defaultValue={value}
      onChange={onChange}
      onBlur={onBlur}
      inputProps={{ "aria-label": "naked" }}
    />
  );
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
};

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    // console.log("defaultRef: ", defaultRef);
    // console.log("resolvedRef: ", resolvedRef);
    // console.log("indeterminate: ", indeterminate);
    // console.log("rest: ", rest);
    // console.log("ref: ", ref);

    return (
      <>
        {/* <input type="checkbox" ref={resolvedRef} {...rest} /> */}
        <Checkbox
          indeterminate={indeterminate}
          //inputProps={{ "aria-label": "select all desserts" }}
          ref={resolvedRef}
          {...rest}
          padding="checkbox"
        />
      </>
    );
  }
);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

function Table({ columns, data, updateMyData, skipPageReset }) {
  const classes = useStyles();

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
    },
    useSortBy,
    usePagination,
    // below parts to handle selections
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  const handleChangePage = (action) => {
    switch (action) {
      case "FIRST_PAGE":
        gotoPage(0);
        break;

      case "PREVIOUS_PAGE":
        previousPage();
        break;

      case "NEXT_PAGE":
        nextPage();
        break;

      case "LAST_PAGE":
        gotoPage(Math.max(0, Math.ceil(pageCount / pageSize) - 1));
        break;

      default:
        break;
    }
  };

  // Render the UI for your table
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selectedFlatRows.length} />
        <TableContainer>
          <MaUTable
            {...getTableProps()}
            size="small"
            aria-label="a dense table"
            className={classes.table}
          >
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableCell
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      padding="none"
                      align={column.numeric ? "right" : "left"}
                      //   sortDirection={
                      //     column.isSorted
                      //       ? column.isSortedDesc
                      //         ? "desc"
                      //         : "asc"
                      //       : false
                      //   }
                    >
                      <TableSortLabel
                        active={column.isSorted}
                        direction={column.isSortedDesc ? "desc" : "asc"}
                        onClick={column.getSortByToggleProps}
                      >
                        {column.isSorted ? (
                          <span className={classes.visuallyHidden}>
                            {column.isSortedDesc
                              ? "sorted descending"
                              : "sorted ascending"}
                          </span>
                        ) : null}
                        {column.render("Header")}
                        {/* <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : null}
                      </span> */}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <TableRow
                    {...row.getRowProps()}
                    selected={selectedRowIds[row.id]}
                    hover
                  >
                    {row.cells.map((cell) => {
                      return (
                        <TableCell
                          {...cell.getCellProps()}
                          padding="none"
                          align={cell.column.numeric ? "right" : "left"}
                          style={{ width: 160 }}
                        >
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[
                    5,
                    10,
                    25,
                    { label: "All", value: data.length },
                  ]}
                  colSpan={columns.length + 1}
                  count={data.length}
                  rowsPerPage={pageSize}
                  page={pageIndex}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={(e) => {
                    setPageSize(Number(e.target.value));
                  }}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </MaUTable>
        </TableContainer>
      </Paper>
    </div>
  );
}

function TableCombined() {
  const firstNames = ["jane", "john", "alex"];
  const lastName = ["smith", "jones"];

  const columns = [
    {
      Header: "First Name",
      accessor: "firstName",
      sortType: "basic",
    },
    {
      Header: "Last Name",
      accessor: "lastName",
      sortType: "basic",
    },
    {
      Header: "Age",
      accessor: "age",
      sortType: "basic",
      numeric: true,
    },
  ];

  const [data, setData] = React.useState(
    Array(100)
      .fill()
      .map((a) => ({
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        lastName: lastName[Math.floor(Math.random() * lastName.length)],
        age: Math.ceil(75 * Math.random()),
      }))
  );
  const [originalData] = React.useState(data);
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => setData(originalData);

  return (
    <div>
      <button onClick={resetData}>Reset Data</button>
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </div>
  );
}

export default TableCombined;
