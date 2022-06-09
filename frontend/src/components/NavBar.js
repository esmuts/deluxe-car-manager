import React from "react";
import "./NavBar.css";
import { Link, Routes, Route } from "react-router-dom";

// This function renders the main navigation bar for the app.
export function NavBar(props) {
  // Function renders a button linking to the add new car path.
  function AddNewCarButton(props) {
    return (
      <Link to="/add">
        <em>Add a new car</em>
      </Link>
    );
  }

  // Function renders a button linking to the car list display path.
  function ReturnToListButton(props) {
    return (
      <Link to="/">
        <em>Return to list</em>
      </Link>
    );
  }

  return (
    <Routes>
      <Route exact={true} path="/" element={<AddNewCarButton />} />
      <Route path="/*" element={<ReturnToListButton />} />
    </Routes>
  );
}
