import React from "react";
import "./CarItem.css";

// This function renders a car item.
export function CarItem(props) {
  return (
    <div className="car-item">
      <h3>{props.carItem.make}</h3>
      <h4>{props.carItem.model}</h4>
      <em>{props.carItem.seats}-seater</em>
    </div>
  );
}
