import React from "react";
import { NodeForm } from "../../ajax/NodeForm";
import { NodeList } from "../../ajax/NodeList";

const Invoices = () => {
  return (
    <div>
      Invoices
      <div>
        <NodeList />
      </div>
      <NodeForm />
    </div>
  );
};

export default Invoices;
