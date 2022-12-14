import React from "react";
import { useSelector } from "react-redux";
import logo from "../assets/images/logo.jpg";
import Login from "./Login";
import ajax from "../ajax/ajax";
import axios from "axios";

const Home = () => {
  const isLogged = useSelector((state) => state.druid.isLogged);
  
  return (
    <div className="home">
      {!isLogged && <Login />}

      {isLogged && (
        <div>
          <div className="welcomeContainer">
            <img src={logo} alt="Druid logo" className="logo2" />
            <h1 className="welcomeH1">Welcome to Druid Customer Portal!</h1>
          </div>
          <p className="homeText">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur quae nam aut ab esse eveniet magni commodi ut quam
            architecto? Quibusdam alias sit id. Vitae officia quam suscipit
            inventore cum!
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
