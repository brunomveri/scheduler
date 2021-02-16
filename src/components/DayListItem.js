import React from "react";

import "components/DayListItem.scss";

import classNames from "classnames";

export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !(props.spots)
  });
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2>
      <h3>{props.spots}</h3>
    </li>
  );
}