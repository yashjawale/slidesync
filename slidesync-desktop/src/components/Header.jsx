import React from "react";

import logo from "../assets/slidesync.svg";

const Header = () => {
  return (
    <div className="header-container">
      <img src={logo} alt="SlideSync Logo" />
      <h1 style={{ fontFamily: "Sora, sans-serif" }}>SlideSync</h1>
    </div>
  );
};

export default Header;
