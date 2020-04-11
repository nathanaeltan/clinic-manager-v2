import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";
import ReactSelect from "react-select";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { addAppt, getAllAppts } from "../actions/appointment";
const CreateAppointment = ({
  dateSelected,
  setCreateApptOpen,
  openCreateAppt,
  patients,
  addAppt,
  getAllAppts
}) => {
  const [formData, setFormData] = useState({
    patient: "",
    date: ""
  });

  const [details, setDetails] = useState({
    diagnosis: "",
    last_name: "",
    first_name: ""
  });
  const patientChangeHandler = e => {
    setFormData({
      patient: e.value,
      date: dateSelected
    });

    patients.forEach(patient => {
      if (patient._id === e.value) {
        setDetails({
          diagnosis: patient.diagnosis,
          last_name: patient.last_name,
          first_name: patient.first_name
        });
      }
    });
  };

  const handleClose = () => {
    setCreateApptOpen(false);
    setDetails({
      diagnosis: "",
      last_name: "",
      first_name: ""
    });

    setFormData({
      patient: "",
      date: ""
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("SUBMITTING");
    await addAppt(formData);
    await getAllAppts();
    setCreateApptOpen(false);
  };

  const { last_name, diagnosis, first_name } = details;
  return (
    <div>
      <Dialog
        open={openCreateAppt}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <Container>
          <form onSubmit={e => handleSubmit(e)}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12}>
                <DialogTitle id="form-dialog-title">
                  Add an Appointment
                </DialogTitle>

                <DialogContent
                  style={{ height: last_name === "" ? "60vh" : "" }}
                >
                  <DialogContentText>Name</DialogContentText>
                  <ReactSelect
                    style={{ marginTop: "30px" }}
                    options={patients.map((item, i) => {
                      return { value: item._id, label: item.first_name };
                    })}
                    onChange={e => patientChangeHandler(e)}
                  />
                </DialogContent>
                <DialogContent>
                  <DialogContentText>
                    Time: {moment(dateSelected).format("MMMM Do YYYY, h:mm a")}
                  </DialogContentText>
                </DialogContent>
              </Grid>
              <Grid item xs={6}>
                <DialogContent
                  style={{
                    display: last_name === "" ? "none" : "block",
                    padding: 0
                  }}
                >
                  <TextField
                    disabled
                    id="filled-disabled"
                    label="Last Name"
                    value={last_name}
                    variant="filled"
                  />
                </DialogContent>
              </Grid>
              <Grid item xs={6}>
                <DialogContent
                  style={{
                    display: last_name === "" ? "none" : "block",
                    padding: 0
                  }}
                >
                  <TextField
                    disabled
                    id="filled-disabled"
                    label="Diagnosis"
                    value={diagnosis}
                    variant="filled"
                  />
                </DialogContent>
              </Grid>
              <DialogActions style={{ margin: "20px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                >
                  Add
                </Button>
              </DialogActions>
            </Grid>
          </form>
        </Container>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  patients: state.patient.patients
});
export default connect(mapStateToProps, { addAppt, getAllAppts })(
  CreateAppointment
);
