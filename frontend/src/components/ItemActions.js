import React from "react";
import "./ItemActions.css";
import { Link, useParams } from "react-router-dom";

// This component renders editing options for a car item.
export function ItemActions(props) {
  // Gets ID parameter from the current URL.
  const { id } = useParams();

  return (
    <span className="item-action-links">
      <Link to={{ pathname: `/car/${id}/delete` }}>
        <em>Delete</em>
      </Link>
      <Link to={{ pathname: `/car/${id}/update` }}>
        <em>Update</em>
      </Link>
    </span>
  );
}
