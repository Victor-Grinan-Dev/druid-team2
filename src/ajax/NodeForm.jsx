import events from "events";
import { useSelector } from "react-redux";
import axios from "axios";

const emitter = new events.EventEmitter();

export const NodeForm = ({ endPoint = "/node", nodeData = null }) => {
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
    <div>
      <form className="createProjectForm" onSubmit={handleSubmit}>
        <div>
          <label className="createProjectLabels">Project name</label>
          <input
            className="createProjectInputs"
            type="text"
            onChange={(e) => handleChange(e, "title")}
          />
        </div>
        <div>
          <label className="createProjectLabels">Customer</label>
          <select
            className="createProjectInputs"
            name="customerSelect"
            id="customerSelect"
          >
            <option value="customer">Customer</option>
          </select>
        </div>
        <button type="submit" className="createProjectButton">
          Create project
        </button>
      </form>
    </div>
  );
};
