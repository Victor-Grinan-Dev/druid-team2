import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ajaxGet } from "../../../ajax/services";
import { capitalStart } from "../../../functions/capitalStart";

const servicesKey = [
  "field_cms",
  "field_engine",
  "field_language",
  "field_framework",
  "field_libraries",
  "field_database",
  "field_mailing",
  "field_search",
  "field_cdn",
  "field_infra",
  "field_docker",
  "field_hosting",
  "field_deps",
  "field_ci_cd",
];

const SingleProjectCard = () => {
  const location = useLocation();
  const [customerContact, setCustomerContact] = useState();
  const [customer, setCustomer] = useState();
  const [developer, setDeveloper] = useState();
  const [expand, setExpand] = useState(false);
  const nid = location.state.nid[0].value;
  const projectName = location.state.title[0].value;
  const customerContactNumber =
    location.state.field_customer_conctact[0].target_id;
  const devNumber = location.state.field_developers[0].target_id;
  const customerNID = location.state.field_customers[0].target_id;

  useEffect(() => {
    getData();
  }, []);

  const data = location.state;

  const getData = () => {
    ajaxGet("/admin/people/users").then((response) => {
      const data1 = response.filter((u) => {
        return u.uid[0].value === customerContactNumber;
      });
      setCustomerContact(data1[0].name[0].value);
      const data2 = response.filter((u) => {
        return u.uid[0].value === devNumber;
      });
      setDeveloper(data2[0].name[0].value);
    });

    ajaxGet("/node/customers").then((response) => {
      const data = response.filter((c) => {
        return c.nid[0].value === customerNID;
      });
      setCustomer(data[0].title[0].value);
    });
  };

  return (
    <div>
      <div className="singleProjectContainer">
        <h2>{projectName}</h2>
        <div className="singleProjectDiv">Customer: {customer}</div>
        <div className="singleProjectDiv">
          Customer contact: {customerContact}
        </div>
        <div className="singleProjectDiv">Developer: {developer}</div>
      </div>
      <div>
        <button onClick={() => setExpand(!expand)} className="infoButton">
          {expand ? "Less info" : "More info"}
        </button>
        <div className="singleExtraInfo">
          {expand &&
            servicesKey.map((s, i) => (
              <div key={i}>
                <label className="servicesKeys">
                  {" "}
                  {capitalStart(s.split("_")[1])}:{" "}
                </label>
                <p className="servicesValues">{data[s][0]?.value}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProjectCard;
