import React from "react";
import DayListItem from "components/DayListItem";


const DayList = (props) => {
  const mappedDays = props.days.map(day => {
      return (
        <DayListItem 
          key={day.id}
          id={day.id}
          name={day.name} 
          spots={day.spots} 
          selected={day.name === props.day}
          setDay={props.setDay}
        />
      );
  });
  
  return (
    <ul> 
      {mappedDays}
    </ul>
  );
};

export default DayList;