import IconButton from "@material-ui/core/IconButton";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        {
          /* <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip> */
        }
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;

// function EnhancedTableHead(props) {
//     const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
//     const createSortHandler = (property) => (event) => {
//       onRequestSort(event, property);
//     };

//     return (
//       <TableHead>
//         <TableRow>
//           <TableCell padding="checkbox">
//             <Checkbox
//               indeterminate={numSelected > 0 && numSelected < rowCount}
//               checked={rowCount > 0 && numSelected === rowCount}
//               onChange={onSelectAllClick}
//               inputProps={{ 'aria-label': 'select all desserts' }}
//             />
//           </TableCell>
//           {headCells.map((headCell) => (
//             <TableCell
//               key={headCell.id}
//               align={headCell.numeric ? 'right' : 'left'}
//               padding={headCell.disablePadding ? 'none' : 'default'}
//               sortDirection={orderBy === headCell.id ? order : false}
//             >
//               <TableSortLabel
//                 active={orderBy === headCell.id}
//                 direction={orderBy === headCell.id ? order : 'asc'}
//                 onClick={createSortHandler(headCell.id)}
//               >
//                 {headCell.label}
//                 {orderBy === headCell.id ? (
//                   <span className={classes.visuallyHidden}>
//                     {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                   </span>
//                 ) : null}
//               </TableSortLabel>
//             </TableCell>
//           ))}
//         </TableRow>
//       </TableHead>
//     );
//   }

// // propTypes
// EnhancedTableHead.propTypes = {
//     classes: PropTypes.object.isRequired,
//     numSelected: PropTypes.number.isRequired,
//     onRequestSort: PropTypes.func.isRequired,
//     onSelectAllClick: PropTypes.func.isRequired,
//     order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//     orderBy: PropTypes.string.isRequired,
//     rowCount: PropTypes.number.isRequired,
//   };

// // actual use
// <EnhancedTableHead
//               classes={classes}
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               onSelectAllClick={handleSelectAllClick}
//               onRequestSort={handleRequestSort}
//               rowCount={rows.length}
//             />
