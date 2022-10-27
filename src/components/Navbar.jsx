import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li className="homeLink">
          <Link to="/">Home</Link>
        </li>
        <li className="projectsLink">
          <Link to="customersprojects">Projects</Link>
        </li>
      </ul>
      {/* comment */}
    </nav>
  );
};

export default Navbar;
