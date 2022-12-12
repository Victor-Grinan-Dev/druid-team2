import React, { useEffect, useState } from "react";
import events from "events";

//ajax
import ajax from "../../ajax/ajax";

//functions
import { capitalStart } from "../../functions/capitalStart";

const emitter = new events.EventEmitter();
const AddProject = () => {
  
  const [customers, setCustomers] = useState();
  const [developers, setDevelopers] = useState();
  const [users, setUsers] = useState();
  const data = {};

  useEffect(() => {
    getCustomers();
    getUsers();
  }, []);

  const getCustomers = async () => {
    try {

      const axios = await ajax();
      const response = await axios.get("/node/customers");
        //console.log(response.data)
      if (response.data) {
        setCustomers(response.data)
      }
    } catch (e) {
      alert(e);
    }
  }

  const getUsers = async () => {
    try {

      const axios = await ajax();
      const response = await axios.get("/admin/people/users");
        //console.log(response.data)
      if (response.data) {
        
        setUsers(response.data)
      }
    } catch (e) {
      alert(e);
    }
  };

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
        field_customers: [
          {
            target_id: data.customerId,
          },
        ],
        field_customer_conctact: [
          {
            target_id: data.customer_userId
          }
        ]
      };
      
 
    console.log(node)
    try {
      const axios = await ajax();
      const response = await axios.post('/node', node);
      console.log("Node created: ", response.data);
      emitter.emit("NODE_UPDATED");
    } catch (e) {
      alert(e);
    }
  };

  const handleChange = (e, propName) => {
    data[propName] = e.target.value;
  };
  
  return (
    <div className="addProject">
      <h3>Create new project</h3>
      <form onSubmit={handleSubmit} className="createProjectForm">
        <label className="createProjectLabels">Project name</label>
   
        <input type="text" onChange={(e) => handleChange(e, "title")} className="createProjectInputs"></input>
   
        <label className="createProjectLabels">Customer</label>
 
        <select onChange={(e) => handleChange(e, "customerId")} className="createProjectInputs">
            <option value="" hidden>Choose...</option>
            { customers &&
                customers.map((c, i) => (
                    <option key={i} value={c.nid[0].value} >{c.title[0].value} {c.nid[0].value}</option>
                ))
            }
        </select>
    
       
         <label className="createProjectLabels">Customer contact</label>
       
        <select onChange={(e) => handleChange(e, "customer_userId")} className="createProjectInputs">
            <option value="" hidden>Choose...</option>
            { users &&
                users.map((u, i) => (
                    <option key={i} value={u.uid[0].value} >{u.name[0].value} {u.uid[0].value}</option>
                ))
            }
        </select>
    
        
        
        {/*
        
        <label>developers</label>
        <br />
            <select onChange={(e) => handleChange(e, "developers")}>
                <option value="" hidden>Choose...</option>
                {
                    developers && 
                    developers.map((d, i) => (
                        <option key={i} value={d.uid[0].value} >{d.name[0].value}, {d.uid[0].value}</option>
                    ))
                }
            </select>
            <button>add developer</button>
        */}
            <div>
            <button type="submit" className="createProjectButton">Create Project</button>
            </div>
        
      </form>
    </div>
  );
};

export default AddProject;


