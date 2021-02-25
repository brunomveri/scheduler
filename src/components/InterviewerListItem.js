import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

const InterviewerListItem = (props) => {

  const interviewerClass = classNames("day-interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <li
      className=/*"interviewers__item"*/{interviewerClass}
      onClick={() => props.setInterviewer(props.name)}
    >  
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {/* {props.selected && props.name} */}
      {props.selected ? props.name : ''}
    </li>
  );
};

export default InterviewerListItem;

// import React from "react";
// import classnames from "classnames";
// import "components/InterviewerListItem.scss";
// export default function InterviewerListItem(props) {
//   const interviewer = classnames("day-interviewers__item", {
//     "interviewers__item--selected": props.selected
//   })
//   return (
//     <li className={interviewer} onClick={() => props.setInterviewer(props.name)}>
//     <img
//       className="interviewers__item-image"
//       src={props.avatar}
//       alt={props.name}
//     />
//     {props.selected ? props.name : ''}
//   </li>
//   );
// }