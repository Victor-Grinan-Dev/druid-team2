import React from "react";
import events from "events";
import ajax from "./ajax";
import ProjectCard from "../components/views/projectCard/ProjectCard";

const emitter = new events.EventEmitter();

export class Customers extends React.Component {
  constructor() {
    super();
    this.state = { customers: [] };
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
      const response = await axios.get("/node/customers");

      if (response.data) {
        this.setState({ customers: response.data });
      }
    } catch (e) {
      alert(e);
    }
  }

  render() {
    return (
      <>
        {this.state.customers.map((customer, index) => {
          console.log(customer)
          return (
            <projectCard
              key={index}
              nid={index}
              customer={customer}
            />
          );
        })}
      </>
    );
  }
}
