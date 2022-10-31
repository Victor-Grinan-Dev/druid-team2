import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Project } from "../../classes/project";
import { addProject, setProject } from "../../features/druidSlice";

import { capitalStart } from "../../functions/capitalStart";
import { lowerCaseStart } from "../../functions/lowerCaseStart";

//service
import { postProject } from "../../services/druid";

const AddProject = () => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.druid.project);
  const projectAttrs = useSelector(state => state.druid.config.projects_attrs)
  const changeData = (e) => {
    dispatch(
      setProject({ ...project, [e.target.name]: capitalStart(e.target.value) })
    );
  };

  const createProject = (e) => {
    e.preventDefault();
    if (project.name && project.client) {
      dispatch(addProject(project));
      const projectObj = new Project(project.name, project.client);
      postProject(projectObj);
    } else {
      console.log("missing info in the project");
    }
  };

  return (
    <div className="addProject">
      <h3>Create new project</h3>
      <form className="addProjectForm" onSubmit={createProject}>

        <div className="addProjectInputs">
          <div className="projectNameInput">
              <label htmlFor="name">Project name: </label>
              <input type="text" name="name" id="name" onChange={changeData} />
            </div>
          <div className="customerInput">
            <label htmlFor="client">Customer company: </label>
            <input type="text" name="client" id="name" onChange={changeData} />
          </div>

          <div className="projectDetails">
            {
              projectAttrs.map((attr, i) => (
                <div className={`project${capitalStart(attr)}Input`} key={i}>
                  <label htmlFor={`${attr}`.toLowerCase()}>{attr}: </label>
                  <input type="text" name={`${attr}`.toLowerCase()} id={`${attr}`.toLowerCase()} onChange={changeData} />
                </div>
              ))
            }
          </div>
          
        </div>
        <input
          type="submit"
          value="Create project"
          className="createProjectButton"
        />
      </form>
    </div>
  );
};

export default AddProject;
