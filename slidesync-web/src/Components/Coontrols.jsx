import React, {
  useState,
  useContext,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Context } from "../App";
import { AppContext } from "./Home";
import notify from "../assets/tap.wav";

import firstSlide from "../assets/arrow-end-left-icon.svg";
import lastSlide from "../assets/arrow-end-right-icon.svg";

const Coontrols = forwardRef((props, ref) => {
  const [range, setRange] = useState(0);
  let { dark, state } = useContext(Context);
  let { showexit } = useContext(AppContext);
  const [lightStatus, setLightStatus] = useState("");

  const audio = new Audio(notify);

  const blinkLight = (status) => {
    setLightStatus(status);
    setTimeout(() => {
      setLightStatus("");
    }, 1000);
  };

  useImperativeHandle(ref, () => ({
    successMethod() {
      console.log("CALLED SUCCESS");
      blinkLight("success");
    },
    errorMethod() {
      console.log("CALLED ERROR");
      blinkLight("error");
    },
  }));

  const trigger = (direction) => {
    // handleControl(direction).then(
    //   (res) => {
    //     blinkLight("success");
    //   },
    //   (err) => {
    //     console.log(err);
    //     blinkLight("error");
    //   }
    // );
    props.handleControl(direction, blinkLight);
  };

  const handleRange = (e) => {
    setRange(e.target.value);
    if (e.target.value == 10 || e.target.value == -10) {
      state.sound && audio.play();
      state.vibrate && window.navigator.vibrate(100);
      if (e.target.value == 10) {
        console.log("next");
        trigger("next");
      } else {
        console.log("prev");
        trigger("previous");
      }
    }
  };
  const goBack = (e) => {
    if (e.target.value > 0) {
      let a = e.target.value;

      let i = setInterval(() => {
        a--;
        setRange(a);
        if (a === 0) clearInterval(i);
      }, 15);
    }
    if (e.target.value < 0) {
      let b = e.target.value;

      let j = setInterval(() => {
        b++;
        setRange(b);
        if (b === 0) clearInterval(j);
      }, 15);
    }
  };

  useEffect(() => {
    let low = setInterval(() => {
      if (range == -10) {
        console.log("previous");
        // handleControl("previous");
        trigger("previous");
        state.sound && audio.play();
        state.vibrate && window.navigator.vibrate(100);
      }
    }, 500);
    if (range !== -10) {
      return () => {
        clearInterval(low);
      };
    }
  }, [range]);
  useEffect(() => {
    let high = setInterval(() => {
      if (range == 10) {
        console.log("next");
        // handleControl("next");
        trigger("next");
        state.sound && audio.play();
        state.vibrate && window.navigator.vibrate(100);
      }
    }, 500);

    if (range !== 10) {
      return () => {
        clearInterval(high);
      };
    }
  }, [range]);
  return (
    <>
      <div
        className={`${
          dark ? "text-[#E6E6E7]" : "text-black"
        } flex flex-col h-[40%] justify-around ${showexit && "opacity-10"}`}
      >
        <div className="cntr-1 flex items-center justify-center gap-24">
          <button
            onClick={() => {
              // blinkLight("error");
              trigger("first-slide");
            }}
            className="text-lg border border-[var(--text)] h-12 w-12 rounded-[50%] flex items-center justify-center"
          >
            <img
              src={firstSlide}
              alt="First Slide"
              className="aux-button-img"
            />
          </button>
          <button
            onClick={() => {
              // blinkLight("error");
              trigger("last-slide");
            }}
            className="text-xl border border-[var(--text)] h-12 w-12 rounded-[50%] flex items-center justify-center"
          >
            {/* <i className="bx bx-fullscreen text-[var(--text)]"></i> */}
            <img src={lastSlide} alt="Last Slide" className="aux-button-img" />
          </button>
        </div>
        <div
          className={`status-light ${lightStatus} self-center rounded-full w-[28.34px] h-3 mt-4`}
        ></div>

        <div
          className={`input-box w-[65%] mx-auto bg-[var(--secondary)] shadow-[rgba(0,0,0,0.7)] shadow-inner rounded-full flex items-center justify-center h-24`}
        >
          <input
            type="range"
            min="-10"
            max="10"
            name="range"
            id="range"
            className="bg-transparent rounded-2xl"
            value={range}
            onChange={handleRange}
            onTouchEnd={goBack}
            onMouseOut={goBack}
          />
          {/* <input type="range" min="-10" max="10" name="range" id="range" className="bg-transparent rounded-2xl" value={range} onTouchMove={handleRange} onTouchStart={handleRange} onChange={handleRange} onTouchEnd={goBack} onMouseOut={goBack}/> */}
        </div>
      </div>
    </>
  );
});

export default Coontrols;
