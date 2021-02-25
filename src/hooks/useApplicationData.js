import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const updateSpots = (appointments) => {
    //find day object
    const dayObj = state.days.find((item) => item.name === state.day);

    //get appointment array
    const appointmentIds = dayObj.appointments;

    let spots = 0;
    for (const id of appointmentIds) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }

    dayObj.spots = spots;

    const newDays = [...state.days];
    return newDays;
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(appointments);

    const url = `/api/appointments/${id}`;

    return axios.put(url, appointment).then(() => {
      setState({ ...state, appointments, days });
    });
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const url = `/api/appointments/${id}`;

    return axios.delete(url)
      .then(() => {
        const days = updateSpots(appointments);
        setState((prev) => ({ ...prev, appointments, days }));
      })
      
  }

  useEffect(() => {
    const promise1 = axios.get("/api/days");
    const promise2 = axios.get("/api/appointments");
    const promise3 = axios.get("/api/interviewers");

    Promise.all([promise1, promise2, promise3])
      .then(all => {
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;
        setState((prev) => ({ ...prev, days, appointments, interviewers }));
      })
      .catch((err) => console.log(err));
  }, []);

  return {
    state,
    cancelInterview,
    bookInterview,
    setDay,
    updateSpots,
  };
}
