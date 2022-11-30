import React from "react";
import events from "events";
//import axios from "axios";
import ajax from "../../ajax/ajax";
import { Project } from "../../classes/project";

const emitter = new events.EventEmitter();
const AddProjectView = () => {
  const data = {};
  //const data = new Project(undefined, null, null);
  const node = {
    type: [
      {
        target_id: "project",
        target_type: "node_type",
      },
    ],

    title: [
      {
        value: data.title,
      },
    ],
    field_customer: [
      {
        target_id: 120,
        target_type: "entity_reference", // not necessarily needed
      },
    ],
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(data);

    try {
      const axios = await ajax();
      const response = await axios.post("/node", node);
      console.log("Node created: ", response.data);
      emitter.emit("NODE_UPDATED");
    } catch (e) {
      alert(e);
    }
  };

  const handleChange = (e) => {
    data[e.target.name] = e.target.value;
  };

  return (
    <div className="create-node-form">
      <h4>Create Node Form</h4>
      <form onSubmit={handleSubmit}>
        <label>Project Name</label>
        <br />
        <input
          type="text"
          name="title"
          onChange={(e) => handleChange(e)}
        ></input>
        <br />

        <label>Customer</label>
        <br />
        <input
          type="text"
          name="field_customer"
          onChange={(e) => handleChange(e)}
        ></input>
        <br />

        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProjectView;
