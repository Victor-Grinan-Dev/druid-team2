import events from "events";
import ajax from "./ajax";
import { useSelector } from "react-redux";
import { setUser } from "../features/druidSlice";
import { SevProject } from "../classes/sevProject";
import axios from "axios";

const emitter = new events.EventEmitter();

export const NodeForm = ({endPoint = "/node", nodeData = null}) => {
  // const [userInput, setUserInput] = useState({});
  const data = {};
  const currentUser = useSelector((state) => state.druid.user);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const node = nodeData || {
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
          value: "vittu",
          format: "plain_text",
        },
      ],
      field_customer: [
        {
          target_id: data.field_customer,
          //value:"hello"
        },
      ],
    };
    // testing
    try {
      await axios.post(
        "https://dev-ali-super-good.pantheonsite.io/node/",
        node,
        {
          withCredentials: true,
          headers: {
            "X-CSRF-Token": currentUser.token,
          },
          params: { _format: "json" },
        }
      );
      // console.log("Node created: ", node);
      emitter.emit("NODE_UPDATED");
    } catch (e) {
      alert(e);
    }
    /*
{
      const axios = await ajax();
      const response = await axios.post(endPoint, node);
      console.log("Node created: ", response.data);
      emitter.emit("NODE_UPDATED");
    } catch (e) {
      alert(e);
    }
    

*/
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
        <label>Customer</label>
        <br />
          <input
          type="text"
          onChange={(e) => handleChange(e, "field_customer")}
        ></input>
        <br />
        <label>Body</label>
        <br />
        <textarea onChange={(e) => handleChange(e, "body")}></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
