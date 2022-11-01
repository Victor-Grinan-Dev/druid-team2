import React from "react";
import logo from "../assets/images/logo.jpg";

const Login = () => {
  return (
    <div className="login">
      <div className="loginLeftSide">
        <img src={logo} alt="Druid logo" className="loginLogo" />
        <h1 className="loginH1">Druid Customer Portal</h1>
        <p>
          Log in to Druid customer portal to see your projects and to find
          answers to your questions. Quas est maiores illo provident eos beatae
          dolores amet, nostrum saepe, suscipit laboriosam.
        </p>
      </div>
      <div className="loginRightSide">
        <div className="username">
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Enter username" />
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Enter password" />
        </div>
        <button className="loginButton">Log in</button>
      </div>
    </div>
  );
};

export default Login;
