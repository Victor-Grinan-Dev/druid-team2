import React from "react";
import ProjectBox from "./ProjectBox";
import { useSelector } from "react-redux";
import Search from "./Search";

const CustomersProjects = () => {
  const projects = useSelector((state) => state.druid.projects);
  const isLoading = useSelector((state) => state.druid.isLoading);

  if (isLoading) {
    return <p>... Loading data ...</p>;
  }

  return (
    <div className="customersProjects">

      <Search />
      <h2 className="projectsH2">Projects</h2>

      <div>
        {projects.map((project, i) => (
          <ProjectBox project={project} key={i} />
        ))}
      </div>
    </div>
  );
};

export default CustomersProjects;
