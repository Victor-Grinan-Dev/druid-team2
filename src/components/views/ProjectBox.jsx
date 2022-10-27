import React from "react";
import { Link } from "react-router-dom";

const ProjectBox = () => {
  return (
    <div className="projectBox">
      <p>Project name</p>
      <Link to="/projectinfo">
        <button className="infoButton">More info</button>
      </Link>
    </div>
  );
};

export default ProjectBox;
