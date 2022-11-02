import axios from "axios";
import React, { useRef, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import logo from "../assets/images/logo.jpg";

//Auth:
import AuthContext from "../context/AuthProvider";
import { setIsLogged, setUser } from "../features/druidSlice";

const LOGIN_URL = 'http://localhost:8010/database/users'; //auth

const Login = () => {
  const dispatch = useDispatch();
  const isLogged = (state => state.druid.isLogged);
  const [errMsg, setErrMsg] = useState('');
  const userRef = useRef();
  const errRef = useRef();
  const [pwd, setPwd] = useState('');
  const [user, setUsername] = useState('');
  const { setAuth } = useContext(AuthContext);

  useEffect(()=>{
    //userRef.current.focus();
  },[]);

  useEffect(()=>{
      setErrMsg('');
  },[user, pwd]);

  const handleSubmit = async () => {
    try{
        const response = await axios.get(LOGIN_URL)
        const data = response.data;
        for(let item of data){
            if (item.username === user && item.id === pwd){
                //set
                dispatch(setIsLogged(true));
                dispatch(setUser(item));

                //reset
                setUsername('');
                setPwd('');
            }
        };

    } catch (err){
        if(!err?.response){
            setErrMsg('No server response');
        } else if (err.response?.status === 400){
            setErrMsg('Missing Username or password');
        } else if (err.response?.status === 401){
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login failed');
        }
        errRef.current.focus();
    }
}
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
      <form onStalledCapture={handleSubmit} >
      <div className="loginRightSide">
        <div className="username">
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Enter username" />
        </div>

        <div className="password">
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Enter password" onChange={(e)=>setPwd(e.target.value)} />
        </div>

        <button className="loginButton">Log in</button>
      </div>
      </form>
      
    </div>
  );
};

export default Login;
