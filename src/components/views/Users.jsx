import React from 'react';
import UserCard from './UserCard';
import { useSelector } from 'react-redux';

const Users = () => { 
  const users = useSelector(state => state.druid.users)
 
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