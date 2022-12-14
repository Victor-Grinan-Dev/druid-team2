import React, { useEffect, useState } from "react";
import events from "events";

//ajax
import ajax from "../../ajax/ajax";
import { ajaxPost, ajaxGet } from "../../ajax/services";
import { capitalStart } from "../../functions/capitalStart";

//functions
//import { capitalStart } from "../../functions/capitalStart";

const emitter = new events.EventEmitter();
const AddProject = () => {
  
  const [customers, setCustomers] = useState();
  const [developers, setDevelopers] = useState([]);
  const [users, setUsers] = useState([]);
  const [customer_users, setCustomer_users] = useState([]);
  const [expand, setExpand] = useState(false)
  const [data, setData] = useState({
    type: [
      {
        target_id: "project",
        target_type: "node_type",
      },
    ],
    field_customer_conctact:[
      {
        target_id:"",
      }
    ],
    field_customers:[
      {
        target_id:""
      }
    ]
  })

  const servicesKey = [
    "field_hosting",
    "field_cdn",
    "field_ci_cd",
    "field_cms",
    "field_database",
    "field_deps",
    "field_docker",
    "field_engine",
    "field_framework",
    "field_infra",
    "field_language",
    "field_libraries",
    "field_mailing",
    "field_search",
  ];

  useEffect(() => {
    getCustomers();
    getUsers();
  }, []);

  const getCustomers = async () => {
    ajaxGet("/node/customers").then(response => {
      console.log("customers", response)
      if (response) {
        setCustomers(response)
      }
    });
  }

  const getUsers = async () => {
    ajaxGet("/admin/people/users").then(response => {
      console.log("users", response)
      if (response) {
        setUsers(response);
        const cus_users = response.filter(u=>{
          return u.roles[0].target_id === "customer_user";
        });
        console.log("only customers", cus_users)
        setCustomer_users(cus_users);
        /*****/
        const dev_users = response.filter(u=>{
          return u.roles[0].target_id === "developer";
        });
        console.log("only dev", dev_users)
        setDevelopers(dev_users);
      }
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    //ajaxPost('/node', data)
    /*
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
        ],
        field_engine:[
          {
            value: data.field_engine,
          }
        ]
      };
    */
    try {
      const axios = await ajax();
      const response = await axios.post('/node', data);
      console.log("Node created: ", response.data);
      emitter.emit("NODE_UPDATED");
    } catch (e) {
      alert(e);
    }
  };

  const handleChange = (e, propName) => {
    if(propName === "field_customers" || propName === "field_customer_conctact" || propName === "field_developers"){
      setData({...data, [propName]:[{target_id: e.target.value}]});
    }else{
      setData({...data, [propName]:[{value: e.target.value}]});
    }
    
  };
  
  return (
    <div className="addProject centerText">
      <h3>Create new project</h3>
      <form onSubmit={handleSubmit} className="createProjectForm">
        <div className="flexCenter">
        <label className="createProjectLabels">Project name</label>
   
        <input type="text" onChange={(e) => handleChange(e, "title")} className="createProjectInputs"></input>
        </div>
        
        <div className="flexCenter">
        <label className="createProjectLabels">Customer</label>
 
          <select onChange={(e) => handleChange(e, "field_customers")} className="createProjectInputs">
              <option value="" hidden>Choose...</option>
              { customers &&
                  customers.map((c, i) => (
                      <option key={i} value={c.nid[0].value} >{c.title[0].value}</option>
                  ))
              }
          </select>
        </div>
    
        <div className="flexCenter">
            <label className="createProjectLabels">Customer contact</label>
          
          <select onChange={(e) => handleChange(e, "field_customer_conctact")} className="createProjectInputs">
              <option value="" hidden>Choose...</option>
              { customer_users &&
                  customer_users
                  .filter(u => {
                    return u.field_company[0].target_id === parseInt(data.field_customers[0].target_id, 10);
                  })
                  .map((u, i) => {
                    return <option key={i} value={u.uid[0].value} >{u.name[0].value} </option>
                  })
              }
          </select>
        </div>

        <div className="flexCenter">
            <label className="createProjectLabels">Developer</label>
          
          <select onChange={(e) => handleChange(e, "field_developers")} className="createProjectInputs">
              <option value="" hidden>Choose...</option>
              { developers &&
                  developers
                  .map((u, i) => {
                    return <option key={i} value={u.uid[0].value} >{u.name[0].value} </option>
                  })
              }
          </select>
        </div>
        
            <p onClick={()=> setExpand(!expand) } className="createProjectButton centerText">{expand ? "Hide services" : "Add services"} </p>
            {expand && <div style={{
              display:"flex",
              flexWrap:"wrap",
              justifyContent:"between"
            }}>
            {  
            servicesKey.map((s,i) => (
              <div key={i} style={{
                  display:"flex",
                  justifyContent:"space-between",
                  width:"45%",
                  margin:"1%"
                }}>
                  <label> {capitalStart(s ==="field_ci_cd" ? s.split("_")[1] :s.split("_")[1])}: </label>
                  <input type="text" onChange={(e) => handleChange(e, s)} />
              </div>
            ))
            }
            </div>}
            <div>
            <button type="submit" className="createProjectButton">Create Project</button>
            </div>
      </form>
    </div>
  );
};

export default AddProject;


