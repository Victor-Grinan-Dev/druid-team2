import React from "react";
import { Link } from "react-router-dom";

import { capitalStart } from "../../functions/capitalStart";

const ProjectBox = ({ project }) => {
  return (
    <div className="projectBox">
      <p>{capitalStart(project.name)} App -{project.client} Oy</p>
      <Link to={`/projectinfo/${project.name}`} state={project}>
        <button className="infoButton">More info</button>
      </Link>
    </div>
  );
};

export default ProjectBox;
