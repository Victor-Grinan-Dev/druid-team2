import React from 'react';
import { capitalStart } from '../../functions/capitalStart';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserCard = ({user}) => {
  const role = user.roles[0]?.["target_id"].split("_").join(" ");
  const companies = useSelector(state => state.druid.customers);
  const name = capitalStart(user.name[0].value)
  const company = companies.filter( c => {
    return c.nid[0].value === user?.field_company[0]?.target_id
  })[0]
  return (
<div className="projectBox">
      <p>
        {name} - {role} { company?.title[0].value || null}
      </p>
        <Link to="/profile" profile={user}><button className="infoButton">More info</button></Link>
    </div>
  )
}

export default UserCard;