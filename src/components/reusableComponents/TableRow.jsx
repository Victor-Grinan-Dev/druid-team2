import React from "react";

const TableRow = ({ service }) => {
  return (
    <tr>
      <td>{service.service}</td>
      <td>{service.engine}</td>
      <td>{service.version}</td>
      <td>{service.php}</td>
      <td>{service.js}</td>
      <td>{service.node}</td>
      <td>{service.drush}</td>
      <td>{service.omen}</td>
      <td>{service.dbs}</td>
      <td>{service.mails}</td>
      <td>{service.search}</td>
      <td>{service.cdn}</td>
      <td>{service.infra}</td>
      <td>{service.docker}</td>
      <td>{service.hosting}</td>
      <td>{service.deps}</td>
      <td>{service.ci}</td>
      <td>{service.dev_n_main}</td>
    </tr>
  );
};

export default TableRow;
