import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, setSearchBy } from '../../features/druidSlice';
import UserCard from './UserCard';

import events from "events";
import ajax from "../../ajax/ajax";
import { useEffect } from 'react';


/*
import { setSearchBy } from '../../features/druidSlice';
import { setSearch } from '../../features/druidSlice';
*/
const emitter = new events.EventEmitter();

const Users = () => {
    const dispatch = useDispatch();

    const searchBy = useSelector(state=>state.druid.searchBy);
    const search = useSelector(state=>state.druid.search);
    const [users, setUsers] = useState();

    useEffect(() => {
      refresh()
    }, []);
    const searchInputHandler = (e) => {
       dispatch(setSearch(e.target.value))
    }

    const refresh = async () => {
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
/*
    const searchByHandler = (e) =>{
      dispatch(setSearchBy(e.target.value))
    }

    const filteredUsers = () => {
      switch (searchBy) {
        case "all":
          return users;

        case "pm": 
          return users.filter(u => {
            return u.userType === "pm";
          });

        case "developer": 
          return users.filter(u => {
            return u.userType === "developer";
          });

        case "customer": 
          return users.filter(u => {
            return u.userType === "customer";
          });
          
        default:
          return users;
      }
    }

    const searchedUsers = () => {
      return filteredUsers().filter(u => {
        if(search){
          return u.username.toLowerCase().includes(search.toLowerCase());
        }
        return filteredUsers();
      })
    }
*/
  
  return (
    <div className="customersProjects">
    <div className="searchProjects">
      
    </div>
    <h2 className="projectsH2">Users</h2>
        <input type="text" placeholder='Search...' onChange={searchInputHandler} /> 

{/*
        <select name="userType" onChange={searchByHandler} >
            <option value="all">All</option>
            <option value="pm">Project Manager</option> 
            <option value="developer">Developer</option> 
            <option value="customer">Customer</option>
        </select>
*/}

        {users && 
          users.map((user, i) => (
          <UserCard key={i} user={user}/>
        ))
        }
    
  </div>
  )
}

export default Users;