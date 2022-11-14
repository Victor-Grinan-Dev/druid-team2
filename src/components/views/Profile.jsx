import React, { useEffect } from 'react';
//import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEditUser, setUser } from '../../features/druidSlice';
import { capitalStart } from '../../functions/capitalStart';

const Profile = ({profile = null}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.druid.user);
  const userProfile = profile ? profile : user;
  const editUser = useSelector(state => state.druid.editUser);

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [verified, setVerified] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [pwd, setPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [pwdMatch, setPwdMatch] = useState("")
  const [legalPwd, setLegalPwd] = useState(false)
  const [passMatch, setPassMatch] = useState(false)
  //const pwdRef = useRef(null);
  //const errRef = useRef(null);

  const validator = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$");

  useEffect(() => {
    dispatch(setEditUser(user));
  }, [dispatch, user]);

  useEffect(()=>{
    setErrMsg('');
  },[pwd]);

  useEffect(() => {  
    setLegalPwd(validator.test(newPwd))
    // eslint-disable-next-line
  }, [newPwd]);

  useEffect(() => {
    setPassMatch(newPwd ? pwdMatch === newPwd : false);
  }, [pwdMatch, newPwd]);

  const verifyHandler = () => {
    let result = false;
      if (pwd === user.pwd){
        result = true;
      }else{
        setErrMsg('Wrong Password')
      }
      setVerified(result);
  }

  const passwordHandler = (e) => {
    setPwd(e.target.value);
  }

  const saveChanges = () => {
    setIsEditing(false);
    setVerified(false);
    setIsChangingPass(false);
    dispatch(setUser(editUser));
    //save to the database
  }

  const changeData = (e) => {
    if(e.target.value){
      dispatch(setEditUser({...editUser, [e.target.name]:e.target.value}))
    }
  }

  const changeDataPwd = () => {
    dispatch(setEditUser({...editUser, "pwd":newPwd}));
    cancelEditPass();
  }
  
  const cancelEdit = () => {
    setIsEditing(false);
    setIsChangingPass(false);
    setVerified(false);
  }

  const cancelEditPass = () => {
    setIsChangingPass(false);
    setVerified(false);
  }
    
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
            !isEditing && <button className="infoButton"
            onClick={()=> {setIsEditing(true)}}> Edit </button>
          }

          {
            isEditing && <div>
              <button className="infoButton"
            onClick={cancelEdit}> Cancel </button>
            <button className="infoButton"
            onClick={saveChanges}> Done </button>
            </div>
          }
        </div>
        {
          isEditing ? 

          <div className="profileContent">

            <input type="text" name='username' onChange={changeData} placeholder={capitalStart(editUser.username)} className='addProjInput'  />

            <input type="text" name='email' className='addProjInput' onChange={changeData} placeholder={editUser.email}/>
            
            <textarea name="bio" cols="30" rows="10" placeholder={editUser.bio ? editUser.bio : "Add a Bio to your profile..."} className='profileBio' onChange={changeData}></textarea>
            <div>
              {
              !isChangingPass &&
                <button onClick={() => {setIsChangingPass(true)}} className="infoButton">change password</button>
              }

              {isChangingPass && !verified &&
                <div className='pwdSection'>
                  <input type="password" name='pwd' placeholder="Enter Password..." onChange={passwordHandler}/>
                  <button onClick={verifyHandler} className="infoButton" name="verify">verify</button>
                  <button onClick={cancelEditPass} className="infoButton">cancel</button>
                </div>
              }
              

              { verified && <div className='pwdSection'>
                <div className="displayRow">
                  <button onClick={cancelEditPass} className="infoButton">cancel</button>{ legalPwd && passMatch &&   <button name="pwd" onClick={changeDataPwd} className="infoButton">Confirm</button>}
                </div>
                
                <div className="displayRow">
                  <div className="displayColumn">
                    <div className="displayRow">
                      <input type="password" name='newPwd' onChange={(e)=>setNewPwd(e.target.value)} placeholder="New Password..." className='addProjInput'/>
                      <p>{legalPwd ? "✅" : "❌"}</p>
                    </div>
                    <div className="displayRow">
                      <input type="password" name='confPwd' onChange={(e)=>setPwdMatch(e.target.value)} placeholder="Confirm password..." className='addProjInput'/>
                      <p>{passMatch ? "✅" : "❌"}</p>
                    </div>
                  </div>
                </div>
              </div>}

            </div>
            
          </div> : 

            <div className="profileContent">
              <p>Access level: {capitalStart(userProfile.userType)}</p> 
              <p>Company: {userProfile.company ? userProfile : "Druid"}</p>
              <p>Email: {userProfile.email}</p>

              {
               userProfile.bio ? <p> {userProfile.bio}</p> : "Write a short Bio..."
              }

            </div>
        }
        <p>{errMsg}</p>
      </div>
      
    </div>
  )
}

export default Profile;
