import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
import * as ReactDOMClient from "react-dom/client";

const App = () => {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);
root.render(<App />);
