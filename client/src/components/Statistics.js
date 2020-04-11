import React from "react";
import { Statistic } from "semantic-ui-react";
import { connect } from "react-redux";
import moment from "moment";
const StatisticComp = ({ numberOfPatients }) => {
  let appt_arr = numberOfPatients.filter(
    appt =>
      moment(appt.date).format("MMM Do YY") === moment().format("MMM Do YY")
  );

  return (
    <>
      <Statistic>
        <Statistic.Value>{appt_arr.length}</Statistic.Value>
        <Statistic.Label>
          Patients Today {moment().format("MMM Do YYYY")}
        </Statistic.Label>
      </Statistic>
    </>
  );
};
const mapStateToProps = state => ({
  numberOfPatients: state.appointment.appointments
});
export default connect(mapStateToProps, {})(StatisticComp);
