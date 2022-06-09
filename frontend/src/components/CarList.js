import React from "react";
import { Link } from "react-router-dom";
import "./CarList.css";

// This component renders a list of all the car items.
export function CarList(props) {
  // Returns message if the fetch promise rejected with an error.
  if (props.error) {
    return <p>Error: {props.error.message}</p>;
    // Returns message if the fetch promise has not yet resolved.
  } else if (!props.carList) {
    return <p>Loading...</p>;
    // Returns list of cars if fetch promise has resolved successfully.
  } else {
    // Creates a list of elements from the car list array.
    const displayList = props.carList.map((carItem, index) => (
      // Car make is combined with index position to create unique key.
      <li key={carItem.make + index.toString()}>
        <Link to={{ pathname: `/car/${carItem.id}` }}>
          <strong>
            {carItem.make}, {carItem.model}, Seats: {carItem.seats}
          </strong>
        </Link>
      </li>
    ));
    // Returns a list of cars.
    return <ul className="car-list">{displayList}</ul>;
  }
}
