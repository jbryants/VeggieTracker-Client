import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { deleteList } from "../../actions";
import history from "../../services/history";

const ListDelete = (props) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const callback = () => {
      if (document.location.pathname === "/home/lists") {
        setOpen(false);
      }
    };
    window.addEventListener("popstate", callback);

    return () => {
      window.removeEventListener("popstate", callback);
    };
  }, []);

  useEffect(() => {
    if (window.location.pathname === `/home/lists/delete/${props.listId}`) {
      setOpen(true);
    }
  }, [props.listId]);

  const handleClickOpen = () => {
    setOpen(true);
    history.push(`/home/lists/delete/${props.listId}`);
  };

  const handleClose = () => {
    setOpen(false);
    history.push("/home/lists");
  };

  const handleDelete = () => {
    handleClose();
    props.deleteList(props.listId);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete List"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are you sure you want to delete this list with name:
            ${props.listName}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default connect(null, { deleteList })(ListDelete);
