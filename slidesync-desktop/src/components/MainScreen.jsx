import React, { useState, useEffect, useRef } from "react";
import QRCode from "react-qr-code";
import { io } from "socket.io-client";

import Message from "./Message.jsx";
import QRDisplay from "./QRDisplay.jsx";

// const URL = "http://localhost";
const URL = "https://soft-gamy-apatosaurus.glitch.me";
// const PORT = "4000";

const socket = io(`${URL}`, { autoConnect: false });

const controlTypes = ["next", "previous"];

const MainScreen = () => {
  const [code, setCode] = useState(""); // Stores socket ID from server
  // const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  const [isOnline, setIsOnline] = useState(true); // Used for checking whether user is online

  const setOnline = () => {
    console.log("We are online!");
    setIsOnline(true);
  };
  const setOffline = () => {
    console.log("We are offline!");
    setIsOnline(false);
  };

  useEffect(() => {
    window.addEventListener("offline", setOffline);
    window.addEventListener("online", setOnline);

    // Connecting to server
    socket.connect();
    socket.on("connect", () => {
      setCode(socket.id);
    });

    // Reset ID on server disconnect
    socket.on("disconnect", () => {
      setCode("");
    });

    // Device notifications
    socket.on("add-device", (device) => {
      setDevices((currentDevices) => [
        ...currentDevices,
        { name: device.name, id: device.id, connected: false },
      ]);
    });

    // Getting functions from mobile device
    socket.on("function-request", (controlType, origin) => {
      console.log(controlType);
      if (controlTypes.includes(controlType)) {
        // Valid control option
        console.log(deviceRef.current);
        if (
          deviceRef.current.find(
            ({ id, connected }) => id === origin && connected === true
          ) !== undefined
        ) {
          // Valid device
          console.log("FOUND");
          socket.emit("valid-fn", origin);
          // Triggering keyboard events
          switch (controlType) {
            case "next":
              window.app.next();
              break;
            case "previous":
              window.app.previous();
              break;
          }
          // window.app.next();
        } else {
          socket.emit("invalid-fn", origin);
        }
      } else {
        socket.emit("invalid-fn", origin);
      }
    });

    // Removing disconnected mobile device from list
    socket.on("device-disconnect", (id) => {
      handleButton("cross", id);
    });

    return () => {
      window.removeEventListener("offline", setOffline);
      window.removeEventListener("online", setOnline);
    };
  }, []);

  // const [devices, setDevices] = useState([
  //   {
  //     name: "Amused Marsupius",
  //     id: "fochvjodfjbfvc",
  //     connected: true,
  //   },
  //   {
  //     name: "Enormous Armadillo",
  //     id: "fdsfojchovjd",
  //     connected: false,
  //   },
  //   {
  //     name: "Payable Woodpecker",
  //     id: "cxovjojerfhjsdf",
  //     connected: false,
  //   },
  // ]);

  const [devices, setDevices] = useState([]);
  const deviceRef = useRef();
  deviceRef.current = devices;

  const handleButton = (button, id) => {
    console.log(button, id);
    if (button === "cross") {
      setDevices((currentDevices) => {
        return currentDevices.filter((device) => {
          return id !== device.id;
        });
      });
    }
    if (button === "accept") {
      setDevices((currentDevices) => {
        return currentDevices.map((device) => {
          if (device.id === id) {
            device.connected = true;
          }
          return device;
        });
      });
    }
    if (button === "ignore") {
      setDevices((currentDevices) => {
        return currentDevices.filter((device) => {
          return id !== device.id;
        });
      });
    }
  };

  return (
    <div className="main-container">
      <div className="qr-container">
        {isOnline ? <QRDisplay value={code} /> : <h2>No Internet</h2>}
      </div>
      <div className="message-container">
        {/* { (devices.length === 0) ?
        return (
        devices.map((device) => {
          return (
            <Message
              name={device.name}
              connected={device.connected}
              key={device.id}
              id={device.id}
              handleButton={handleButton}
            />
          );
        })) : <h3>No devices connected</h3>} */}

        {devices.length !== 0 ? (
          <>
            {devices.map((device) => (
              <Message
                name={device.name}
                connected={device.connected}
                id={device.id}
                key={device.id}
                handleButton={handleButton}
              />
            ))}
          </>
        ) : (
          <h3>No devices connected</h3>
        )}

        {/* <button onClick={() => setCode("XYZ")}>CHANGE</button> */}
      </div>
    </div>
  );
};

export default MainScreen;
