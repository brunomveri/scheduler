import React from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "./Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors"
import useApplicationData from "../hooks/useApplicationData";

export default function Application(props) {

  const {
    state,
    cancelInterview,
    bookInterview,
    setDay,
  } = useApplicationData();

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  
  const schedule = appointments.map(appointment => {
    //Get the interview record for this appointment
    const interview = getInterview(state, appointment.interview);
    //Show Appointment
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        // {...appointment}
        time={appointment.time}
        interview={interview} 
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          {/* This is our DayList on the side */}
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
