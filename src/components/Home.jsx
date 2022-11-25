import React from "react";
import { useSelector } from "react-redux";
import logo from "../assets/images/logo.jpg";
import Login from "./Login";
import ajax from "../ajax/ajax";

const Home = () => {
  const isLogged = useSelector((state) => state.druid.isLogged);
  const amIloggedIn = async () => {
    try {
      const axios = await ajax();
      const response = await axios.get("user/login_status?");
      console.log(response);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };
  return (
    <div className="home">
      {!isLogged && <Login imI={amIloggedIn}/>}

      {isLogged && (
        <div>
          <div className="welcomeContainer">
            <img src={logo} alt="Druid logo" className="logo2" />
            <h1 className="welcomeH1">Welcome to Druid Customer Portal!</h1>
          </div>
          <button onClick={amIloggedIn}>This is BUTTON</button>
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
