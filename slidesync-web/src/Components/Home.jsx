import React, {
  useContext,
  useState,
  createContext,
  useEffect,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import Time from "./Time";
import Nav from "./Nav";
import Coontrols from "./Coontrols";
import Settings from "./Settings";
import { Context } from "../App";
import Confirmation from "./Confirmation";

export const AppContext = createContext();

export default function Home({ socket }) {
  const navigate = useNavigate();
  const { dark, state, setState } = useContext(Context);
  const [showmenu, setShowMenu] = useState(false);
  const [showexit, setShowExit] = useState(false);
  const [message, setMessage] = useState("");

  const myRef = useRef();

  const controlTypes = ["next", "previous", "first-slide", "last-slide"];

  // const handleControl = (controlType) => {
  //   console.log("HANDLECTRL: ", controlType);
  //   socket.emit(controlType);
  //   return new Promise((resolve, reject) => {
  //     if (controlTypes.includes(controlType)) {
  //       socket.emit("trigger", controlType, state.code, (res) => {
  //         if (res === "Accept") {
  //           resolve();
  //         } else {
  //           console.log(res);
  //           reject("Invalid");
  //         }
  //       });
  //     } else {
  //       reject("Invalid function");
  //     }
  //   });
  // };

  const handleControl = (controlType, blinkLight) => {
    console.log("HANDLECTRL: ", controlType);
    if (controlTypes.includes(controlType)) {
      socket.emit("trigger", controlType, state.code, socket.id);
      console.log("EMITTED");
      // myRef.current.successMethod();
    } else {
      blinkLight("error");
    }
  };

  useEffect(() => {
    console.log("CALLED");
    socket.connect();
    socket.on("connect", () => {
      console.log("CONNECTED with ID: ", socket.id);
      socket.emit("mobile-connect", state.code, (displayName) => {
        console.log("EVENT EMITTED: ", state.code, displayName);
        if (displayName !== "NOT FOUND") {
          console.log("FOUND: ", state.code, displayName);
          setMessage(displayName);
        } else {
          setMessage("");
          console.log("DEVICE NOT FOUND");
          navigate("/");
        }
      });
    });
    socket.on("valid", (msg) => {
      console.log("RECEIVED Valid");
      console.log(myRef.current.successMethod());
      // myRef.current.successMethod();
    });
    socket.on("invalid", (msg) => {
      console.log("RECEIVED Invalid");
      myRef.current.errorMethod();
    });
    socket.on("device-disconnect", (id) => {
      console.log("Device disconnected");
      if (id === state.code) {
        navigate("/error", { state: { message: "Computer has disconnected" } });
        setState((currentState) => ({ ...currentState, code: "" }));
      }
    });
    socket.on("disconnect", () => {
      console.log("DISCONNECT event");
      setMessage("");
      setState((currentState) => ({ ...currentState, code: "" }));
      navigate("/error", { state: { message: "Disconnected from server" } });
      // navigate("/");
    });
    return () => {
      console.log("RETURN EVENT LISTENER");
      socket.removeAllListeners("connect");
      socket.removeAllListeners("invalid");
      socket.disconnect();
    };
  }, []);

  const disconnectSocket = () => {
    socket.disconnect();
  };

  return (
    <>
      <AppContext.Provider
        value={{ showmenu, setShowMenu, showexit, setShowExit }}
      >
        <div
          className={`flex flex-col justify-between py-8 max-w-sm mx-auto relative overflow-hidden h-[100%]`}
        >
          <Nav disconnectSocket={disconnectSocket} />
          <Time />
          <Coontrols handleControl={handleControl} ref={myRef} />
          <p
            style={{ marginTop: "-70px" }}
            className="text-center text-[var(--text)]"
          >
            {/* {message === "" ? "Connection error" : `Connected as ${message}`} */}
            {message === "" ? "Connecting..." : "Connected as "}
            <span className="text-[var(--primary)]">{message}</span>
          </p>
          {showexit && <Confirmation disconnectSocket={disconnectSocket} />}
          <div
            className={`settings absolute -top-[-2px] bg-[var(--background)] text-[var(--text)] h-[100%] ${
              showmenu ? "translate-x-[0px]" : " translate-x-[1200px]"
            } w-full`}
          >
            <Settings />
          </div>
        </div>
      </AppContext.Provider>
    </>
  );
}
