import React from "react";
import Navbar from "./Navbar";
import image from "../assets/images/druid.jpg";
import { capitalStart } from "../functions/capitalStart";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ajax from "../ajax/ajax";
import { setIsLogged, setUser } from "../features/druidSlice";
import { useState } from "react";

const Header = () => {
  const user = useSelector(state => state.druid?.user?.current_user?.name)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(false);

  const logout = async () => {
    const axios = await ajax();
    try {
      await axios
        .post(`/user/logout?token=${user?.logout_token}`)
        .then((res) => console.log("response", res));
      dispatch(setUser({}));
      dispatch(setIsLogged(false));
      window.sessionStorage.removeItem("druidLog");
    } catch (err) {
      console.log(`Logout failed. Error: ${err}`);
      dispatch(setUser({}));
      dispatch(setIsLogged(false));
      window.sessionStorage.removeItem("druidLog");
    }
  };

  return (
    <header className="header">
      <div className="flexCorners">
      <Link to="/"><img src={image} alt="Druid logo" className="logo" /></Link>
      <div>
          { user && <div className="circleWrapper">
            <div className="profileImage" onClick={()=> setExpand(!expand)}>
                {user && <h1>{ capitalStart(user) }</h1>}
            </div>
          </div>}
          {
            (user && expand && false) && <Link to="/"><button onClick={logout}>Logout</button></Link>
          }
      </div>
      </div>
      <div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
