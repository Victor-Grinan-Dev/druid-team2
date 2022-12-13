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
    "field_customer_conctact",
    "field_customers",
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

    const changeData = (e) => {
        data[e.target.name] = e.target.value;
    };

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

    const postData = async (e) => {
        e.preventDefault();

        console.log(data)

        ajaxPost(`/node/${nid}`, data).then(res=> {
            console.log(res);
        })
    };
    return (
    <div >
        <div >
          <div >
            <h3>"{ projectName }"</h3>
            <div>Customer: {customer}</div>
            <div>Customer contact: {customerContact}</div>
          </div>
          <h3>Extra info</h3>
          <div >
            <form onSubmit={postData} > 
              {
                servicesKey.map((s,i) => (
                  <div key={i} style={{
                      display:"flex",
                      justifyContent:"space-between"
                    }}>
                      <label> {capitalStart(s.split("_")[1])}: </label>
                      <input type="text" name={s} onChange={changeData}/>
                  </div>
                ))
              }
              <button  >Update Services</button>
            </form>
            
          </div>
        </div>
      </div>
  )
}

export default SingleProjectCard;