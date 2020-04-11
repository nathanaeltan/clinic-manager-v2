import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import { Link as ReactLink, Redirect } from "react-router-dom";
import { getAllAppts, updateAppt } from "../actions/appointment";

import Appointment from "./Appointment";
import CreateAppointment from "./CreateAppointment";
import { getPatients } from "../actions/patient";

const Calendar = ({
  isAuthenticated,
  getAllAppts,
  appointments,
  getPatients,
  loading,
  updateAppt
}) => {
  useEffect(() => {
    loading = false;
    setTimeout(() => {
      getAllAppts();
      getPatients();
    }, 5000);
  }, []);

  const [open, setOpen] = React.useState(false);
  const [openCreateAppt, setCreateApptOpen] = React.useState(false);

  const [apptData, setApptData] = useState({});
  const [dateSelected, setDate] = useState("");

  const selectApptDate = (start, end) => {
    // console.log(start);
    setDate(start.startStr);
    setCreateApptOpen(true);
  };

  const eventClick = (calEvent, jsEvent, view, resourceObj) => {
    const data = appointments.filter(
      i => i._id === calEvent.event.extendedProps.appt_id
    );
    console.log(data);
    setApptData(data[0]);
    setOpen(true);
  };

  const calendarComponentRef = React.createRef();
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  let eventInfo = appointments.map(item => {
    return {
      title: item.first_name,
      start: item.date,
      extendedProps: {
        appt_id: item._id,
        diagnosis: item.diagnosis
      }
    };
  });

  const updateDate = (event, delta, revertFunc, jsEvent, ui, view) => {
    console.log("UPDAING");
    console.log(event.event);
    updateAppt(event.event.extendedProps.appt_id, event.event.start);
    console.log("UPDATED");
  };

  return (
    <Container style={{ marginTop: "40px" }}>
      {loading ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <CssBaseline>
          <FullCalendar
            header={{
              left: "prev,next, today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,list"
            }}
            eventTimeFormat={{
              hour: "numeric",
              minute: "2-digit",
              meridiem: true
            }}
            aspectRatio="1.4"
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            selectable="true"
            selectHelper="true"
            editable="true"
            eventLimit="true"
            themeSystem="standard"
            ref={calendarComponentRef}
            events={eventInfo}
            eventClick={(calEvent, jsEvent, view, resourceObj) =>
              eventClick(calEvent, jsEvent, view, resourceObj)
            }
            select={(start, end) => selectApptDate(start, end)}
            droppable="true"
            eventDrop={(event, delta, revertFunc, jsEvent, ui, view) =>
              updateDate(event, delta, revertFunc, jsEvent, ui, view)
            }
          />
        </CssBaseline>
      )}

      <Appointment apptData={apptData} open={open} setOpen={setOpen} />
      <CreateAppointment
        dateSelected={dateSelected}
        setCreateApptOpen={setCreateApptOpen}
        openCreateAppt={openCreateAppt}
      />
    </Container>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  appointments: state.appointment.appointments,
  loading: state.appointment.loading
});

export default connect(mapStateToProps, {
  getAllAppts,
  getPatients,
  updateAppt
})(Calendar);
