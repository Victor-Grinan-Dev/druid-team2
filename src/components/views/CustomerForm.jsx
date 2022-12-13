import events from "events";
import ajax from "../../ajax/ajax";

const emitter = new events.EventEmitter();

export const CustomerForm = () => {
  const data = {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const node = {
      type: [
        {
          target_id: "customer",
          target_type: "node_type",
        },
      ],
      title: [
        {
          value: data.companyName,
        },
      ],
    };
    try {
      const axios = await ajax();
      const response = await axios.post("/node", node);
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
      <br />
      <form onSubmit={handleSubmit}>
        <label>Company Name:</label>
        <br />
        <input type="text" onChange={(e) => handleChange(e, "companyName")} ></input>
        <br />

        <br />
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
