import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import InputBase from "@material-ui/core/InputBase";
import {
  descendingComparator,
  getComparator,
  stableSort,
} from "./sortingHelper";
import EnhancedTableToolbar from "./ListItemsTableToolbar";
import EnhancedTableHead from "./ListItemsTableHead";

const useStyles = makeStyles((theme) => ({
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
  table: {
    minWidth: 750,
  },
  totalCell: {
    fontWeight: "bold",
    //fontSize: "medium",
  },
}));

const ListItemsTableContent = (props) => {
  const classes = useStyles();

  const {
    order,
    orderBy,
    selected,
    page,
    dense,
    handleClick,
    handleChange,
    handleSelectAllClick,
    handleRequestSort,
    isSelected,
    rowsPerPage,
    total,
  } = props;

  return (
    <TableContainer>
      <Table
        className={classes.table}
        aria-labelledby="tableTitle"
        size={dense ? "small" : "medium"}
        aria-label="enhanced table"
      >
        <EnhancedTableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={props.rows.length}
        />
        <TableBody>
          {stableSort(props.rows, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              const isItemSelected = isSelected(row);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  //key={row.name}
                  key={row.id}
                  //key={row}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      inputProps={{ "aria-labelledby": labelId }}
                      onClick={(event) => handleClick(event, row)}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {/* <InputBase
                      //defaultValue={row.name}
                      //onChange={(e) => handleChange(e, row.id, "name")}
                      inputProps={{ "aria-label": "naked" }}
                    /> */}
                    {row.name}
                  </TableCell>
                  {/* // event.value can be sent in the form of { name: event.value }
                      // with id for update onBlur event.
                      // same funda is applicable for remaining, remove option for editing name later. */}
                  <TableCell align="right">
                    <InputBase
                      //defaultValue={row.base_quantity}
                      value={row.total_quantity}
                      name="base_quantity"
                      onChange={(e) => handleChange(e, row.id)}
                      inputProps={{
                        "aria-label": "naked",
                        style: { textAlign: "right" },
                      }}
                      type="number"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <InputBase
                      //defaultValue={row.base_price}
                      value={row.base_price ? parseFloat(row.base_price) : ""}
                      name="base_price"
                      onChange={(e) => handleChange(e, row.id)}
                      inputProps={{
                        min: "0",
                        max: "99999",
                        step: "0.25",
                        precision: "2",
                        "aria-label": "naked",
                        style: { textAlign: "right" },
                      }}
                      type="number"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <InputBase
                      //defaultValue={row.total_quantity}
                      value={row.total_quantity}
                      name="total_quantity"
                      onChange={(e) => handleChange(e, row.id)}
                      inputProps={{
                        "aria-label": "naked",
                        style: { textAlign: "right" },
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <InputBase
                      //defaultValue={row.total_price}
                      value={row.total_price}
                      name="total_price"
                      onChange={(e) => handleChange(e, row.id)}
                      inputProps={{
                        "aria-label": "naked",
                        style: { textAlign: "right" },
                      }}
                    />
                  </TableCell>
                  {/* <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                          <TableCell align="right">{row.protein}</TableCell> */}
                </TableRow>
              );
            })}

          <TableRow>
            {
              // Store the total in an array and use map() here to dynamically generate TableCells"
            }
            <TableCell className={classes.totalCell} colSpan={2}>
              Total
            </TableCell>
            <TableCell className={classes.totalCell} align="right">
              {total.base_quantity}
            </TableCell>
            <TableCell className={classes.totalCell} align="right">
              {total.base_price}
            </TableCell>
            <TableCell className={classes.totalCell} align="right">
              {total.total_quantity}
            </TableCell>
            <TableCell className={classes.totalCell} align="right">
              {total.total_price}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListItemsTableContent;
