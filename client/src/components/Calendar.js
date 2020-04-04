import React from "react";
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
const Calendar = () => {
  const handleDateClick = e => {
    console.log("CLICKED");
  };

  const calendarComponentRef = React.createRef();

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
        />
      </CssBaseline>
    </Container>
  );
};

export default Calendar;
