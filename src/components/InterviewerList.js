import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "components/InterviewerListItem";


const InterviewerList = (props) => {
   
  const mappedInterviewer = props.interviewers.map(interviewer => {
    return(
     <InterviewerListItem 
       key={interviewer.id}
      //  id={interviewer.id} //do I need this?
       avatar={interviewer.avatar}
       name={interviewer.name} 
       selected={interviewer.id === props.interviewer}
       setInterviewer={() => props.setInterviewer(interviewer.id)}
     />
    );
  })
    
  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {mappedInterviewer}
      </ul>
    </section>
  );
};

export default InterviewerList;