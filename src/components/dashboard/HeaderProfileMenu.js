import React from "react";
import { connect } from "react-redux";
import { signout } from "../../actions";

import { Menu, MenuItem } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Link from "@material-ui/core/Link";

const ProfileMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    props.signout(() => {
      props.history.push("/signin");
    });
  };

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        edge="end"
      >
        <AccountCircle style={{ fontSize: 30 }} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={menuOpen}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem>
          <Link color="textPrimary" onClick={handleSignOut} underline="none">
            Sign Out
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default connect(null, { signout })(ProfileMenu);
