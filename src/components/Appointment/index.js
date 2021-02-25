import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import Empty from "./Empty";
import Status from "components/Appointment/Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../../../src/hooks/useVisualMode";

const CREATE = "CREATE";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

function Appointment (props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    
    if (!interviewer) {
      alert("Please select the interviewer");
    } else {

      const interview = {
        student: name,
        interviewer,
      };
    
      transition(SAVING)
      props
        .bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch(() => transition(ERROR_SAVE, true));
    }

  };
  
  function deleteAppointment() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
        {mode === SAVING && <Status message="Saving"/>}
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === DELETING && <Status message="Deleting" />}
        {mode === SHOW && (
          <Show 
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
            // interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={()=> transition(EDIT)}
          />
        )}
        {mode === CONFIRM && 
          <Confirm
            message="Are you sure you would like to delete?" 
            onCancel={back} 
            onConfirm={deleteAppointment} 
          />}
        {mode === CREATE &&
          <Form 
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
            onDelete={deleteAppointment}
          />}
        {mode === EDIT && // EDIT form 
          <Form 
            interviewers={props.interviewers} 
            onDelete={deleteAppointment} 
            name={props.interview.student} // student name placeholder
            interviewer={props.interview.interviewer.id} // interviewer placeholder
            onSave={save} 
            onCancel={() => back(SHOW)}
          />}
        {mode === ERROR_SAVE && <Error message="ERROR SAVING" onCancel={back} />}
        {mode === ERROR_DELETE && <Error message="ERROR DELETING" onCancel={back} />}
    </article>
  );
}

export default Appointment;
