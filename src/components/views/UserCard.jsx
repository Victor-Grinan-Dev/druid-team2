import React from 'react';
import { capitalStart } from '../../functions/capitalStart';
import { Link } from 'react-router-dom';

const UserCard = ({user}) => {
  const role = user.roles[0]?.["target_id"].split("_").join(" ");
  const name = capitalStart(user.name[0].value)
  const company = user?.field_company[0]?.target_id
  return (
<div className="projectBox">
      <p>
        {name} - {role} { company || null}
      </p>
        {/*
        <Link to={`/userinfo/${user.username}`} state={user}>
            <button className="infoButton">More info</button>
        </Link>
        */}
        <Link to="/profile" profile={user}><button className="infoButton">More info</button></Link>
    </div>
  )
}

export default UserCard;