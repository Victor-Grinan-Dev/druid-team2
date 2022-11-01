import React from "react";

const ProjectInfo = () => {
  return (
    <div className="infoContainer">
      <div className="projectInfo">
        <h3>Project name</h3>
        <table className="table">
          <thead>
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
          <tbody>
            <tr>
              <td>url1</td>
              <td>Drupal</td>
              <td>9.4</td>
              <td>8.0</td>
              <td>16</td>
              <td>webpack</td>
              <td>Mailjet</td>
              <td>Solr 8</td>
              <td>11</td>
              <td>x</td>
              <td>MariaDB 10.5</td>
              <td>CloudFront</td>
              <td>-</td>
              <td>uselagoon</td>
              <td>Lagoon</td>
              <td>Renovate</td>
              <td>GHA</td>
              <td>x</td>
            </tr>
            <tr>
              <td>url2</td>
              <td>Drupal</td>
              <td>8.9</td>
              <td>7.3</td>
              <td>8</td>
              <td>x</td>
              <td>x</td>
              <td>x</td>
              <td>x</td>
              <td>x</td>
              <td>x</td>
              <td>x</td>
              <td>x</td>
              <td>x</td>
              <td>x</td>
              <td>x</td>
              <td>x</td>
              <td>x</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectInfo;
