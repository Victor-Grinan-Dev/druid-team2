import React from "react";

const ProjectInfo = () => {
  return (
    <div className="infoContainer">
      <div className="projectInfo">
        <h3>Project name</h3>
        <table className="table">
          <tr>
            <th>Service</th>
            <th>Engine</th>
            <th>Version</th>
            <th>PHP</th>
            <th>JS</th>
            <th>Node</th>
          </tr>
          <tr>
            <td>url1</td>
            <td>Drupal</td>
            <td>9.4</td>
            <td>8.0</td>
            <td>webpack</td>
            <td>16</td>
          </tr>
          <tr>
            <td>url2</td>
            <td>Drupal</td>
            <td>8.9</td>
            <td>7.3</td>
            <td>Gulp</td>
            <td>8</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default ProjectInfo;
