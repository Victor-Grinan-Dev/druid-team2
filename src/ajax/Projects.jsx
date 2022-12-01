import React from "react";
import events from "events";
import ajax from "./ajax";
import { Link } from "react-router-dom";
import { capitalStart } from "../functions/capitalStart";
import ProjectCard from "../components/views/projectCard/ProjectCard";

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
      const response = await axios.get("/node/osproject"); // wait for the POST AJAX request to complete
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
      <>
        {this.state.projects.map((project, index) => {
          // iterate over the nodes array and map them to "li" elements
          console.log(project);
          return (
            <ProjectCard
              key={index}
              nid={project.nid[0].value}
              project={project}
            />
          );
        })}
      </>
    );
  }
}
