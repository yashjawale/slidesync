import React from "react";
import QRCode from "react-qr-code";

const QRDisplay = ({ value }) => {
  if (value !== "") {
    return (
      <>
        <div className="qr-image-container">
          <QRCode value={value} />
        </div>
        <p id="code">{value}</p>
      </>
    );
  } else {
    return <h2>Waiting for response...</h2>;
  }
};

export default QRDisplay;
