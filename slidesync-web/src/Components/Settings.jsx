import React, { useContext, useEffect } from "react";
import { AppContext } from "./Home";
import { Context } from "../App";
import List from "./List";
// import notify from '../assets/notify.mp3'

export default function Settings() {
  const { showmenu, setShowMenu } = useContext(AppContext);
  const { state, setState } = useContext(Context);

  const handleMode = () => {
    setState((initials) => ({ ...initials, dark: !state.dark }));
  };
  const handleSleep = () => {
    setState((initials) => ({ ...initials, sleep: !state.sleep }));
  };
  const handleSound = () => {
    setState((initials) => ({ ...initials, sound: !state.sound }));
  };
  const handleVibrate = () => {
    setState((initials) => ({ ...initials, vibrate: !state.vibrate }));
  };

  return (
    <>
      <div className="flex flex-col justify-between">
        <div className="menu flex flex-col justify-start items-start mx-6 gap-1">
          <span
            className="material-symbols-outlined py-2 text-3xl"
            onClick={() => {
              setShowMenu(!showmenu);
              // const audio = new Audio(notify);
              // audio.play();
            }}
          >
            west
          </span>

          <p className="text-3xl font-bold mt-3">Settings</p>
          <ul className="flex flex-col justify-evenly pt-8 max-w-[350px]">
            <List
              settingName="Dark Mode"
              handleClick={handleMode}
              status={state.dark}
            />
            <List
              settingName="Haptic Feedback"
              handleClick={handleVibrate}
              status={state.vibrate}
            />
            <List
              settingName="Sound"
              handleClick={handleSound}
              status={state.sound}
            />
            <List
              settingName="Prevent the screen from sleeping"
              handleClick={handleSleep}
              status={state.sleep}
            />
            <li className="text-lg py-4">Report an Issue</li>
          </ul>
        </div>
        <p className="text-lg text-center pt-2 absolute bottom-0 self-center">
          SlideSync v0.1.3-alpha
        </p>
      </div>
    </>
  );
}
