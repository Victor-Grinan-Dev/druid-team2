import events from "events";
import ajax from "./ajax";
import { useSelector } from "react-redux";


const emitter = new events.EventEmitter();

export const UserForm = () => {
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
    <div className="create-node-form">
      <form onSubmit={handleSubmit}>
        <label className="createUserLabels">Name</label>
        <br />
        <input type="text" onChange={(e) => handleChange(e, "name")} className="createUserInputs"></input>
        <br />
        <label>Email</label>
        <br />
        <input type="text" onChange={(e) => handleChange(e, "mail")} className="createUserLabels" />
        <br />
        <label>Password</label>
        <br />
        <input type="text" onChange={(e) => handleChange(e, "pass")} className="createUserLabels"/>
        <br />
        <label>Role</label>
        <br />
        <select onChange={(e) => handleChange(e, "roles")} className="createUserInputs">
          <option value="" hidden>Choose...</option>
          <option value="developer" >Developer</option>
          <option value="customer_user" >User</option>
        </select>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
