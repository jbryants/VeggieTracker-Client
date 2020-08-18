// import FormControlLabel from "@material-ui/core/FormControlLabel";
import Chip from "@material-ui/core/Chip";
// import Switch from "@material-ui/core/Switch";
import Grow from "@material-ui/core/Grow";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function ListItemChipList() {
  const classes = useStyles();
  const checked = true;

  return (
    <div>
      <div className={classes.root}>
        <Grow in={checked}>
          <Chip label="1.5kg Tomato ₹100" />
        </Grow>
        {/* Conditionally applies the timeout prop to change the entry speed. */}
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 1000 } : {})}
        >
          <Chip label="1.5kg Tomato ₹100" />
        </Grow>
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 1400 } : {})}
        >
          <Chip label="1.5kg Tomato ₹100" />
        </Grow>
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 1800 } : {})}
        >
          <Chip label="1.5kg Tomato ₹100" />
        </Grow>
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 2200 } : {})}
        >
          <Chip label="1.5kg Tomato ₹100" />
        </Grow>
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 2600 } : {})}
        >
          <Chip label="1.5kg Tomato ₹100" />
        </Grow>
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 3000 } : {})}
        >
          <Chip label="1.5kg Tomato ₹100" />
        </Grow>
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 3400 } : {})}
        >
          <Chip label="1.5kg Tomato ₹100" />
        </Grow>
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 3800 } : {})}
        >
          <Chip label="1.5kg Tomato ₹100" />
        </Grow>
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 4200 } : {})}
        >
          <Chip label="1.5kg Tomato ₹100" />
        </Grow>
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 4600 } : {})}
        >
          <Chip label="1.5kg Tomato ₹100" />
        </Grow>
      </div>
    </div>
  );
}
