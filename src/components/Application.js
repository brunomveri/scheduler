import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "./Appointment/index";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors"

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  // const dailyAppointments = getAppointmentsForDay(state, state.day);
  // console.log(dailyAppointments);

  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    const promise1 = axios.get("api/days");   
    const promise2 = axios.get("api/appointments");
    const promise3 = axios.get("api/interviewers");

    Promise.all([promise1, promise2, promise3])
      .then(all => {
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;
        setState(prev => ({...prev, days, appointments, interviewers}))
      })
      .catch(err => console.log(err));
  }, []);

  const bookInterview = (id, interview) => {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const url = `/api/appointments/${id}`;

    return axios.put(url, appointment)
      .then(() => {
        setState({ ...state, appointments });
      });

  };
  
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
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
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
        {/* {dailyAppointments.map((appointment)=> {
          const interview = getInterview(state, appointment.interview);
          // console.log(interview);
          return (
            // <Appointment key={appointment.id} {...appointment} />
            <Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interviewers={appointment.interviewers}
            interview={interview}
          />
          );
        })} */}
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
