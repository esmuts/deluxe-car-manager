import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CarForm.css";

// This comoponent renders a form for adding or updating a car.
export function CarForm(props) {
  // Gets ID from current URL.
  const { id } = useParams();

  // Sets a state object for rendering car form values and passing a new car
  // object to the parent component on submission.
  const [car, setCar] = useState({
    id: "",
    make: "",
    model: "",
    seats: "",
  });

  // Hook sets state to car item props if it is an update request (i.e. if the
  //  URL has an id field.)
  useEffect(() => {
    if (id) {
      // Sets current car value to car object in list with matching id.
      props.carList.forEach((carItem, index) => {
        if (carItem.id === Number(id)) {
          setCar(props.carList[index]);
        }
      });
    }
  }, [id]);

  // Function handles form submission by passing new car object to parent
  // component.
  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSubmit(car);
  };

  // Sets temp variable for handling new form values and passing them to state
  // object modifier ('setCar').
  let updatedValue = {};

  // Function handles form changes by updating state object values.
  const handleChange = (event) => {
    // Catches current form value update by reference to form name and value.
    updatedValue = { [event.target.name]: event.target.value };
    // Updates state based on current form input value.
    setCar((car) => ({
      ...car,
      ...updatedValue,
    }));
  };

  // Returns a form used to capture car details. Values are determined by the
  // car object stored in state.
  return (
    <form className="car-form" onSubmit={handleSubmit}>
      <br />
      <label>
        Make:
        <br />
        <input
          type="text"
          name="make"
          value={car.make}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Model:
        <br />
        <input
          type="text"
          name="model"
          value={car.model}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Number of seats:
        <br />
        <input
          type="text"
          name="seats"
          value={car.seats}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <input className="submit-button" type="submit" value="Submit" />
      <br />
    </form>
  );
}
