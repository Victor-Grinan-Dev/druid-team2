import events from "events";
import { useState, useEffect } from "react";
import ajax from "./ajax";

const emitter = new events.EventEmitter();

export const ProjectForm = () => {
    const [customers, setCustomers] = useState()
  const data = {};

    useEffect(() => {
        getCustomers()
    }, []);

  const getCustomers = async () => {
    try {

      const axios = await ajax();
      const response = await axios.get("/node/customers");
        console.log(response.data)
      if (response.data) {
        setCustomers(response.data)

      }
    } catch (e) {
      alert(e);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
        body: [
          {
            value: "hello",
            format: "plain_text",
          },
        ],
        field_customer: [
          {
            target_id: data.customerId,
          },
        ],
        
      };
    // testing
    console.log(node)
    try {
      const axios = await ajax();
      const response = await axios.post('/node', node);
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
        <label>Title</label>
        <br />
        <input type="text" onChange={(e) => handleChange(e, "title")}></input>
        <br />
        <select onChange={(e) => handleChange(e, "customerId")}>
            <option value="" hiden>Choose...</option>
            { customers &&
                customers.map((c, i) => (
                    <option key={i} value={c.nid[0].value} >{c.title[0].value} {c.nid[0].value}</option>
                ))
            }
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
