import React from "react";
//import ProjectBox from "./ProjectBox";
import { useSelector } from "react-redux";
import Search from "./Search";
import ProjectCard from "./projectCard/ProjectCard";

const CustomersProjects = () => {
  const projects = useSelector((state) => state.druid.projects);
  const isLoading = useSelector((state) => state.druid.isLoading);
  const user = useSelector((state) => state.druid.user);
  const search = useSelector(state => state.druid.search);
  const searchBy = useSelector(state => state.druid.searchBy);

  const filteredProjectsHandler = () => {
    switch (searchBy) {
      case "customer":
        return projects.filter(proj => {
          return proj.customer.toLowerCase().includes(search.toLowerCase());
        });

      case "developer":
        return projects.filter(proj => {
          if(search){
            for (let dev of proj.developers){
              if(dev.includes(search.toLowerCase()))
                return proj;
            }
            
          }else{
            return proj;
          }
          
        });

      case "project": 
        return projects.filter(proj => {
          return proj.name.toLowerCase().includes(search.toLowerCase());
        });

      case "engine":
        let projArr = [];
        for (let proj of projects){
          for (let serv of proj.services){
            if (serv.engine.toLowerCase().includes(search.toLowerCase()) && !projArr.includes(proj)){
              projArr.push(proj);
            }
          }
        }

        return projArr;
      default:
        return null;
    }
  }

  const access = () => {
    if (user.userType === "customer") {
      return projects.map(
        (project, i) =>
          project.customer === user.company && (
            <ProjectCard project={project} index={i + 1} key={i} />
          )
      );
    } else if (user.userType === "developer") {
      return projects.map(
        (project, i) =>
          project.developers.includes(user.username.toLowerCase()) && (
            <ProjectCard project={project} index={i + 1} key={i} />
          )
      );
    }

    return filteredProjectsHandler().map((project, i) => (
      <ProjectCard project={project} index={i + 1} key={i} full={false}/>
    ));
  };

  if (isLoading) {
    return <p>... Loading data ...</p>;
  }

  return (
    <div className="customersProjects">
      <div className="searchProjects">
        <Search />
      </div>
      <h2 className="projectsH2">Projects</h2>

    <p></p>
      <div>{access()}</div>
    </div>
  );
};

export default CustomersProjects;
