import React, { useState } from "react";
import events from "events";

//ajax
import ajax from "../../ajax/ajax";
import { capitalStart } from "../../functions/capitalStart";
import { useSelector } from "react-redux";

//functions
//import { capitalStart } from "../../functions/capitalStart";

const emitter = new events.EventEmitter();

const AddProject = () => {
  const customers = useSelector(state => state.druid.customers);
  const users = useSelector(state => state.druid.users);
  const developers = users.filter((u) => {
    return u.roles[0].target_id === "developer";
  });
  const customer_users = users.filter((u) => {
    return u.roles[0].target_id === "customer_user";
  });
  const [expand, setExpand] = useState(false);
  const [data, setData] = useState({
    type: [
      {
        target_id: "project",
        target_type: "node_type",
      },
    ],
    field_customer_conctact: [
      {
        target_id: "",
      },
    ],
    field_customers: [
      {
        target_id: "",
      },
    ],
  });

  const servicesKey = [
    "field_cms",
    "field_engine",
    "field_language",
    "field_framework",
    "field_libraries",
    "field_database",
    "field_mailing",
    "field_search",
    "field_cdn",
    "field_infra",
    "field_docker",
    "field_hosting",
    "field_deps",
    "field_ci_cd",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    try {
      const axios = await ajax();
      const response = await axios.post("/node", data);
      console.log("Node created: ", response.data);
      emitter.emit("NODE_UPDATED");
    } catch (e) {
      alert(e);
    }
  };

  const handleChange = (e, propName) => {
    if (
      propName === "field_customers" ||
      propName === "field_customer_conctact" ||
      propName === "field_developers"
    ) {
      setData({ ...data, [propName]: [{ target_id: e.target.value }] });
    } else {
      setData({ ...data, [propName]: [{ value: e.target.value }] });
    }
  };

  return (
    <div className="centerText">
      <h3 className="addProjectH3">Create new project</h3>
      <form onSubmit={handleSubmit} className="createProjectForm">
        <div>
          <label className="createProjectLabels">Project name:</label>

          <input
            type="text"
            onChange={(e) => handleChange(e, "title")}
            className="createProjectInputs"
          ></input>
        </div>

        <div>
          <label className="createProjectLabels">Customer:</label>

          <select
            onChange={(e) => handleChange(e, "field_customers")}
            className="createProjectInputs"
          >
            <option value="" hidden>
              Choose...
            </option>
            {customers &&
              customers.map((c, i) => (
                <option key={i} value={c.nid[0].value}>
                  {c.title[0].value}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="createProjectLabels">Customer contact:</label>

          <select
            onChange={(e) => handleChange(e, "field_customer_conctact")}
            className="createProjectInputs"
          >
            <option value="" hidden>
              Choose...
            </option>
            {customer_users &&
              customer_users
                .filter((u) => {
                  return (
                    u.field_company[0].target_id ===
                    parseInt(data.field_customers[0].target_id, 10)
                  );
                })
                .map((u, i) => {
                  return (
                    <option key={i} value={u.uid[0].value}>
                      {u.name[0].value}{" "}
                    </option>
                  );
                })}
          </select>
        </div>

        <div>
          <label className="createProjectLabels">Developer:</label>

          <select
            onChange={(e) => handleChange(e, "field_developers")}
            className="createProjectInputs"
          >
            <option value="" hidden>
              Choose...
            </option>
            {developers &&
              developers.map((u, i) => {
                return (
                  <option key={i} value={u.uid[0].value}>
                    {u.name[0].value}{" "}
                  </option>
                );
              })}
          </select>
        </div>

        <p
          onClick={() => setExpand(!expand)}
          className="addServicesButton centerText"
        >
          {expand ? "Hide services" : "Add services"}{" "}
        </p>
        {expand && (
          <div className="addProjectServices">
            {servicesKey.map((s, i) => (
              <div key={i} className="addProjectServicesFields">
                <label>
                  {" "}
                  {capitalStart(
                    s === "field_ci_cd" ? s.split("_")[1] : s.split("_")[1]
                  )}
                  :{" "}
                </label>
                <input type="text" onChange={(e) => handleChange(e, s)} />
              </div>
            ))}
          </div>
        )}
        <div className="createProjectButtonDiv">
          <button type="submit" className="createProjectButton">
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
