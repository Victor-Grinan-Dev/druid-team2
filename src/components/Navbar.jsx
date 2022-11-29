import Cookies from "js-cookie";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setIsLogged, setUser } from "../features/druidSlice";

const Navbar = () => {
  const user = useSelector((state) => state.druid.user);
  const dispatch = useDispatch();

  const logout = () => {
    Cookies.remove("druidLog", { path: "/" });
    dispatch(setUser({}));
    dispatch(setIsLogged(false));
    localStorage.removeItem("druid");
  };

  return (
    <nav>
      <ul>
        {user.username && (
          <li className="projectsLink">
            <Link to="/customersprojects">Projects</Link>
          </li>
        )}
        {user.username && (
          <li className="projectsLink">
            <Link to="/addproject">Add Project</Link>
          </li>
        )}
        {user.username && (
          <li className="projectsLink">
            <Link to="/users">Users</Link>
          </li>
        )}

        {user.username && (
          <li className="projectsLink">
            <Link to="/adduser">Add User</Link>
          </li>
        )}

        {user.username && (
          <li className="projectsLink">
            <Link to="/profile">Profile</Link>
          </li>
        )}

        {user.username && (
          <li className="projectsLink">
            <Link to="/invoices">Invoices</Link>
          </li>
        )}

        {user.username && (
          <li className="projectsLink">
            <Link to="/" onClick={logout}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
