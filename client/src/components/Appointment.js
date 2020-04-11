import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import { connect } from "react-redux";
import swal from "sweetalert";

import { deleteAppt } from "../actions/appointment";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Appointment = ({ apptData, open, setOpen, deleteAppt }) => {
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    swal({
      title: "Are you sure?",
      text: "The Appointment will be deleted permanently",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        deleteAppt(apptData._id).then(res => {
          swal("Successfully Deleted", {
            icon: "success"
          });
        });
        console.log("Deleted");
        setOpen(false);
      } else {
        setOpen(false);
      }
    });
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth
        style={{ padding: 0 }}
      >
        <Grid container>
          <Grid item xs={12}>
            <DialogTitle id="alert-dialog-slide-title">
              Appointment Details
            </DialogTitle>
          </Grid>
          <Grid item xs={6}>
            <DialogContent>
              <DialogContentText>
                First Name: {apptData.first_name}
              </DialogContentText>
            </DialogContent>
          </Grid>
          <Grid item xs={6}>
            <DialogContent>
              <DialogContentText>
                last Name: {apptData.last_name}
              </DialogContentText>
            </DialogContent>
          </Grid>
          <Grid item xs={6}>
            <DialogContent>
              <DialogContentText>
                Diagnosis: {apptData.diagnosis}
              </DialogContentText>
            </DialogContent>
          </Grid>
          <Grid item xs={6}>
            <DialogContent>
              <DialogContentText>
                Appointment Time:{" "}
                {moment(apptData.date).format("MMMM Do YYYY, h:mm a")}
              </DialogContentText>
            </DialogContent>
          </Grid>
        </Grid>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default connect(null, { deleteAppt })(Appointment);
