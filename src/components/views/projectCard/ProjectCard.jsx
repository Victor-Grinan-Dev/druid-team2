import React from 'react';
import style from './projectCard.module.css';

import { Link } from "react-router-dom";
import { capitalStart } from "../../../functions/capitalStart";

const ProjectCard = ({ project, index, full=false }) => {

    if(full){
        return(
            <div className={style.cardFull}>  
                <div className={style.boxFull}>
                    
                    <div className={style.contentFull}>
                        <h2>Id: {project.id}</h2>
                        <h3>"{capitalStart(project.name)}"</h3>
                        <div className="dataArea"></div>
                        <p>Custormer: {project.customer}</p>
                        <p>Main engine: {project.services[0].engine}</p>
                        <p >Developers:</p>
                        {project.developers ?
                            project.developers.map((dev,i) => (
                                <p key={i}>{capitalStart(dev)}</p>
                            )) : <p>No developers assigned</p>
                        }
                        {project.developers ? console.log(project.name, project.developers) : null}
                    </div>
                </div>           
            </div>
        )
    }
  return (
    <div className={style.card}>  
        <div className={style.box}>
            
            <div className={style.content}>
                <h2>{index < 10 ? `0${index}`: index }</h2>
                <h3>"{capitalStart(project.name)}"</h3>
                <div className="dataArea"></div>
                <p>Custormer: {project.customer}</p>
                <p>Main engine: {project.services[0].engine}</p>
                <p >Developers:</p>
                {project.developers ?
                    project.developers.map((dev,i) => (
                        <p key={i}>{capitalStart(dev)}</p>
                    )) : <p>No developers assigned</p>
                }
                {project.developers ? console.log(project.name, project.developers) : null}
                <Link to={`/projectinfo/${project.name}`} state={project}> <button className='infoButton'>More Info</button></Link>
            </div>
        </div>           
    </div>
  )
}

export default ProjectCard;
