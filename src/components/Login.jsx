import React, { useRef, useEffect, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import logo from "../assets/images/logo.jpg";
import config from "../ajax/config";

//Auth:
import AuthContext from "../context/AuthProvider";
import { setIsLogged, setUser } from "../features/druidSlice";
import ajax from "../ajax/ajax";

const Login = ({ imI }) => {
  const dispatch = useDispatch();

  const [errMsg, setErrMsg] = useState("");
  const userRef = useRef();
  const errRef = useRef();

  const [pwd, setPwd] = useState("");
  const [user, setUsername] = useState("");
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const axios = await ajax();
      axios
        .post(`${config.drupal_url}/user/login?_format=json`, {
          name: user,
          pass: pwd,
        })
        .then((res) => {
          sessionStorage.setItem("druidLog", JSON.stringify(res.data));
          setAuth(true);
          dispatch(setIsLogged(true));
          dispatch(setUser(res.data));
          console.log(res);
        });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
      console.log(err);
      errRef.current.focus();
    }
  };
  return (
    <div className="login">
      <div className="loginLeftSide">
        <img src={logo} alt="Druid logo" className="loginLogo" />
        <h1 className="loginH1">Druid Customer Portal</h1>
        <p>
          Log in to Druid customer portal to see your projects and to find
          answers to your questions.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="loginRightSide">
          <div className="username">
            <label htmlFor="username">Username</label>
            <input
              ref={userRef}
              type="text"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPwd(e.target.value)}
            />
          </div>

          <button className="loginButton">Log in</button>
        </div>
        <div ref={errRef}>{errMsg}</div>
      </form>
    </div>
  );
};

export default Login;
