import events from "events";
//import axios from "axios";
import ajax from "./ajax"; 
import { useSelector } from "react-redux";
import { SevProject } from "../classes/sevProject";

const emitter = new events.EventEmitter();

export const NodeForm = () => {
  const data = {};
  const currentUser = useSelector(state=>state.druid.user)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Hello")
    const newProj = new SevProject()
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
      status:[
        {
          value:false,
        }
      ]
      /*
            field_customer:[
        {
          value: data.field_customer,
          format: "plain_text",
        },
      ],
      */
      /*
      field_customer_contact:[
        {
          value: "look at me!",
        },
      ],
      field_enddate:[
        {
          value: "look at me!",
        },
      ],
      field_services:[
        {
          value: "look at me!",
        },
      ],
      field_user:[
        {
          value: "look at me!",
        },
      ],
       */
    };
    try {
      const axios = await ajax();
      const response = await axios.post("/node", node);
      console.log("Node created: ", response.data);
      emitter.emit("NODE_UPDATED");
    } catch (e) {
      alert(e);
    }

    /*
    {
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

*/
    
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
        {/* <label>field_customer</label>
        <br />
        <input type="text" onChange={(e) => handleChange(e, "field_customer")}></input>
        <br /> */}
        <label>Body</label>
        <br />
        <textarea onChange={(e) => handleChange(e, "body")}></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

