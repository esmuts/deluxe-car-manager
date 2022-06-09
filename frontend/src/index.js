import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";

/**
 * Note: I have updated the root API code to React 18's version. See here:
 *
 * https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis
 * https://blog.saeloun.com/2021/07/15/react-18-adds-new-root-api.html
 * */

// Get root element
const container = document.getElementById("root");
// Create a root for the ReactDom
const root = createRoot(container);
// Inital render
root.render(
  <Router>
    <App />
  </Router>
);
