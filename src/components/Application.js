import React, { useState } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "./Appointment/index";

export default function Application(props) {
  
  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];

  const appointments = [
    {
      id: 1,
      time: "12pm",
    },
    {
      id: 2,
      time: "1pm",
      interview: {
        student: "Lydia Miller-Jones",
        interviewer: {
          id: 1,
          name: "Sylvia Palmer",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    },
    {
      id: 3,
      time: "3pm",
      interview: {
        student: "Bruno Verissimo",
        interviewer: {
          id: 5,
          name: "Sven Jones",
          avatar: "https://i.imgur.com/twYrpay.jpg",
        }
      }
    },
    {
      id: 4,
      time: "4pm",
      interview: {
        student: "Rhaissa",
        interviewer: {
          id: 5,
          name: "Sven Jones",
          avatar: "https://i.imgur.com/twYrpay.jpg",
        }
      }
    }
  ];
 
  const [day, setDay] = useState("Monday");
  
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
          <DayList
            days={days}
            day={day}
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
        {appointments.map((appointment)=> {
          return (
            <Appointment key={appointment.id} {...appointment} />
          );
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
