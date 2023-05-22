import React, { useState, useEffect } from "react";
import logo from "../assets/slidesync.svg";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function Welcome() {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);
  let navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center justify-end gap-24 h-full">
        <div className="flex flex-col items-center justify-end gap-3 mb-8 h-[60%]">
          <img src={logo} className="w-[84px] h-[76px]" alt="logo" />
          <p className={`sora text-3xl font-extrabold text-[var(--text)]`}>
            SlideSync
          </p>
        </div>

        <div className="flex flex-col items-center h-[40%] justify-between">
          <div className="buttons flex flex-col gap-3">
            <Link to={"/codeentry"}>
              <button
                className={`py-4 px-12 font-semibold rounded-full border border-[var(--primary)] text-sm text-[var(--primary)]`}
              >
                ENTER CODE MANUALLY
              </button>
            </Link>
            <Link to={"/scan"}>
              <button
                className={`py-4 px-12 font-semibold rounded-full bg-[var(--primary)] text-[var(--background)] text-sm w-full`}
              >
                SCAN CODE
              </button>
            </Link>
          </div>

          <p className={`text-[var(--text)]`}>Version 0.1-alpha</p>
        </div>
      </div>
    </>
  );
}
