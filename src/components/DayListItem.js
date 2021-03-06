import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

const DayListItem = (props) => {

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  function formatSpots(props) {
    if (props.spots === 0) {
      return "no spots remaining";
    }
    if (props.spots === 1) {
      return "1 spot remaining";
    }
    return `${props.spots} spots remaining`;
  }

  return (
    <li 
      className={dayClass} 
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2>{props.name}</h2>
      <h3>{formatSpots(props)}</h3>
    </li>
  );
  
};

export default DayListItem;