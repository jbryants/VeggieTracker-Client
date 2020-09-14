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
  getComparator,
  stableSort,
} from "../../../containers/listItems/Table/sortingHelper";
import EnhancedTableHead from "./ListItemsTableHead";
import Select from "@material-ui/core/Select";

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
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
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

              {
                /* if ([146, 149].includes(row.id)) {
                return null;
              } */
              }

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
                    {row.name}
                  </TableCell>
                  <TableCell align="right">
                    <Select
                      native
                      value={
                        row.base_quantity === 1.0 ? "1.0" : row.base_quantity
                      }
                      onChange={(e) => handleChange(e, row.id)}
                      inputProps={{
                        name: "base_quantity",
                        style: { textAlign: "right" },
                      }}
                      className={classes.underline}
                      type="number"
                    >
                      <option value={"0.25"}>Quarter</option>
                      <option value={"1.0"}>Whole</option>
                    </Select>
                  </TableCell>
                  <TableCell align="right">
                    <InputBase
                      value={row.base_price ? parseFloat(row.base_price) : ""}
                      name="base_price"
                      onChange={(e) => handleChange(e, row.id)}
                      inputProps={{
                        min: "0",
                        max: "99999",
                        step: "1.00",
                        precision: "2",
                        "aria-label": "naked",
                        style: { textAlign: "right" },
                      }}
                      type="number"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <InputBase
                      value={row.total_quantity}
                      name="total_quantity"
                      onChange={(e) => handleChange(e, row.id)}
                      inputProps={{
                        min: "0",
                        max: "999",
                        step: "0.250",
                        precision: "3",
                        "aria-label": "naked",
                        style: { textAlign: "right" },
                      }}
                      type="number"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <InputBase
                      value={row.total_price}
                      name="total_price"
                      onChange={(e) => handleChange(e, row.id)}
                      inputProps={{
                        min: "0",
                        max: "99899001",
                        step: "1.00",
                        precision: "2",
                        "aria-label": "naked",
                        style: { textAlign: "right" },
                      }}
                      type="number"
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
