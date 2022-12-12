import React from "react";
import events from "events";
import ajax from "./ajax";
import { UserForm } from "./UserForm";

const emitter = new events.EventEmitter();

export class People extends React.Component {
  constructor() {
    super();
    this.state = { person: [] };
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
      const response = await axios.get("/admin/people/users");
      if (response.data) {
        this.setState({ person: response.data });
        console.log("users:", response.data)
      }
    } catch (e) {
      alert(e);
    }
  }

  render() {
        return (
       
        <div>
        <div>
        <ul>
        {
          this.state.person.map((p, index) => {
            return (
            <li key={index}>{p.name[0].value}</li>
          );
        })
        }
      </ul>
        </div>
      <div>
      <UserForm/>
      </div>
        </div>
       
    );
    
  }
}
