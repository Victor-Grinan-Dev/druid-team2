import React from "react";
import style from "./projectCard.module.css";

import { Link } from "react-router-dom";
import { capitalStart } from "../../../functions/capitalStart";
import { useSelector } from "react-redux";

const ProjectCard = ({ project, nid }) => {

  const all = useSelector(state => state.druid.customers)
  const companyName = all.filter(c => {
    return c.nid[0].value === project.field_customers[0].target_id 
  })[0].title[0].value;

  //card browser
  return (
    <div className={style.card}>
      <div className={style.box}>
        <div className={style.content}>
          <p className={style.company}>{companyName}</p>
          <h2>{nid < 10 ? `0${nid}` : nid}</h2>
          <h3>"{capitalStart(project.title[0].value)}"</h3>
          <div className="dataArea"></div>
          
          <Link to={`/projectinfo/${project.title[0].value}`} state={project}>
            <button className="infoButton">More Info</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
