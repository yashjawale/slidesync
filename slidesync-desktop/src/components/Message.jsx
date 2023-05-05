import React from "react";

import cross from "../assets/cross.svg";

const Message = ({ name, connected, id, handleButton }) => {
  return (
    <div className="message">
      <h3>{name}</h3>
      <button className="close" onClick={() => handleButton("cross", id)}>
        <img src={cross} alt="remove" />
      </button>
      {connected ? (
        <p>Connected</p>
      ) : (
        <div>
          <button className="accept">Accept</button>
          <button className="ignore">Ignore</button>
        </div>
      )}
      {/* <img src={cross} /> */}
    </div>
  );
};

export default Message;
