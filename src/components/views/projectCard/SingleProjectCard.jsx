import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ajax from '../../../ajax/ajax';
import { ajaxGet, ajaxPost } from '../../../ajax/services';
import { capitalStart } from '../../../functions/capitalStart';

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
  ]

const SingleProjectCard = () => {
    const location = useLocation();
    const [customerContact, setCustomerContact] = useState();
    const [customer, setCustomer] = useState();
    const [expand, setExpand ] = useState(false);
    const nid = location.state.nid[0].value;
    const projectName = location.state.title[0].value;
    const customerContactNumber = location.state.field_customer_conctact[0].target_id;
    const customerNID = location.state.field_customers[0].target_id;
    //const data = location.state;
    //console.log(customerNID);

    useEffect(() => {
        getData()
    }, []);

    const data = location.state;

    const getData = () => {
        ajaxGet("/admin/people/users").then(response => { 
            const data = response.filter(u=>{
                return u.uid[0].value === customerContactNumber;
            });
            //console.log(data[0].name[0].value)
            setCustomerContact(data[0].name[0].value);
        });
    
        ajaxGet("/node/customers").then(response => { 
            const data = response.filter(c=>{
                return c.nid[0].value === customerNID;
            });
            setCustomer(data[0].title[0].value);
        });
    };

    return (
    <div >
        <div >
          <div >
            <h3>"{ projectName }"</h3>
            <div>Customer: {customer}</div>
            <div>Customer contact: {customerContact}</div>
          </div>
          <div >
            <button onClick={()=>setExpand(!expand)} className="infoButton">{expand ?  "Less info": "More info"}</button>
              {
                expand &&
                servicesKey.map((s,i) => (
                  <div key={i} style={{
                      display:"flex",
                      justifyContent:"space-between",

                    }}>
                      <label> {capitalStart(s.split("_")[1])}: </label>
                      <p>{data[s][0]?.value}</p>
                  </div>
                ))
              }
          </div>
        </div>
      </div>
  )
}

export default SingleProjectCard;