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

          <p className="text-3xl font-bold mt-6">Settings</p>
          <ul className="flex flex-col justify-evenly pt-8 gap-2 max-w-[350px]">
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
        <p className="text-lg text-center py-2 absolute bottom-0 self-center">
          SlideSync v1.0.1
        </p>
      </div>
    </>
  );
}

/*

    {/* <List settingName="Dark Mode" /> 
    <li>
        <div className='flex items-center justify-between border-b-2 pb-2 border-gray-300'>
            <p className="text-xl">Dark Mode</p>
            <button><i className={`material-icons text-6xl ${state.dark ? 'text-[var(--primary)]' : 'text-gray-300'}`} onClick={() => {
                setState(initials=>({...initials , dark : !state.dark}))
                }}>
                {state.dark ? 'toggle_on' : 'toggle_off'}
            </i></button>
        </div>
    </li>

    <li>
    <div className='flex items-center justify-between border-b-2 pb-2 border-gray-300'>
                                <p className="text-xl">Dark Mode</p>
                                <button><i className={`material-icons text-6xl ${dark ? 'text-[#1899E9!important]' : 'text-gray-300'}`} onClick={() => { setDark(!dark) }}>
                                {dark ? 'toggle_on' : 'toggle_off'}
                                </i></button>
                                </div>
                                </li>
                                <li>
                                <div className='flex items-center justify-between border-b-2 pb-2 border-gray-300'>
                                <p className="text-xl">Haptic Feedback</p>
                                <button><i className={`material-icons text-6xl ${vibrate ? 'text-[#1899E9!important]' : 'text-gray-300'}`} onClick={() => { setVibrate(!vibrate) }}>
                                {vibrate ? 'toggle_on' : 'toggle_off'}
                                </i></button>
                            </div>
                        </li>
                        <li>
                            <div className='flex items-center justify-between border-b-2 pb-2 border-gray-300'>
                                <p className="text-xl">Sound</p>
                                <button><i className={`material-icons text-6xl ${sound ? 'text-[#1899E9!important]' : 'text-gray-300'}`} onClick={() => { setSound(!sound) }}>
                                {sound ? 'toggle_on' : 'toggle_off'}
                                </i></button>
                            </div>
                        </li>
                        <li>
                            <div className='flex items-center justify-between border-b-2 pb-2 border-gray-300'>
                                <p className="text-xl">Prevent the screen from sleeping</p>
                                <button><i className={`material-icons text-6xl ${sleep ? 'text-[#1899E9!important]' : 'text-gray-300'}`} onClick={() => { setSleep(!sleep) }}>
                                {sleep ? 'toggle_on' : 'toggle_off'}
                                </i></button>
                            </div>
                        </li>



*/
