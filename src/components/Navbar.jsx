import Cookies from "js-cookie";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setIsLogged, setUser } from "../features/druidSlice";

const Navbar = () => {
  const user = useSelector(state => state.druid.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const logout = () => {
     Cookies.remove("druidLog", { path: '/' });
     dispatch(setUser({}));
     dispatch(setIsLogged(false));
     dispatch()
  }

  return (
    <nav>
      <ul>
        {/*
          <li className="homeLink">
            <Link to="/">Home</Link>
          </li>
        */}
        {
          user.username && <li className="projectsLink">
              <Link to="customersprojects">Projects</Link>
            </li>
        }
        {
          user.userType === "pm" && <li className="projectsLink">
            <Link to="addproject">Add Project</Link>
          </li>
        }
        {
          user.userType === "pm" &&<li className="projectsLink">
            <Link to="adduser">Add User</Link>
          </li>
        }

        {
          user.username &&<li className="projectsLink">
            <Link to="/" onClick={logout}>Logout</Link>
          </li>
        }
        
      </ul>
    </nav>
  );
};

export default Navbar;
