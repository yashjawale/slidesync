import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import "./App.css";

import NoSleep from "nosleep.js";
import Home from "./Components/Home";
import ScanScreen from "./Components/ScanScreen";
import Welcome from "./Components/Welcome";
import CodeEntry from "./Components/CodeEntry";
import Error from "./Components/Error";

export const Context = createContext();
const nosleep = new NoSleep();
const getDark = () => {
  return JSON.parse(localStorage.getItem("dark")) || false;
};

// Configuring socket
// const URL = "http://localhost";
const URL = "https://soft-gamy-apatosaurus.glitch.me";
// const URL = "http://192.168.53.99";
// const PORT = "4000";
const socket = io(`${URL}`, {
  autoConnect: false,
});
// const socket = io(
//   `https://e576-2409-4042-4ccb-4c7f-f0a6-f8f7-ebaf-249f.ngrok-free.app`,
//   {
//     autoConnect: false,
//   }
// );

// States for app preferences & socket ID
function App() {
  const [state, setState] = useState({
    dark: true,
    vibrate: false,
    sound: false,
    sleep: false,
    code: "",
  });

  useEffect(() => {
    document.body.classList.toggle("dark");
  }, [state.dark]);

  useEffect(() => {
    state.sleep
      ? document.addEventListener(
          "click",
          function enableNoSleep() {
            document.removeEventListener("click", enableNoSleep, false);
            nosleep.enable();
          },
          false
        )
      : nosleep.disable();
  }, [state.sleep]);
  return (
    <>
      <BrowserRouter>
        <Context.Provider value={{ state, setState }}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home socket={socket} />} />
            <Route path="/scan" element={<ScanScreen />} />
            <Route path="/codeentry" element={<CodeEntry />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Context.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
