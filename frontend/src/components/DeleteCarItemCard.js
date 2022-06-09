import React from "react";
import { CarItem } from "./CarItem.js";
import { DeleteConfirmation } from "./DeleteConfirmation.js";
import { useParams } from "react-router-dom";

// This component renders a deletable car item card.
export function DeleteCarItemCard(props) {
  // Gets id parameter from the current URL.
  const { id } = useParams();
  let carIndex = -1;

  // Finds the index position of the car object matching the parameter id.
  props.carList.forEach((item, index) => {
    if (item.id === Number(id)) {
      carIndex = index;
    }
  });

  // Returns message if no matching ID could be found in car object array.
  if (carIndex < 0)
    return (
      <p>
        <em>A matching car could not be found for the requested ID.</em>
      </p>
    );
  // Returns a card with car info and edit options for car with matching id.
  else
    return (
      <span className="item-card">
        <CarItem carItem={props.carList[carIndex]} />
        <DeleteConfirmation
          handleClick={props.handleClick}
          carItem={props.carList[carIndex]}
        />
      </span>
    );
}
