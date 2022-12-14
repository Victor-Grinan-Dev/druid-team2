import React, { useEffect } from "react";
import events from "events";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import ProjectCard from "./projectCard/ProjectCard";

import { ajaxGet } from "../../ajax/services";
import { setProjects } from "../../features/druidSlice";

const CustomersProjects = () => {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.druid.projects);
  const userId = useSelector(state => state.druid.user.current_user.uid);
  const search = useSelector(state => state.druid.search)
  const admin = useSelector((state) => state.druid.user.current_user?.roles);

  useEffect(() => {
    getProjects();
  }, []);

   const getProjects = async () => {
    ajaxGet("/node/osproject2").then(res => {
      dispatch(setProjects(res));
      console.log("projects", res)
    });
  }

  return (
    <div className="customersProjects">
      <div className="searchProjects">
        <Search />
      </div>
      <h2 className="projectsH2">Projects</h2>
      <div className="cardsArea">
        {
          projects && !admin ?
          projects
          .filter(p=>{console.log(p?.field_customer_conctact[0]?.target_id, userId)
            return (
              p?.field_customer_conctact[0]?.target_id === parseInt(userId, 10) || 
              p?.field_developers[0]?.target_id === parseInt(userId, 10)
              );
          }).filter(p => {
            return p.title[0].value.includes(search);
          })
          .map((project, index) => {

            return (
              <ProjectCard
                key={index}
                nid={project.nid[0].value}
                project={project}
              />
            );
          }) :
          projects
            .filter(p => {
              return p.title[0].value.toLowerCase().includes(search);
            })
            .map((project, index) => {
   
              return (
                <ProjectCard
                  key={index}
                  nid={project.nid[0].value}
                  project={project}
                />
              );
            })
        }
      </div>
    </div>
  );
};

export default CustomersProjects;
