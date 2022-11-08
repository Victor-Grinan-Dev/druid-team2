import React from 'react';
import { capitalStart } from '../../functions/capitalStart';
import { Link } from 'react-router-dom';

const UserCard = ({user}) => {
  return (
<div className="projectBox">
      <p>
        {capitalStart(user.username)} - {user.userType}
      </p>
        {/*
        <Link to={`/userinfo/${user.username}`} state={user}>
            <button className="infoButton">More info</button>
        </Link>
        */}
        <Link to="profile" profile={user}><button className="infoButton">More info</button></Link>
    </div>
  )
}

export default UserCard;