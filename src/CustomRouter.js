import React from "react";
import { Routes, Route } from "react-router-dom";

//import Home from "./Home";
import Calculator from "./components/calculator/Calculator";
import Clock from "./components/clock/Clock";
import DrumMachine from "./components/drumMachine/DrumMachine";
import Markdown from "./components/markdown/Markdown";
import RandomQuote from "./components/randomQuote/RandomQuote";

function CustomRouter() {
  return (
    <Routes>
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/clock" element={<Clock />} />
      <Route path="/drumMachine" element={<DrumMachine />} />
      <Route path="/markdown" element={<Markdown />} />
      <Route path="/randomQuote" element={<RandomQuote />} />
    </Routes>

    /*
    <Routes>
      <Route path="/home" exact component={Home} />
      <Route path="/calculator" exact component={Calculator} />
      <Route path="/clock" exact component={Clock} />
      <Route path="/drumMachine" exact component={DrumMachine} />
      <Route path="/markdown" exact component={Markdown} />
      <Route path="/randomQuote" exact component={RandomQuote} />
    </Routes>
    */
  );
}

export default CustomRouter;
