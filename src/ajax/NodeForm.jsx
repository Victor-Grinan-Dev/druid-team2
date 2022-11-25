import events from "events";
import axios from "axios";
import { useSelector } from "react-redux";

const emitter = new events.EventEmitter();

export const NodeForm = () => {
  const data = {};
  const currentUser = useSelector(state=>state.druid.user)
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
          value: data.body,
          format: "plain_text",
        },
      ],
    };
    try {
      await axios.post(
        "https://dev-ali-super-good.pantheonsite.io/node/project",
        node,
        {
          withCredentials: true,
          headers: {
            "X-CSRF-Token": currentUser.token,
          },
          // "3YX_2uy__CvTfDND1TbKJ0zXOZz3DR6V9OdylKHYU3s"
          params: { _format: "json" },
        }
      );
      // console.log("Node created: ", node);
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
      <h4>Create Node Form</h4>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <br />
        <input type="text" onChange={(e) => handleChange(e, "title")}></input>
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
