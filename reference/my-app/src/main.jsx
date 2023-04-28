import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
import * as ReactDOMClient from "react-dom/client";
import QRCode from "react-qr-code";
// import App from "./App.jsx";

import { io } from "socket.io-client";

const socket = io("http://localhost:3000", { autoConnect: false });

function App() {
    const [code, setCode] = useState("");

    const handleChange = (e) => {
        setCode(e.target.value);
        console.log(e.target.value);
    };

    const connectHandler = () => {
        console.log("Clicked", code);
        // socket.emit("next", code, () => {
        //     console.log("SENT");
        // });
        // window.app.sayhello();
    };

    useEffect(() => {
        socket.connect();
        socket.on("connect", () => {
            setCode(socket.id);
        });
        socket.on("next-trigger", () => {
            // console.log("NEXT");
            window.app.sayhello();
        });
    }, []);

    return (
        <div className="App">
            <h1>Vite + React</h1>
            <div className="card">
                {code !== "" && <QRCode value={code} />}
                <p>{code === "" ? "Not Connected" : code}</p>
                {/* <button onClick={connectHandler}>NEXT</button> */}
            </div>
        </div>
    );
}

// ReactDOM.render(
// <div>
//     <h2>Hello from React in Electron!</h2>
// </div>,
//     document.getElementById("root")
// );

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);
root.render(<App />);
