import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import disconnect from "../assets/disconnect.svg";
import logo from "../assets/slidesync.svg";
export default function Error(props) {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("LOCATION: ", location);

  return (
    <div className="flex flex-col justify-start gap-20 items-center py-8 mx-auto h-screen">
      <div className="logo flex items-center gap-2">
        <img src={logo} className="w-[32.9px] h-[30px]" alt="logo" />
        <p className={`font-semibold sora text-2xl text-[var(--text)]`}>
          SlideSync
        </p>
      </div>

      <div className="flex flex-col justify-center gap-20 items-center h-[60vh]">
        <div className="flex flex-col items-center gap-8">
          <img src={disconnect} alt="" className=" w-48" />
          <p className="text-[var(--text)] text-xl text-center max-w-[90%] font-light">
            {location.state.message}
          </p>
        </div>
        <button
          className={`py-4 px-12 font-semibold rounded-full bg-[var(--primary)] text-sm text-white`}
          onClick={() => {
            navigate("/");
          }}
        >
          BACK TO HOME
        </button>
      </div>
    </div>
  );
}
