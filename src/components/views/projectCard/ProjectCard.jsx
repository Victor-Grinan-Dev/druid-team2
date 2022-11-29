import React from 'react';
import style from './projectCard.module.css';

import { Link } from "react-router-dom";
import { capitalStart } from "../../../functions/capitalStart";
import { useSelector } from 'react-redux';
 
const ProjectCard = ({ project, nid, full=false }) => {
    const user = useSelector(state => state.druid.user);
    if(full){
        //singlePage:
        return(
            <div className={style.cardFull}>  
                <div className={style.boxFull}>
                    
                    <div className={style.contentFull}>
                        <h2>{nid < 10 ?`0${nid}`: nid }</h2>
                        <h3>"{capitalStart(project.title[0].value)}"</h3>
                        <div className="dataArea"></div>
                        {/*
                        <p>Custormer: {project.customer}</p>
                        <p>Main engine: {project.services[0].engine} {project.services[0].version}</p>
                        <p >Developers:</p>
                        {project.developers ?
                            project.developers.map((dev,i) => (
                                <p key={i}>{capitalStart(dev)}</p>
                            )) : <p>No developers assigned</p>
                        }
                        */}

                    </div>
                    <h3>extra Info?</h3>
                    <div className={style.extraInfo}>
                        
{/*
                        {project.developers ? console.log(project.name, project.developers) : null}

                        <div className={style.infoPiece}>
                            <p>closedDate:</p>
                        </div>
                        <div className={style.infoPiece}>
                            <p>customerContact:</p>
                        </div>
                        <div className={style.infoPiece}>
                            <p>startDate:</p>
                        </div>
                        <div className={style.infoPiece}>
                            <p>deadline:</p>
                        </div>
                        <div className={style.infoPiece}>
                            <p>projectStatus:</p>
                        </div>
                        <div className={style.infoPiece}>
                            <p>services:(url service engine version)</p>
                        </div>
                        <div className={style.infoPiece}>
                            <p>customer:</p>
                        </div>
                        <div className={style.infoPiece}>
                            <p>projectOwner:</p>
                        </div>
*/}
                    </div>
                    {user.userType === "pm" && <button className='infoButton'>Edit</button>}
                </div>           
            </div>
        )
    }
    //card browser
  return (
    <div className={style.card}>  
        <div className={style.box}>
            
            <div className={style.content}>
                <h2>{nid < 10 ? `0${nid}`: nid }</h2>
                <h3>"{capitalStart(project.title[0].value)}"</h3>
                <div className="dataArea"></div>
                
                {/*
                <p>Custormer: {project.field_customer[0].value}</p>
                <p>Main engine: {project.services[0].engine} {project.services[0].version}</p>
                                <p >Developers:</p>
                {project.developers ?
                    project.developers.map((dev,i) => (
                        <p key={i}>{capitalStart(dev)}</p>
                    )) : <p>No developers assigned</p>
                }
                */}

                {/* project.developers ? console.log(project.name, project.developers) : null */}
                <Link to={`/projectinfo/${project.title[0].value}`} state={project}> <button className='infoButton'>More Info</button></Link>
            </div>
        </div>           
    </div>
  )
}

export default ProjectCard;
