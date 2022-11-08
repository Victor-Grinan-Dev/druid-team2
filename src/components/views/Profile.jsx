import React from 'react';
import { useSelector } from 'react-redux';
import { capitalStart } from '../../functions/capitalStart';

const Profile = () => {
  const user = useSelector(state => state.druid.user);
  return (
    <div>
      <div className="profileSheet">
        <div className="profileHeader">
            
          <div className="circleWrapper">
            <div className="profileImage">
                <h1>{capitalStart(user.username[0])}</h1>
            </div>
          </div>

          <div className="profileTitle">
          {capitalStart(user.username)}
          </div>

          <div className="profileEdit">
           edit
          </div>

        </div>

        <div className="profileContent">
          <p>Access level: {user.userType}</p>
          <p>Company: {user.company ? user.company : "Druid"}</p>
          <p>Email: {user.email}</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rerum necessitatibus ut minima labore sapiente dolor dolorem iure? Aliquam eligendi vitae pariatur consectetur ab hic. Quia dolore ad obcaecati iure aut in, porro, labore consequatur dolor eius amet minus consectetur placeat vero nulla officiis optio cum reiciendis laudantium? Ad, quisquam.</p>
        </div>

      </div>
    </div>
  )
}

export default Profile;