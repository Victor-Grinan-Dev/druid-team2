//import { postUser } from "../../services/druid";

import events from "events";
import ajax from "../../ajax/ajax";
import { useEffect } from "react";
import { useState } from "react";
import { ajaxGet } from "../../ajax/services";

const emitter = new events.EventEmitter();

const AddUser = () => {
  const [expand, setExpand] = useState(false);
  const [customers, setCustomers] = useState();
  const [data, setData] = useState({ status: [{ value: true }] });

  useEffect(() => {
    getCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const axios = await ajax();
      const response = await axios.post("/entity/user", data);
      console.log("Node created: ", response.data);
      emitter.emit("NODE_UPDATED");
    } catch (e) {
      alert(e);
    }
    setData({ status: [{ value: true }] });
  };

  const handleChange = (e, propName) => {
    if (propName === "field_company" || propName === "roles") {
      setData({ ...data, [propName]: [{ target_id: e.target.value }] });
    } else {
      setData({ ...data, [propName]: [{ value: e.target.value }] });
    }

    if (propName === "roles") {
      if (e.target.value === "customer_user") {
        setExpand(true);
      } else {
        setExpand(false);
      }
    }
  };

  const getCustomers = () => {
    ajaxGet("/node/customers").then((res) => {
      setCustomers(res);
    });
  };

  return (
    <div>
      <h3 className="addUserH3">Create new user</h3>
      <form onSubmit={handleSubmit}>
        <div className="createUserContainer">
          <div>
            <label className="createUserLabels"> Username: </label>
            <input
              type="text"
              onChange={(e) => handleChange(e, "name")}
              className="createUserInputs"
            ></input>
          </div>
          <div>
            <label htmlFor="email" className="createUserLabels">
              {" "}
              Email:{" "}
            </label>
            <input
              type="text"
              onChange={(e) => handleChange(e, "mail")}
              className="createUserInputs"
            />
          </div>
          <div>
            <label className="createUserLabels">Password:</label>

            <input
              type="text"
              onChange={(e) => handleChange(e, "pass")}
              className="createUserInputs"
            />
          </div>
          <div>
            <label htmlFor="customer" className="createUserLabels">
              {" "}
              User type:{" "}
            </label>
            <select
              onChange={(e) => handleChange(e, "roles")}
              className="createUserInputs"
            >
              <option value="" hidden>
                Choose...
              </option>
              <option value="developer">Developer</option>
              <option value="customer_user">Customer user</option>
            </select>
          </div>

          {expand && (
            <div>
              <label htmlFor="company" className="createUserLabels">
                Company:
              </label>
              <select
                onChange={(e) => handleChange(e, "field_company")}
                className="createUserInputs"
              >
                <option value="" hidden>
                  Choose...
                </option>
                {customers &&
                  customers.map((c, i) => (
                    <option key={i} value={parseInt(c.nid[0].value, 10)}>
                      {c.title[0].value} - {c.nid[0].value}
                    </option>
                  ))}
              </select>
            </div>
          )}
          <input
            type="submit"
            value="Create user"
            className="createUserButton"
          />
        </div>
      </form>
    </div>
  );
};

export default AddUser;
