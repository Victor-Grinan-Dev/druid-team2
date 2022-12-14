import React from "react";
import { useSelector } from "react-redux";

import { Link, useLocation } from "react-router-dom";
//import TableRow from "./TableRow";

import ProjectCard from "./projectCard/ProjectCard";

const ProjectInfo = () => {
  const location = useLocation();
  const project = location.state;
  const services = project.services;
  const user = useSelector((state) => state.druid.user);

  return (
    <ProjectCard project={project} full={true}/>
  );
};

export default ProjectInfo;

/*
<div className="projectInfo">
        <h3>Project name: {project.name}</h3>
        <table className="table">
          <thead className="tableHead">
            <tr>
              <th>Service</th>
              <th>Engine</th>
              <th>Version</th>
              <th>PHP</th>
              <th>JS</th>
              <th>Node</th>
              <th>Drush</th>
              <th>Omen</th>
              <th>DBS</th>
              <th>Mails</th>
              <th>Search</th>
              <th>CDN</th>
              <th>Infra</th>
              <th>Docker</th>
              <th>Hosting</th>
              <th>Deps</th>
              <th>CI</th>
              <th>dev & main</th>
            </tr>
          </thead>
          <tbody className="tableBody">
            {services.map((service, i) => (
              <TableRow key={i} service={service} />
            ))}
          </tbody>
        </table>
        {user.userType === "pm" && (
          <Link to="/addproject">
            <button className="editButton">Edit</button>
          </Link>
        )}
      </div>
*/
