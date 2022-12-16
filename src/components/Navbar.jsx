// import Cookies from "js-cookie";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ajax from "../ajax/ajax";
import { setIsLogged, setUser } from "../features/druidSlice";

const Navbar = () => {
  const user = useSelector((state) => state.druid.user);
  const dispatch = useDispatch();

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
    //Cookies.remove("druidLog", { path: "/" });
    // dispatch(setUser({}));
    // dispatch(setIsLogged(false));
    // localStorage.removeItem("druid");
  };

  return (
    <nav>
      <ul>
        {user.current_user && (
          <li className="projectsLink">
            <Link to="/customersprojects">
              {user.current_user?.roles ? "Projects" : "My Projects"}
            </Link>
          </li>
        )}
        {user.current_user?.roles && (
          <li className="projectsLink">
            <Link to="/addproject">Add Project</Link>
          </li>
        )}
        {user.current_user?.roles && (
          <li className="projectsLink">
            <Link to="/customers">Customers</Link>
          </li>
        )}
        {user.current_user?.roles && (
          <li className="projectsLink">
            <Link to="/users">Users</Link>
          </li>
        )}

        {user.current_user?.roles && (
          <li className="projectsLink">
            <Link to="/adduser">Add User</Link>
          </li>
        )}

        {user.current_user?.roles && false && (
          <li className="projectsLink">
            <Link to="/profile">Profile</Link>
          </li>
        )}
      </ul>
      {user.current_user && (
        <li className="logoutButton">
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </li>
      )}
    </nav>
  );
};

export default Navbar;
