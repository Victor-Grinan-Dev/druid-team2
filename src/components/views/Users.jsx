import React from 'react';
import { useSelector } from 'react-redux';
import UserCard from './UserCard';

const Users = () => {
    const users = useSelector(state=>state.druid.users);
  return (
    <div className="customersProjects">
    <div className="searchProjects">
      
    </div>
    <h2 className="projectsH2">Users</h2>
        <input type="text" placeholder='Search...'/> <select name="userType">
            <option value="all">All</option>
            <option value="pm">Project Manager</option> 
            <option value="developer">Developer</option> 
            <option value="customer">Customer</option>
        </select>
        {
        users.map((user, i) => (
            <UserCard key={i} user={user}/>
        ))
        }
    
  </div>
  )
}

export default Users;