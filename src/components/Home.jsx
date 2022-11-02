import React from "react";
import logo from "../assets/images/logo.jpg";
import Login from "./Login";

const Home = () => {
  return (
    <div className="home">
       <Login/>
    </div>
  );
};

export default Home;

/*
      <div className="welcomeContainer">
        <img src={logo} alt="Druid logo" className="logo2" />
        <h1 className="welcomeH1">Welcome to Druid Customer Portal!</h1>
      </div>
      <p className="homeText">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
        quae nam aut ab esse eveniet magni commodi ut quam architecto? Quibusdam
        alias sit id. Vitae officia quam suscipit inventore cum!
      </p>
*/