import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div>
        <button onClick={() => useNavigate("/adduser")}> add user</button>
        <button onClick={() => useNavigate("/addproject")}> add project</button>
    </div>
  )
}

export default AdminPanel;