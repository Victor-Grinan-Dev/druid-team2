import { useDispatch, useSelector } from "react-redux";
import { setCreateUser } from "../../features/druidSlice";
//import { postUser } from "../../services/druid";

import events from "events";
import ajax from "../../ajax/ajax";

const emitter = new events.EventEmitter();
//import { UserForm } from "./UserForm";

const AddUser = () => {

  const data = {};
  const handleSubmit = async (e) => {
    e.preventDefault();

    const node = {
        "name": { "value": data.name },
        "mail": { "value": data.mail },
        "pass": { "value": data.pass },
        "status": { "value": true },
        "roles": {"value": data.roles},//'customer_user' 'developer'
      };
   console.log(node);
    try {
      const axios = await ajax();
      const response = await axios.post("/entity/user", node);
      console.log("Node created: ", response.data);
      emitter.emit("NODE_UPDATED");
    } catch (e) {
      alert(e);
    }
  };
  const handleChange = (e, propName) => {
    data[propName] = e.target.value;
  };
  return (
    <div>
      <h3 className="addUserH3">Create new user</h3>
      <form onSubmit={handleSubmit}>
        <div className="createUserContainer">
          <div>
          <label className="createUserLabels">
              {" "}
              Username:{" "}
            </label>
            <input type="text" onChange={(e) => handleChange(e, "name")} className="createUserInputs"></input>
          </div>
          <div>
            <label htmlFor="email" className="createUserLabels">
              {" "}
              Email:{" "}
            </label>
            <input type="text" onChange={(e) => handleChange(e, "mail")} className="createUserInputs" />
          </div>
            <div>
            <label className="createUserLabels">Password</label>
  
        <input type="text" onChange={(e) => handleChange(e, "pass")} className="createUserInputs"/>
            </div>
          <div>
            <label htmlFor="customer" className="createUserLabels">
              {" "}
              User type:{" "}
            </label>
            <select onChange={(e) => handleChange(e, "roles")} className="createUserInputs">
          <option value="" hidden>Choose...</option>
          <option value="developer" >Developer</option>
          <option value="customer_user" >Customer user</option>
        </select>
          </div>

          {/*
          data.roles === "customer_user" && (
            <div>
              <label htmlFor="company" className="createUserLabels">
                {" "}
                Company:{" "}
              </label>
              <input
                type="text"
                name="company"
                id="company"
                className="createUserInputs"
                onChange={handleChange(e, "company")}
              />
            </div>
          )
          */}
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
