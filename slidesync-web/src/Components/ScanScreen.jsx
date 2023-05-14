import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../App";
import Html5QrcodePlugin from "./Html5QRCodePlugin.jsx";

export default function ScanScreen() {
  const { state, setState } = useContext(Context);

  const handleScan = (decodedText, decodedResult) => {
    if (decodedText.length === 20) {
      // Code valid
      // Send to control page + set the code state
      setState((currentState) => ({ ...currentState, code: decodedText }));
      navigate("/home");
    } else {
      // Code invalid
      // Send to error page
      console.log("wrong code");
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center justify-start gap-8 pt-12">
        <p className={`text-2xl text-center max-w-xs text-[var(--text)]`}>
          Scan QR code from SlideSync Desktop Client
        </p>
        <Html5QrcodePlugin
          fps={10}
          qrbox={300}
          disableFlip={false}
          qrCodeSuccessCallback={handleScan}
        />
      </div>
    </>
  );
}
