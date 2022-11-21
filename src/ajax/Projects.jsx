import React from "react";
import events from "events";
import ajax from "./ajax";
import { Link } from "react-router-dom";

const emitter = new events.EventEmitter();

export class Projects extends React.Component {
  constructor() {
    super();
    this.state = { projects: [] };
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
      const response = await axios.get("/node/project"); // wait for the POST AJAX request to complete
      console.log(response.data);
      if (response.data) {
        // setState will trigger repaint
        //console.log(response.data);
        this.setState({ projects: response.data });
      }
    } catch (e) {
      alert(e);
    }
  }

  render() {
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
          {this.state.projects.map((project, index) => {
            // iterate over the nodes array and map them to "li" elements
            return (
              <tr key={index}>
                <td>
                  <p
                    href={project}
                    style={{
                      color: "white",
                      marginRigth: "50px",
                      textAlign: "center",
                    }}
                  >
                    {project.uuid[0].value}
                  </p>
                </td>
                <td
                  style={{
                    color: "white",
                    marginRigth: "50px",
                    textAlign: "center",
                  }}
                >
                  {project.nid[0].value}
                </td>
                <td>
                  <Link to={`${project.uuid[0].value}`} state={project}>
                    <button className="infoButton">See More</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
