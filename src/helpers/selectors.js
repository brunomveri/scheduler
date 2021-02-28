export function getAppointmentsForDay(state, day) {
  const found = state.days.find(d => day === d.name);
  if (state.days.length === 0 || found === undefined) return [];
  return found.appointments.map(id => state.appointments[id]);
}

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