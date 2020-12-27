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
          {...(checked ? { timeout: 1050 } : {})}
        >
          <Chip label="1.5kg Tomato ₹100" />
        </Grow>
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 1100 } : {})}
        >
          <Chip label="1.5kg Tomato ₹100" />
        </Grow>
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 1250 } : {})}
        >
          <Chip label="1.5kg Tomato ₹100" />
        </Grow>
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 1300 } : {})}
        >
          <Chip label="1.5kg Tomato ₹100" />
        </Grow>
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 1350 } : {})}
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
          {...(checked ? { timeout: 1450 } : {})}
        >
          <Chip label="1.5kg Tomato ₹100" />
        </Grow>
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 1500 } : {})}
        >
          <Chip label="1.5kg Tomato ₹100" />
        </Grow>
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 1550 } : {})}
        >
          <Chip label="1.5kg Tomato ₹100" />
        </Grow>
      </div>
    </div>
  );
}
