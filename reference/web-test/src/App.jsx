import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import { Html5QrcodeScanner } from "html5-qrcode";
import Html5QrcodePlugin from "./Html5QRCodePlugin";
import "./App.css";

import { io } from "socket.io-client";

// const socket = io("http://localhost:3000", { autoConnect: false });
const socket = io("http://localhost:4000", { autoConnect: false });
// const socket = io("http://192.168.0.101:4000", { autoConnect: false });

function App() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);

  const handleChange = (e) => {
    setCode(e.target.value);
    console.log(e.target.value);
  };

  const connectHandler = () => {
    socket.emit("next", code, () => {
      console.log("SENT");
    });
  };

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      setMessage(`You are connected with ID: ${socket.id}`);
    });
  }, []);

  const onNewScanResult = (decodedText, decodedResult) => {
    console.log(decodedText);
    console.log("PART 2");
    console.log(decodedResult);
    setCode(decodedText);
    // Html5QrcodePlugin.close();
    setCount(1);
  };

  const cameraButtonHandler = () => {
    // const html5QrCode = new Html5Qrcode("reader");
    // const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    //     setCode(decodedText);
    //     html5QrCode
    //         .stop()
    //         .then((ignore) => {
    //             // QR Code scanning is stopped.
    //         })
    //         .catch((err) => {
    //             // Stop failed, handle it.
    //         });
    // };
    // const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    // // If you want to prefer back camera
    // html5QrCode.start(
    //     { facingMode: "environment" },
    //     config,
    //     qrCodeSuccessCallback
    // );
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <div id="reader" width="600px"></div>
        <input
          type="text"
          placeholder="Enter code..."
          onChange={handleChange}
          value={code}
        />
        <button onClick={connectHandler}>NEXT</button>
        {/* <button onClick={cameraButtonHandler}>Open Camera</button>*/}
        {/* <button>NEXT</button> */}
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
          count={count}
        />
        <p>{code}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
