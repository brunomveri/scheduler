import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from 'prop-types';

const InterviewerList = (props) => {
   
  const mappedInterviewer = props.interviewers.map(interviewer => {
    return(
     <InterviewerListItem 
       key={interviewer.id}
       avatar={interviewer.avatar}
       name={interviewer.name} 
       selected={interviewer.id === props.value} 
       setInterviewer={event => props.onChange(interviewer.id)}
     />
    );
  })
  
  //Typec Cheking with Props Tyes:
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {mappedInterviewer}
      </ul>
    </section>
  );
};

export default InterviewerList;