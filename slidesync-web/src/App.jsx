import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./App.css";
import NoSleep from 'nosleep.js';
import Home from "./Components/Home";
import Welcome from "./Components/Welcome";
import CodeEntry from "./Components/CodeEntry";
import Error from "./Components/Error";

export const Context = createContext();
const nosleep = new NoSleep();
const getDark = () => {
  return JSON.parse(localStorage.getItem("dark")) || false;
}

// localStorage.removeItem('dark')
function App() {

  // const [dark, setDark] = useState(getDark())
  // const [vibrate, setVibrate] = useState(false)
  // const [sound, setSound] = useState(true)
  // const [sleep, setSleep] = useState(true)

  const [state, setState] = useState({
    // dark: getDark() ,
    dark: true,
    vibrate: false,
    sound: false,
    sleep: false,
  })

  useEffect(() => {
    // localStorage.setItem("dark", state.dark)
    document.body.classList.toggle('dark')
  }, [state.dark])

  useEffect(() => {
    // state.sleep && nosleep.enable();
    state.sleep ?
    document.addEventListener('click', function enableNoSleep() {
      document.removeEventListener('click', enableNoSleep, false);
      nosleep.enable();
    }, false) : nosleep.disable();

  }, [state.sleep])
  return (
    <>
      <BrowserRouter>

        <Context.Provider value={{ state, setState }}>

          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/codeentry" element={<CodeEntry />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Context.Provider>

      </BrowserRouter>
    </>
  );
}

export default App;