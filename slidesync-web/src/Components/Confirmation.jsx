import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./Home";
import { Context } from "../App";

export default function Confirmation({ disconnectSocket }) {
  const navigate = useNavigate();
  const { setShowExit } = useContext(AppContext);
  const { setState } = useContext(Context);
  return (
    <>
      <div className="absolute bg-[var(--background)] px-5 mx-6 py-5 flex flex-col items-center gap-3 top-[calc(100vh-70%)]">
        <p className="text-2xl text-[var(--text)] self-start font-semibold">
          Confirm logout
        </p>
        <p className="text-xl text-[var(--text)] self-start mt-4">
          Are you sure you want to logout?
        </p>
        <div className="buttons flex gap-2 self-start mt-2">
          <button
            className="px-4 py-2 rounded-lg text-[var(--text)] border border-[var(--text)]"
            onClick={() => {
              setShowExit(false);
            }}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg text-[var(--background)] bg-red-600"
            onClick={() => {
              disconnectSocket();
              setState((currentState) => ({ ...currentState, code: "" }));
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
