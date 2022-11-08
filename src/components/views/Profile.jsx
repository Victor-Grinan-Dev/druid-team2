import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { capitalStart } from '../../functions/capitalStart';

const Profile = ({profile = null}) => {
  const user = useSelector(state => state.druid.user);
  const userProfile = profile ? profile : user;
  return (
    <div>
      <div className="profileSheet">
        <div className="profileHeader">
            
          <div className="circleWrapper">
            <div className="profileImage">
                <h1>{capitalStart(userProfile.username[0])}</h1>
            </div>
          </div>

          <div className="profileTitle">
          {capitalStart(userProfile.username)}
          </div>

          {
            (userProfile.username === user.username || user.userType === "pm") ? <div className="profileEdit">
           edit
          </div> : <div></div>
          }
        </div>

        <div className="profileContent">
          <p>Access level: {userProfile.profileType}</p>
          <p>Company: {userProfile.company ? userProfile : "Druid"}</p>
          <p>Email: {userProfile.email}</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rerum necessitatibus ut minima labore sapiente dolor dolorem iure? Aliquam eligendi vitae pariatur consectetur ab hic. Quia dolore ad obcaecati iure aut in, porro, labore consequatur dolor eius amet minus consectetur placeat vero nulla officiis optio cum reiciendis laudantium? Ad, quisquam.</p>
        </div>

      </div>
    </div>
  )
}

export default Profile;