import React from "react";
import events from "events";
import ajax from "./ajax";
import ProjectCard from "../components/views/projectCard/ProjectCard";
import { ProjectForm } from "./ProjectForm";

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
    try {
      const axios = await ajax();
      const response = await axios.get("/node/osproject2");
      console.log("projects:", response.data)
      if (response.data) {
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
