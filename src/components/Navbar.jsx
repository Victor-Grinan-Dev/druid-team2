import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector(state => state.druid.user)
  return (
    <nav>
      <ul>
        <li className="homeLink">
          <Link to="/">Home</Link>
        </li>
        <li className="projectsLink">
          <Link to="customersprojects">Projects</Link>
        </li>
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
      </ul>
    </nav>
  );
};

export default Navbar;
