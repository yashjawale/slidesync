import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../App";

export default function CodeEntry() {
  const { state, setState } = useContext(Context);
  const navigate = useNavigate();

  const [enteredCode, setEnteredCode] = useState("");
  const handleSubmit = () => {
    if (enteredCode.length === 20) {
      setState((currentState) => ({ ...currentState, code: enteredCode }));
      navigate("/home");
    } else {
      console.log("Wrong code");
      // Send to error page
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start gap-8 pt-12">
        <p className={`text-2xl text-center max-w-xs text-[var(--text)]`}>
          Enter code from SlideSync Desktop Client
        </p>
        <div className="flex justify-center max-w-xs gap-1">
          <input
            type="text"
            required
            autoFocus
            value={enteredCode}
            onChange={(e) => setEnteredCode(e.target.value)}
            placeholder="JkG78qr_092"
            className={`bg-[var(--secondary)] text-[var(--text)] focus:outline-none placeholder:px-1 px-5 py-2 text-xl rounded-l-2xl w-[70vw]`}
            style={{ fontFamily: "Fira Code, Monospace" }}
          />
          <button
            onClick={handleSubmit}
            className={`text-xl bg-[var(--primary)] px-4 rounded-r-2xl flex items-center justify-center`}
          >
            <span className="material-symbols-outlined text-white">east</span>
          </button>
        </div>
        <p className={`text-sm text-center text-[var(--text)]`}>
          *Not sure about it? Visit help center
        </p>
      </div>
    </>
  );
}
