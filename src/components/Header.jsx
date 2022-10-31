import React from "react";
import Navbar from "./Navbar";
import image from "../assets/images/druid.jpg";

const Header = () => {
  return (
    <header className="header">
      <img src={image} alt="Druid logo" className="logo" />
      <div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
