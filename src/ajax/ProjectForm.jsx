import events from "events";
import { useState, useEffect } from "react";
import ajax from "./ajax";

const emitter = new events.EventEmitter();

export const ProjectForm = () => {
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
  }
/*
  

  const getDevelopers = async () => {
    try {
        const axios = await ajax();
        const response = await axios.get("/admin/people/users"); // /admin/people/users /user/{user}:
        console.log("people:",response.data)
        setDevelopers(response.data.filter(dev => {
            return dev.roles[0]?.target_id === "developer";
        }))
        /*
                if (response.data) {
            const filterDevelopers = response.data.filter(u => {
                return u.roles[0].value;
            })
          setDevelopers(filterDevelopers);
          
        }
        
      } catch (e) {
        alert(e);
      }
  }
*/
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
      
    // testing
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
    <div className="create-node-form">
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <br />
        <input type="text" onChange={(e) => handleChange(e, "title")}></input>
        <br />
        <label>Customer</label>
        <br />
        <select onChange={(e) => handleChange(e, "customerId")}>
            <option value="" hidden>Choose...</option>
            { customers &&
                customers.map((c, i) => (
                    <option key={i} value={c.nid[0].value} >{c.title[0].value} {c.nid[0].value}</option>
                ))
            }
        </select>
        <br />
       
         <label>Customer Conctact</label>
        <br />
        <select onChange={(e) => handleChange(e, "customer_userId")}>
            <option value="" hidden>Choose...</option>
            { users &&
                users.map((c, i) => (
                    <option key={i} value={c.uid[0].value} >{c.name[0].value} {c.uid[0].value}</option>
                ))
            }
        </select>
        <br />
        
        
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
            <button type="submit">Submit</button>
            </div>
        
      </form>
    </div>
  );
};
