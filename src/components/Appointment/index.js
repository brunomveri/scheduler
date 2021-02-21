import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import Empty from "./Empty";
import Status from "components/Appointment/Status";
import useVisualMode from "../../../src/hooks/useVisualMode";

const CREATE = "CREATE";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const SAVING = "SAVING";

function Appointment (props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

    const save = (name, interviewer) => {
      const interview = {
        student: name,
        interviewer,
      };

      transition(SAVING)
      props.bookInterview(props.id, interview)
        .then(() => {
          transition(SHOW);
        });

    };

  return (
    <article className="appointment">
      <Header time={props.time} />
        {mode === SAVING && <Status message="Saving..."/>}
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
      {mode === CREATE &&
        <Form 
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
        />}
    </article>
  );
}

export default Appointment;
