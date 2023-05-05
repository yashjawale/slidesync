import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
import * as ReactDOMClient from "react-dom/client";
import Header from "./components/Header.jsx";
import MainScreen from "./components/MainScreen.jsx";

const App = () => {
  return (
    <div className="screen">
      <Header />
      <MainScreen />
    </div>
  );
};

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);
root.render(<App />);
