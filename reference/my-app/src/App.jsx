import { useState, useEffect } from "react";

import { io } from "socket.io-client";

const socket = io("http://localhost:3000", { autoConnect: false });

function App() {
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setCode(e.target.value);
        console.log(e.target.value);
    };

    useEffect(() => {
        socket.connect();
        socket.on("connect", () => {
            setMessage(`You are connected with ID: Helo`);
        });
    }, []);

    return (
        <div className="App">
            <h1>Vite + React</h1>
            <div className="card">
                <input
                    type="text"
                    placeholder="Enter code..."
                    onChange={handleChange}
                    value={code}
                />
                <button onClick={() => console.log("CLICKED")}>NEXT</button>
                <p>{message}</p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </div>
    );
}

export default App;
