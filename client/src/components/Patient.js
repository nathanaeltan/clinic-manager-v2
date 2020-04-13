import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Divider, Search, Label, Form, Button, Icon } from "semantic-ui-react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { getPatients } from "../actions/patient";
const Patient = ({ patients, getPatients }) => {
  useEffect(() => {
    getPatients();
  }, [getPatients]);
  const [results, setResults] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [patientDetail, setPatientDetail] = useState(null);
  const handleSearchChange = e => {
    setLoading(true);
    const resultArr = patients.filter(
      patient =>
        patient.first_name
          .toUpperCase()
          .includes(e.target.value.toUpperCase()) ||
        patient.last_name.toUpperCase().includes(e.target.value.toUpperCase())
    );

    resultArr.forEach(item => {
      item.key = item._id;
      item.title = item.first_name;
    });

    setResults(resultArr);
    setLoading(false);
  };
  const resultRenderer = ({ first_name, _id, last_name }) => {
    return <Label content={`${first_name} ${last_name}`} />;
  };

  const handleResultSelect = (e, result) => {
    const patientDetails = result.results[0];
    console.log(patientDetails);
    setPatientDetail(patientDetails);
  };
  //  const { first_name, last_name, diagnosis } = patientDetail
  return (
    <div>
      <Grid container justify="center" style={{ marginTop: "50px" }}>
        <Grid item xs={8}>
          <Grid container alignItems="center" justify="space-between">
            <Typography
              variant="h2"
              gutterBottom
              style={{ paddingLeft: "30px" }}
            >
              Patients List
            </Typography>

            <Button positive size="huge">
              <Icon name="add user" />
              Add Patient
            </Button>
          </Grid>

          <Divider />
          <Search
            loading={isLoading}
            size="massive"
            onResultSelect={(e, result) => handleResultSelect(e, result)}
            input={{ fluid: true }}
            placeholder="Start typing to search for patients ..."
            style={{ marginTop: "50px" }}
            onSearchChange={e => handleSearchChange(e)}
            results={results}
            resultRenderer={e => resultRenderer(e)}
            fluid
          />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
      {patientDetail ? (
        <Form style={{ marginTop: 50 }}>
          <Form.Group>
            <Form.Input
              label="First Name"
              value={patientDetail.first_name}
              width={6}
              readOnly
              size="big"
            />
            <Form.Input
              label="Last Name"
              value={patientDetail.last_name}
              width={6}
              readOnly
              size="big"
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="Diagnosis"
              value={patientDetail.diagnosis}
              width={12}
              readOnly
              size="big"
            />
          </Form.Group>
        </Form>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => ({
  patients: state.patient.patients
});

export default connect(mapStateToProps, { getPatients })(Patient);
