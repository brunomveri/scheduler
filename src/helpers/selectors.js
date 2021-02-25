
// export function getAppointmentsForDay(state, dayName) {
//   let appointmentsForDay = [];
//   if (!state.days.length) {
//     return appointmentsForDay;
//   }
//   const day = state.days.find(dayObj => dayObj.name === dayName);
//   if (day) {
//     const { appointments: appointmentIds } = day;
//     appointmentsForDay = appointmentIds.map((appointmentId) => {
//       return state.appointments[appointmentId];
//     });
//   } 
//   return appointmentsForDay;
// }

// Second option:
export function getAppointmentsForDay(state, day) {
  const found = state.days.find(d => day === d.name);
  if (state.days.length === 0 || found === undefined) return [];
  return found.appointments.map(id => state.appointments[id]);
}

//My function
// export function getInterview(state, interview) {
//   if (interview !== null) {
//     return {
//       student: interview.student,
//       interviewer: state.interviewers[interview.interviewer]
//     }
//   } else {
//     return null;
//   }
// }

//Gary's function
export const getInterview = function(state, interview) {
  if (!interview) return null;

  //interviewer ID
  const id = interview.interviewer;
  const interviewer = state.interviewers[id];
  const result = { ...interview, interviewer: interviewer};
  return result || null;
};



export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.find(d => d.name === day);
  if(selectedDay === undefined || state.days.length === 0) return [];
  const mappedInterviewers = selectedDay.interviewers.map(int => state.interviewers[int]);
  return mappedInterviewers;
}