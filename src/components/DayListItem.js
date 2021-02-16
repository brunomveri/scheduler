import React from "react";

import "components/DayListItem.scss";

import classNames from "classnames";

const DayListItem = (props) => {

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !(props.spots)
  });

  function formatSpots(props) { //review this function with a mentor
    if (props.spots === 0) {
      return "no spots remaining";
    }
    if (props.spots === 1) {
      return "1 spot remaining";
    }
    return `${props.spots} spots remaining`;
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2>
      <h3>{formatSpots(props)}</h3>
    </li>
  );
}

export default DayListItem;