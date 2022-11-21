import React from 'react';
import { useLocation } from 'react-router-dom';

const InvoiceSingle = () => {
    const location = useLocation();
    {console.log(location)}

  return (
    <div>
        
        <p>guid: {location.state.uuid[0]?.value}</p>
        <p>Status: {location.state.title[0]?.value}</p>
        <p>created by: {location.state.field_createdby_name[0]?.value ? location.state.field_createdby_name[0]?.value : "undefined"}</p>
        <p>is paid: {location.state.field_ispaid[0]?.value ? "true" : "false"}</p>
        <p>is active: {location.state.field_isactive[0]?.value === 1 ? "true" : "false"}</p>
        <p>created date: {location.state.field_createddatetime[0]?.value ? location.state.field_createddatetime[0]?.value : "undefined"}</p>
        <p>is sent: {location.state.field_issent[0]?.value === 1 ? "true" : "false"}</p>
    </div>
  )
}

export default InvoiceSingle;