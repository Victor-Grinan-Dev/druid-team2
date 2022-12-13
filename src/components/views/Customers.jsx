import React from "react";
import events from "events";
import ajax from "../../ajax/ajax";
import { CustomerForm } from "./CustomerForm";
import CustomerCard from "./CustomerCard";

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
      console.log("customers:", response.data);
      if (response.data) {
        this.setState({ customers: response.data });
      }
    } catch (e) {
      alert(e);
    }
  }

  render() {
    return (
      <div className="addProject centerText">
        <CustomerForm />
          {this.state.customers.map((customer, index) => {
            return (
              <CustomerCard key={index} data={customer.title[0].value}/>
            );
          })}
      </div>     
    );
  }
}
