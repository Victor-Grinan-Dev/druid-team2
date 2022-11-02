import React from "react";
import { useLocation } from "react-router-dom";
import TableRow from "../TableRow";

const ProjectInfo = () => {
  const location = useLocation();
  const project = location.state;
  const services = project.services;

  return (
    <div className="infoContainer">

      <div>
        <button className="editButton"> edit </button>
        <button className="delButton">X</button>
      </div>

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
      </div>
    </div>
  );
};

export default ProjectInfo;
