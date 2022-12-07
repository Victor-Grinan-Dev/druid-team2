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
        <label>Name</label>
        <br />
        <input type="text" onChange={(e) => handleChange(e, "name")}></input>
        <br />
        <label>Email</label>
        <br />
        <input type="text" onChange={(e) => handleChange(e, "mail")}></input>
        <br />
        <label>Password</label>
        <br />
        <input type="text" onChange={(e) => handleChange(e, "pass")}></input>
        <br />
        <label>Confirm Password</label>
        <br />
        <input type="text" onChange={()=>console.log("Hello")}></input>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
