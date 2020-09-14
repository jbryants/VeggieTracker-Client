import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import EnhancedTableToolbar from "./ListItemsTableToolbar";
import ListItemsTableContent from "./ListItemsTableContent";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
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

const ListItemsTable = (props) => {
  const classes = useStyles();
  const {
    order,
    orderBy,
    selected,
    page,
    dense,
    rowsPerPage,
    handleRequestSort,
    handleSelectAllClick,
    handleClick,
    handleChange,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangeDense,
    isSelected,
    handleDelete,
    total,
    searchTerm,
    setSearchTerm,
  } = props;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDelete={handleDelete}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <ListItemsTableContent
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
          total={total}
        />
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Grid container direction="row" justify="flex-end">
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Grid>
    </div>
  );
};

export default ListItemsTable;
