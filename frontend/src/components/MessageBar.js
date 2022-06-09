import React from "react";
import { useLocation } from "react-router-dom";

// This component renders a message to the user.
export function MessageBar(props) {
  // Gets current path from URL.
  const location = useLocation();
  // Returns message based on curret URL path.
  if (location.pathname === "/") {
    return (
      <p>
        <em>Click on a car for more information</em>
      </p>
    );
  } else if (location.pathname.includes("update")) {
    return (
      <p>
        <em>Change any field you like and click 'Submit'.</em>
      </p>
    );
  }
}
