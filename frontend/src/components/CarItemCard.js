import React from "react";
import "./CarItemCard.css";
import { CarItem } from "./CarItem.js";
import { ItemActions } from "./ItemActions.js";
import { useParams } from "react-router-dom";

// This component renders a car item card.
export function CarItemCard(props) {
  // Gets id parameter from the current URL.
  const { id } = useParams();
  let carItem = {};

  // Finds the index position of the car object matching the parameter id.
  props.carList.forEach((item, index) => {
    if (item.id === Number(id)) {
      carItem = item;
    }
  });

  // Returns message if no matching ID could be found in car object array.
  if (carItem === {})
    return (
      <p>
        <em>A matching car could not be found for the requested ID.</em>
      </p>
    );
  // Returns a card with car info and edit options for car with matching id.
  else
    return (
      <span className="item-card">
        <CarItem carItem={carItem} />
        <ItemActions />
      </span>
    );
}
