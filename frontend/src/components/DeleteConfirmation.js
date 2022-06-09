import React from "react";

// This component renders editing options for a car item.
export function DeleteConfirmation(props) {
  // Function handles button click by passing button value up the DOM tree.
  const handleClick = (event) => {
    event.preventDefault();
    // Passes delete confirmation value and car item to callback function.
    props.handleClick(event.target.value, props.carItem);
  };

  return (
    <span className="delete-message">
      <p>Are you sure you want to delete this car from the list?</p>
      <button type="submit" value="true" onClick={handleClick}>
        Confirm
      </button>
      <button type="submit" value="false" onClick={handleClick}>
        Cancel
      </button>
    </span>
  );
}
