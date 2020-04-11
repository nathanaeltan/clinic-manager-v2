import React, { Component } from "react";
import { connect } from "react-redux";
import { Divider, Search } from "semantic-ui-react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Patient = () => {
  return (
    <div>
      <Grid container justify="center" style={{ marginTop: "130px" }}>
        <Grid item xs={8}>
          <Typography variant="h2" gutterBottom style={{ paddingLeft: "30px" }}>
            Patients List
          </Typography>
          <Divider />
          <Search
            size="massive"
            input={{ fluid: true }}
            placeholder="Start typing to search for patients ..."
            style={{marginTop: "50px"}}
          />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
