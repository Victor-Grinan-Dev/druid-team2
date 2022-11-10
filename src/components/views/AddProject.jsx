import React, { useEffect, useState } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setProject, addProject } from "../../features/druidSlice";

//classes
import { Project } from "../../classes/project";
import { Service } from "../../classes/service";

//components
import ProjectServiceRow from "../reusableComponents/ProjectServiceRow";

//service
import {
  getCustomers,
  getDefaultValues,
  getDevelopers,
  postProject,
} from "../../services/druid";

//functions
import { capitalStart } from "../../functions/capitalStart";

const AddProject = () => {
  const dispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState({});
  const [developers, setDevelopers] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    dispatch(setProject(new Project("name", "customer")));
    getDefaultValues().then((res) => {
      const temp = res;
      setDefaultValues(temp);
    });

    getDevelopers().then((res) => {
      const temp = res;
      setDevelopers(temp);
    });

    getCustomers().then((res) => {
      const unique = [];
      for (let item of res) {
        if (!unique.includes(item.company)) {
          unique.push(item.company);
        }
      }
      setCustomers(unique);
    });
  }, []);

  const config = useSelector((state) => state.druid.config);
  const project = useSelector((state) => state.druid.project);
  const serviceAttr = useSelector((state) => state.druid.config.service_attrs);

  const changeData = (e) => {
    dispatch(
      setProject({ ...project, [e.target.name]: capitalStart(e.target.value) })
    );
  };

  const changeDetail = (e) => {
    const [rowIndex, name] = e.target.name.split(" ");
    const service = project.services[rowIndex];
    const newService = { ...service, [name]: e.target.value };
    const newServices = project.services.filter((service) => {
      return parseInt(service.id, 10) !== parseInt(rowIndex, 10) + 1;
    });
    dispatch(
      setProject({ ...project, services: [...newServices, newService] })
    );
  };

  const createProject = (e) => {
    e.preventDefault();
    if (
      project.name &&
      project.customer &&
      (project.name !== "name" || project.customer !== "customer")
    ) {
      const newProject = new Project(project.name, project.customer);

      //newProject.code = genId();

      for (let attr of config.projects_attrs) {
        newProject[attr] = project[attr];
      }
      dispatch(addProject(newProject));
      postProject(newProject);
    } else {
      console.log("missing info in the project");
    }
  };

  const addRow = (e) => {
    e.preventDefault();
    const num = project.services.length + 1;
    const tempServ = {
      ...project,
      services: [...project.services, new Service(num, `url${num}`)],
    };
    //console.log(tempServ);
    dispatch(setProject(tempServ));
  };
  return (
    <div className="addProject">
      <h3>Create new project</h3>
      <form className="addProjectForm">
        <div className="addProjectInputs">
          <div className="essentials">
            <div className="input-section">
              <div>
                <label htmlFor="name">Project name: </label>
              </div>

              <input
                type="text"
                name="name"
                id="name"
                onChange={changeData}
                className="addProjInput"
              />
            </div>

            <div className="input-section">
              <div>
                <label htmlFor="customer">Customer: </label>
              </div>

              <select
                name="customer"
                id="name"
                onChange={changeData}
                className="addProjInput"
              >
                <option value="" hidden>
                  {" "}
                  Choose{" "}
                </option>
                {customers.map((cust, i) => {
                  return (
                    <option value={cust} key={i}>
                      {cust}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="input-section">
              <div>
                <label htmlFor="customer">Add developer:</label>
              </div>

              <select
                name="developers"
                onChange={changeData}
                className="addProjInput"
              >
                <option value="" hidden>
                  Choose
                </option>
                {developers.map((dev, i) => (
                  <option key={i} value={dev.username}>
                    {capitalStart(dev.username)}{" "}
                  </option>
                ))}
              </select>
              <p onClick={(e) => console.log("added", e.target.value)}>add +</p>
            </div>

            <div className="developersInput">
              <label htmlFor="developers"> Developers assigned:</label>
              {<p>[all developers in the project will show here]</p>}
            </div>
          </div>

          <div className="projDetailsContainer">
            <div className="projectDetails">
              {project?.services?.map((_, j) => (
                <div
                  className="row"
                  name={`${j}`}
                  key={j}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {serviceAttr?.map((attr, i) => (
                    <ProjectServiceRow
                      key={`${j}${i}`}
                      attr={attr}
                      changeDetail={changeDetail}
                      index={j}
                      defaultValues={defaultValues}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div>
            <button className="addRowButton" onClick={addRow}>
              Add row
            </button>
            <button className="resetButton">Reset</button>
          </div>
        </div>
        <input
          type="submit"
          value="Create project"
          className="createProjectButton"
          onClick={createProject}
        />
      </form>
    </div>
  );
};

export default AddProject;
