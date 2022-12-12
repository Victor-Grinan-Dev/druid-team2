import React from "react";
import style from "./projectCard.module.css";

import { Link } from "react-router-dom";
import { capitalStart } from "../../../functions/capitalStart";
import { useSelector } from "react-redux";

const servicesKey = [
  "field_hosting",
  "field_cdn",
  "field_ci_cd",
  "field_cms",
  "field_customer_conctact",
  "field_customers",
  "field_database",
  "field_deps",
  "field_docker",
  "field_engine",
  "field_framework",
  "field_infra",
  "field_language",
  "field_libraries",
  "field_mailing",
  "field_search",
]

const data = {}

const changeData = (e) => {
  data[e.target.name] = e.target.value;
};

const ProjectCard = ({ project, nid, full = false }) => {
  const user = useSelector((state) => state.druid.user);

  
  if (full) {
    //singlePage:
    return (
      <div className={style.cardFull}>
        <div className={style.boxFull}>
          <div className={style.contentFull}>
            <h2>{nid < 10 ? `0${nid}` : nid}</h2>
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
          <h3>Extra info</h3>
          <div className={style.extraInfo}>
          <form onSubmit={()=>console.log(data)} >
      {
        servicesKey.map((s,i) => (
          <div key={i} style={{
              display:"flex",
              justifyContent:"space-between"
            }}>
              <label> {capitalStart(s.split("_")[1])}: </label>
              <input type="text"  name={s} onChange={changeData}/>
          </div>
          
        ))
      }
      <button>submit</button>
    </form>
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
            <button >new</button>
            <button className="infoButton" >Add Service</button>
          
        </div>
      </div>
    );
  }
  //card browser
  return (
    <div className={style.card}>
      <div className={style.box}>
        <div className={style.content}>
          <h2>{nid < 10 ? `0${nid}` : nid}</h2>
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
          <Link to={`/projectinfo/${project.title[0].value}`} state={project}>
            {" "}
            <button className="infoButton">More Info</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
