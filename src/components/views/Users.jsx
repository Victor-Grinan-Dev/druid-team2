import React from 'react';
import { useSelector } from 'react-redux';
import UserCard from './UserCard';

/*
import { setSearchBy } from '../../features/druidSlice';
import { setSearch } from '../../features/druidSlice';
*/

const Users = () => {
    const users = useSelector(state=>state.druid.users);

/*
    const filteredUsersHandler = () => {
      switch (searchBy) {
        case "customer":
          return projects.filter(proj => {
            return proj.customer.toLowerCase().includes(search.toLowerCase());
          });
  
        case "developer":
          return projects.filter(proj => {
            if(search){
              for (let dev of proj.developers){
                if(dev.includes(search.toLowerCase()))
                  return proj;
              }
              
            }else{
              return proj;
            }
            
          });
  
        case "pm": 
          return projects.filter(proj => {
            return proj.name.toLowerCase().includes(search.toLowerCase());
          });
  
          return projArr;
        default:
          return null;
      }
    }
*/
  
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