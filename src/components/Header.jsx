import React from "react";
import Navbar from "./Navbar";
import image from "../assets/images/druid.jpg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <Link to="/"><img src={image} alt="Druid logo" className="logo" /></Link>
      <div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
