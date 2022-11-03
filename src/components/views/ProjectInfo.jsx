import React from "react";
import { Link, useLocation } from "react-router-dom";
import TableRow from "../TableRow";
import AddProject from "./AddProject";

const ProjectInfo = () => {
  const location = useLocation();
  const project = location.state;
  const services = project.services;

  return (
    <div className="infoContainer">
      <div>{/* <button className="delButton">Delete</button> */}</div>

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
        <Link to="/addproject">
          <button className="editButton">Edit</button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectInfo;
