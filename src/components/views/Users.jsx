import React, { useState } from 'react';
import UserCard from './UserCard';
import ajax from "../../ajax/ajax";
import { useEffect } from 'react';

const Users = () => {

    const [users, setUsers] = useState();

    useEffect(() => {
      getUsers()
    }, []);

    const getUsers = async () => {
      try {
        const axios = await ajax();
        const response = await axios.get("/admin/people/users");
        if (response.data) {
          setUsers(response.data);
          console.log("users:", response.data)
        }
      } catch (e) {
        alert(e);
      }
    }
  return (
    <div className="customersProjects">
    <div className="searchProjects">
      
    </div>
    <h2 className="projectsH2">Users</h2>

        {users && 
          users.map((user, i) => (
          <UserCard key={i} user={user}/>
        ))
        }
    
  </div>
  )
}

export default Users;