/**
 * IFS L3T27 – Create a custom API with Express
 *
 * I consulted the following sites for help:
 *
 * Working with URL parameters in Express –
 * https://thewebdev.info/2021/07/12/how-to-accept-multiple-url-parameters-in-express-routes/
 * https://javascript.plainenglish.io/query-strings-url-parameters-d1a35b9a694f
 *
 * Checking an array of objects for a specific value –
 * https://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-an-object-with-an-attribute-that-e
 * https://www.w3schools.com/jsref/jsref_some.asp
 *
 * Using array.some() –
 * https://www.w3schools.com/jsref/jsref_some.asp
 */

// Import modules and create top level Express app.
const express = require("express");
const fileHandler = require("fs");
const Promise = require("promise");

const app = express();
// Sets port variable for listening.
const port = process.env.PORT || 3001;

/* ROUTE METHODS */

// Base route serves a list of cars to the client.
app.get("/api", (req, res) => {
  // Calls async function to retrieve list from file.
  const carList = getCarList()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.send(err));
});

// Post request lets user add a new car to the list.
app.post("/api/add/:make/:model/:seats", (req, res) => {
  // Creates a car object using http paramaters.
  const newCarData = req.params;
  // Calls function to retrieve list of cars from file.
  const carList = getCarList()
    .then((result) => {
      // Checks if the list already contains the model to be added.
      if (result.some((carObject) => carObject.model === newCarData.model)) {
        res.send("Car model already in car list.");
        // Adds car to list if it's not already present.
      } else {
        addCar(newCarData, result);
        res.send("Success");
      }
    })
    // Sends error response if the getCarList function threw an error.
    .catch((err) => res.send(err));
});

// Delete request lets user delete a car from the list using its id.
app.delete("/api/delete/:id", (req, res) => {
  const deleteID = Number(req.params.id);
  // Gets list of cars from file.
  const carList = getCarList()
    .then((result) => {
      // Checks if the list contains the car id the user wants to delete.
      if (result.some((carObject) => carObject.id === deleteID)) {
        deleteCar(deleteID, result);
        res.send("Item deleted successfully");
      } else {
        res.send("Car id is not in list.");
      }
    })
    // Sends error response if the getCarList function threw an error.
    .catch((err) => res.send(err));
});

// Update request lets user update the model of a car.
app.put("/api/update/:id/:make/:model/:seats", (req, res) => {
  const updateID = Number(req.params.id);
  const newMake = req.params.make;
  const newModel = req.params.model;
  const numSeats = req.params.seats;

  // Gets list of cars from file.
  const carList = getCarList()
    .then((result) => {
      // Checks if the list contains the car id the user wants to update.
      if (result.some((carObject) => carObject.id === updateID)) {
        // Calls function to update car
        updateCar(result, updateID, newMake, newModel, numSeats);
        res.send("Item updated successfully");
      } else {
        res.send("Car id is not in list.");
      }
    })
    // Sends error response if the getCarList function threw an error.
    .catch((err) => res.send(err));
  // Logs error if invalid update category has been requested.
});

// Method listens for connections on the specified port (8080)
app.listen(port, () => console.log(`Listening at http://localhost:${port}.`));

/* UTILITY FUNCTIONS */

// Utility function returns an array of car objects from a file.
function getCarList() {
  return new Promise((resolve, reject) => {
    fileHandler.readFile("cars.json", (err, data) => {
      // Rejects promise with error if file cannot be read.
      if (err) {
        reject(err);
        // Passes file data as an object if file is read successfuly.
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

// Utility function writes data to a JSON file
function writeToFile(data) {
  return new Promise((resolve, reject) => {
    fileHandler.writeFile("cars.json", JSON.stringify(data), (err) => {
      if (err) {
        reject(err);
      } else {
        console.log("Car list saved to file.");
        resolve();
      }
    });
  });
}

// Utility function adds a car to the list.
function addCar(carData, carList) {
  // Creates a unique ID for the new car.
  const lastID = carList[carList.length - 1].id;
  const newID = lastID + 1;
  // Creates an object of the new car.
  const newCarObject = {
    id: newID,
    make: carData.make,
    model: carData.model,
    seats: Number(carData.seats),
  };
  // Adds new car object to the array of cars.
  carList.push(newCarObject);

  // Calls function to write updated car list to file.
  writeToFile(carList);
}

// Utility function deletes a car from the list.
function deleteCar(deleteID, carList) {
  let deleteIndex = null;

  // Finds index position of car object that matches delete id.
  carList.forEach((carObject, index) => {
    if (carObject.id === deleteID) {
      deleteIndex = index;
    }
  });
  // Removes car object at matching index position from the list.
  carList.splice(deleteIndex, 1);

  // Calls function to write updated car list to file.
  writeToFile(carList);
}

// Utility function updates a car item
function updateCar(carList, updateID, newMake, newModel, numSeats) {
  let updateIndex = null;
  // Finds index position of car object that matches update id.
  carList.forEach((carObject, index) => {
    if (carObject.id === updateID) {
      updateIndex = index;
    }
  });

  // Updates car at matching index position.
  carList[updateIndex].make = newMake;
  carList[updateIndex].model = newModel;
  carList[updateIndex].seats = numSeats;

  // Calls function to write updated car list to file.
  writeToFile(carList);
}
