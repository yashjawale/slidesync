import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoSleep from "nosleep.js";
import Home from "./Components/Home";
import Welcome from "./Components/Welcome";
import CodeEntry from "./Components/CodeEntry";
import PageNotFound from "./Components/PageNotFound";
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
function App() {
  const [state, setState] = useState({
    // dark: getDark() ,
    dark: getDark(),
    vibrate: getVibrate(),
    sound: getSound(),
    sleep: getSleep(),
  });

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

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
  return (
    <>
      <BrowserRouter>
        <Context.Provider value={{ state, setState }}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/codeentry" element={<CodeEntry />} />
            <Route
              path="/error"
              element={
                <Error errMessage="The server you are trying to access is currently disconnected. Please check your internet connection or try again later." />
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Context.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
