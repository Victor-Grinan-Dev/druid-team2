import React from "react";
import events from "events";
import ajax from "./ajax";
import { Link } from "react-router-dom";

const emitter = new events.EventEmitter();

// component to show a list of nodes
export class NodeList extends React.Component {
  constructor() {
    super();
    this.state = {
      nodes: [],
    };
    this.refresh = this.refresh.bind(this);
  }

  UNSAFE_componentWillMount() {
    emitter.addListener("NODE_UPDATED", this.refresh);
  }

  componentWillUnmount() {
    emitter.addListener("NODE_UPDATED", this.refresh);
  }

  async componentDidMount() {
    await this.refresh();
  }

  async refresh() {
    // AJAX fetch server/node/rest?_format=json and setState with the response data
    try {
      const axios = await ajax(); // wait for an initialized axios object
      const response = await axios.get("/node/invoices"); // wait for the POST AJAX request to complete
      console.log(response.data);
      if (response.data) {
        // setState will trigger repaint
        //console.log(response.data);
        this.setState({ nodes: response.data });
      }
    } catch (e) {
      alert(e);
    }
  }

  render() {
    const deleteNode = async (nid) => {
      try {
        const axios = await ajax(); // wait for an initialized axios object
        const response = await axios.delete(`/node/${nid}`); // wait for the DELETE AJAX request to complete
        console.log("Node deleted", response);
        emitter.emit("NODE_UPDATED");
      } catch (e) {
        alert(e);
      }
    };

    return (

      <table>
        <thead>
          <tr>
            <td>guid</td>
            <td>Content ID</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {this.state.nodes.map(
            (node, index) =>
              node.type[0].target_id === "invoices" && (
                <tr key={index}>
                  <td>
                    <p
                      href={node}
                      style={{
                        color: "white",
                        marginRigth: "50px",
                        textAlign: "center",
                      }}
                    >
                      {node.uuid[0].value}
                    </p>
                  </td>
                  <td
                    style={{
                      color: "white",
                      marginRigth: "50px",
                      textAlign: "center",
                    }}
                  >
                    {/* node.nid[0].value */}
                  </td>
                  <td>
                    <Link to={`${node.uuid[0].value}`} state={node}>
                      <button className="infoButton">See More</button>
                      <button onClick={deleteNode}>delete</button>
                    </Link>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>

    );
  }
}
