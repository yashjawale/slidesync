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
  let newObj = localStorage.getItem("state");
  let json = JSON.parse(newObj);
  if (json) {
    return json.dark || false;
  }
};
const getSleep = () => {
  let newObj = localStorage.getItem("state");
  let json = JSON.parse(newObj);
  if (json) {
    return json.sleep || false;
  }
};
const getVibrate = () => {
  let newObj = localStorage.getItem("state");
  let json = JSON.parse(newObj);
  if (json) {
    return json.vibrate || false;
  }
};
const getSound = () => {
  let newObj = localStorage.getItem("state");
  let json = JSON.parse(newObj);
  if (json) {
    return json.sound || false;
  }
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
    dark: getDark(),
    vibrate: getVibrate(),
    sound: getSound(),
    sleep: getSleep(),
    code: "",
  });

  useEffect(() => {
    if (state.dark) {
      if (!document.body.classList.contains("dark")) {
        document.body.classList.add("dark");
      }
    } else {
      document.body.classList.remove("dark");
    }
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

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);
  
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
