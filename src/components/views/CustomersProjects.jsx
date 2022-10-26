import React from "react";
import ProjectBox from "./ProjectBox";

const CustomersProjects = () => {
  return (
    <div className="homeContainer">
      <h1 className="welcomeH1">Welcome to Druid system!</h1>
      <h2 className="listH2">Your projects:</h2>
      <div>
        <ProjectBox />
        <ProjectBox />
        <ProjectBox />
        <ProjectBox />
        <ProjectBox />
      </div>
    </div>
  );
};

export default CustomersProjects;
