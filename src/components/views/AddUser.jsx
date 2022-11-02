import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setCreateUser } from '../../features/druidSlice';
import { postUser } from '../../services/druid';

const AddUser = () => {

  const dispatch = useDispatch();
  const newUser = useSelector(state => state.druid.createUser);

  const changeData = (e) => {
    e.preventDefault()
    dispatch(setCreateUser([e.target.name, e.target.value]));
  };

  const createUser = (e) => {
    e.preventDefault()
  
    if(newUser.userType && newUser.username && newUser.email){
      console.log("create user:", newUser);
      postUser(newUser);
    }else{
      console.log("missing data")
    }
  }

  return (
    <div>
        <form  onSubmit={createUser}>

          <div>
            <div >
                <label htmlFor="username">  Username: </label>
                <input type="text" name="username" id="name" onChange={changeData} />
            </div>
            <div >
                <label htmlFor="email">  email: </label>
                <input type="text" name="email" id="name" onChange={changeData} />
            </div>
            <div >
              <label htmlFor="customer">User type</label>
              <select name="userType"  onChange={changeData}>
                <option hidden>Choose</option>
                <option value="developer">Developer</option>
                <option value="customer">customer</option>
                <option value="manager">Project Manager</option>
              </select>
            </div>
            <input type="submit" />
          </div>
        </form>
    </div>
  )
}

export default AddUser;