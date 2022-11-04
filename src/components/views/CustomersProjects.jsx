import React from "react";
import ProjectBox from "./ProjectBox";
import { useSelector } from "react-redux";
import Search from "./Search";

const CustomersProjects = () => {
  const projects = useSelector((state) => state.druid.projects);
  const isLoading = useSelector((state) => state.druid.isLoading);
  const user = useSelector((state) => state.druid.user);

  const access = () => {
    if (user.userType === "customer") {
      return projects.map(
        (project, i) =>
          project.customer === user.company && (
            <ProjectBox project={project} key={i} />
          )
      );
    } else if (user.userType === "developer") {
      return projects.map(
        (project, i) =>
          project.developers.includes(user.username) && (
            <ProjectBox project={project} key={i} />
          )
      );
    }

    return projects.map((project, i) => (
      <ProjectBox project={project} key={i} />
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

      <div>{access()}</div>
    </div>
  );
};
// if ("customer") {render company}
// if ("developer") {render company that includes developer}  userType === "developer"
export default CustomersProjects;
