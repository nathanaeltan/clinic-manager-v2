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

import { connect } from "react-redux";
import { Link as ReactLink, Redirect } from "react-router-dom";
import { getAllAppts } from "../actions/appointment";

import Appointment from "./Appointment";

const Calendar = ({ isAuthenticated, getAllAppts, appointments }) => {
  useEffect(() => {
    getAllAppts();
  }, []);

  const [open, setOpen] = React.useState(false);

  const [apptData, setApptData] = useState({});

  const handleDateClick = e => {
    console.log("CLICKED");
  };

  const eventClick = (calEvent, jsEvent, view, resourceObj) => {
    const data = appointments.filter(
      i => i._id === calEvent.event.extendedProps.appt_id
    );
    console.log(data);
    setApptData(data[0]);
    setOpen(true);
  };
  console.log(apptData);

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

  return (
    <Container style={{ marginTop: "40px" }}>
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
          dateClick={e => handleDateClick(e)}
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
        />
      </CssBaseline>
      <Appointment apptData={apptData} open={open} setOpen={setOpen} />
    </Container>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  appointments: state.appointment.appointments
});

export default connect(mapStateToProps, { getAllAppts })(Calendar);
