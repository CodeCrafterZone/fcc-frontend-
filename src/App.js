import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import CustomRouter from "./CustomRouter";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <h1>Liste De Mes Projets Front-End</h1>
        <CustomRouter />
        <ul>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/calculator">Calculator</NavLink>
          </li>
          <li>
            <NavLink to="/clock">Clock</NavLink>
          </li>
          <li>
            <NavLink to="/drumMachine">DrumMachine</NavLink>
          </li>
          <li>
            <NavLink to="/markdown">Markdown</NavLink>
          </li>
          <li>
            <NavLink to="/randomQuote">RandomQuote</NavLink>
          </li>
        </ul>
      </div>
    </Router>
  );
}

export default App;
