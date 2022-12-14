import React from "react";
import Navbar from "./Navbar";
import image from "../assets/images/druid.jpg";
import { capitalStart } from "../functions/capitalStart";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector(state => state.druid?.user?.current_user?.name)
  
  
  return (
    <header className="header">
      <div className="flexCorners">
      <Link to="/"><img src={image} alt="Druid logo" className="logo" /></Link>
      <div className="circleWrapper">
            <div className="profileImage">
                {user && <h1>{ capitalStart(user) }</h1>}
            </div>
          </div>
      </div>
      
      <div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
