import React from "react";
import ProjectBox from "./ProjectBox";

import { useSelector } from "react-redux";
  
const CustomersProjects = () => {
  const projects = useSelector(state => state.druid.projects);
  const isLoading = useSelector(state => state.druid.isLoading);
  
  if(isLoading){
    return <p>... Loading data ...</p>
  }

  return (
    <div className="homeContainer">
      <h1 className="welcomeH1">Welcome to Druid system!</h1>
      <h2 className="listH2">Your projects:</h2>
     
      <div>
        {
          projects.map((project,i) => (
              <ProjectBox project={project} key={i}/>
          ))
        }

      </div>
    </div>
  );
};

export default CustomersProjects;

