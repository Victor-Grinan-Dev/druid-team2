import React from 'react';
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";


const UserInfo = () => {
  const location = useLocation();
  const currentUser = location.state;
  const user = useSelector((state) => state.druid.user);

  return (
    <div className="infoContainer">

        <h3>{currentUser.name}</h3>
        <p>{currentUser.type}</p>
        <p>{currentUser.email}</p>
        <p>{currentUser.company ? currentUser.company : "-"}</p>

        {user.userType === "pm" && (
          <Link >
            <button className="editButton">Edit</button>
          </Link>
        )}
    </div>
   
  );
}

export default UserInfo;