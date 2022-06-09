/**
 * IFS L3T28  – Full Stack with React and Express
 *
 * @author Eckard Smuts
 *
 * I consulted the following sites for help:
 *
 * Getting URL and path data in React –
 * https://surajsharma.net/blog/current-url-in-react
 *
 * Accessing URL parameters with useParams –
 * https://reactrouter.com/docs/en/v6/hooks/use-params
 * https://stackoverflow.com/questions/45898789/react-router-pass-param-to-component
 *
 * Using React forms with Hooks –
 * https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
 *
 * Using useState with objects –
 * https://blog.logrocket.com/using-react-usestate-object/
 * https://reactjs.org/docs/hooks-reference.html#usestate
 * https://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
 *
 * Using spread syntax (...) in JavaScript –
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 *
 * Using useNavigate in React –
 * https://reactrouter.com/docs/en/v6/hooks/use-navigate
 *
 * Using setTimeOut in useEffect API call –
 * (Thanks to J.C. van der Merwe for the suggestion.)
 * https://dev.to/reenydavidson/settimeout-in-useeffect-api-call-data-fetching-j33
 * https://upmostly.com/tutorials/settimeout-in-react-components-using-hooks
 *
 */

import React, { useState, useEffect } from "react";
import "./App.css";
// Import components
import { Header } from "./components/Header.js";
import { NavBar } from "./components/NavBar.js";
import { CarList } from "./components/CarList.js";
import { CarItemCard } from "./components/CarItemCard.js";
import { DeleteCarItemCard } from "./components/DeleteCarItemCard.js";
import { CarForm } from "./components/CarForm.js";
import { MessageBar } from "./components/MessageBar.js";
// Import React-Router
import { Routes, Route, useNavigate } from "react-router-dom";
// Import React-Bootstrap components
import { Container, Row } from "react-bootstrap";

// This is componet renders the app.
function App() {
  // Variable uses hook to allow programmatic navigation after fetch calls.
  let navigate = useNavigate();
  // Declare state variables to store fetch results
  const [carList, setCarList] = useState(null);
  const [error, setError] = useState(null);
  // State variable used to manage useEffect hook.
  const [reload, setReload] = useState(null);

  // Updates carList for each new render (temp --> add condition)
  useEffect(() => {
    fetchCarList();
    // useEffect hook will only run if 'reload' is given a new value.
  }, [reload]);

  // Async function makes GET call to Car API
  async function fetchCarList() {
    try {
      const response = await fetch("/api");
      setCarList(await response.json());
    } catch (err) {
      setError(err);
    }
  }

  // Function updates car list with new car and posts it to the server.
  async function postCar(newCar) {
    try {
      // Fetch call posts new car to the file on the server.
      const response = await fetch(
        `/api/add/${newCar.make}/${newCar.model}/${newCar.seats}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(carList),
        }
      );
      // Alters variable to fetch car list via 'useState' hook.
      setTimeout(() => {
        setReload(!reload);
      }, 2000);
    } catch (err) {
      setError(err);
    }
  }

  // Posts PUT request to the server with updated car data.
  async function updateCar(newCar) {
    try {
      const response = await fetch(
        `/api/update/${newCar.id}/${newCar.make}/${newCar.model}/${newCar.seats}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(carList),
        }
      );
      // Alters variable to fetch car list via 'useState' hook.
      setTimeout(() => {
        setReload(!reload);
      }, 2000);
    } catch (err) {
      setError(err);
    }
  }

  // Posts DELETE request to the server.
  async function DeleteCar(carItem) {
    try {
      const response = await fetch(`/api/delete/${carItem.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application.json",
        },
        body: JSON.stringify(carList),
      });
      // Alters variable to fetch car list via 'useState' hook.
      setTimeout(() => {
        setReload(!reload);
      }, 2000);
    } catch (err) {
      setError(err);
    }
  }

  // Function handles form submission of new or updated car item in CarForm
  // component.
  function handleSubmit(newCar) {
    // Checks if the received car item has an ID value.
    if (newCar.id === "") {
      // Sets id for the new car.
      let lastID = carList[carList.length - 1].id;
      newCar.id = lastID + 1;
      // Calls function to POST new car to the server.
      postCar(newCar);
      // Calls function to update (PUT) car on the server.
    } else {
      updateCar(newCar);
    }

    // Navigates to home page.
    navigate("/");
  }

  // Function handles button click in the DeleteConfirmation component.
  function handleClick(mustDelete, carItem) {
    // Calls functon to DELETE car on on the server.
    if (mustDelete === "true") {
      DeleteCar(carItem);
    }
    // Navigates to home page.
    navigate("/");
  }

  return (
    <Container className="app p-5">
      <Row className="header p-5">
        <Header />
      </Row>
      <Row className="nav-bar p-4">
        <NavBar />
      </Row>
      <Row className="display-area">
        <Routes>
          <Route
            exact={true}
            path="/"
            element={<CarList carList={carList} error={error} />}
          />
          <Route
            path="/add"
            element={<CarForm handleSubmit={handleSubmit} />}
          />
          <Route path="car/:id" element={<CarItemCard carList={carList} />} />
          <Route
            path="car/:id/delete"
            element={
              <DeleteCarItemCard carList={carList} handleClick={handleClick} />
            }
          />
          <Route
            path="car/:id/update"
            element={<CarForm carList={carList} handleSubmit={handleSubmit} />}
          />
        </Routes>
      </Row>
      <Row className="message-bar p-3">
        <MessageBar />
      </Row>
    </Container>
  );
}

export default App;
