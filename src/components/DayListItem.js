import React from "react";

import "components/DayListItem.scss";

import classNames from "classnames";

export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !(props.spots)
  });

  function formatSpots(props) {
    if (props.spots === 0) {
      return "no spots remaining";
    }
    if (props.spots === 1) {
      return "1 spot remaining";
    }
    if (props.spots === 2) {
      return "2 spots remaining";
    }
    return props.spots;
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2>
      <h3>{formatSpots(props)}</h3>
    </li>
  );
}