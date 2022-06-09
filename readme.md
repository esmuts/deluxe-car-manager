# Deluxe Car Manager

Car Manager is a basic web API and frontend that allows the user to manage and update a list of cars stored in a file (cars.json). It listens for requests on Port 8080. The following methods are accommodated:

- GET
- POST
- DELETE
- PUT

## Contents

- Running Car Manager
- Usage
- Credits

## Running Car Manager

You can run Car Manager on your own maching by following these steps:

- Clone the repository to your local system.
- Open a command line prompt, and navigate to the directory to which you downloaded the repository.
Download and install npm: [https://nodejs.org/en/download/]()
- Type 'npm install' in the app directory, and wait fot the process to finish.
- Type 'npm start'.
- In a new command line client windown, navigate to the "/frontend" directory.
Type 'npm install' again and wait for it to finish.
- Type 'npm start'.
The application should open in your default browser, at 'http://localhost/8000'

## Usage

Using the app is fairly self-explanatory. Follow on-screen prompts to see a list of cars. Click on a car in the list to see its details. Details can be updated, or the car can be deleted from the list. Users can also add a new car. Hit 'Return to list' at any time to return to the car list (which is also the home screen).

## Credits

This app was built using Express and React as a project for a full-stack web development course at [https://www.hyperiondev.com](). Please feel free to let me know if you have any comments or suggestions.