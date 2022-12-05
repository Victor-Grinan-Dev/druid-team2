import React, { useEffect, useState } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setProject, addProject } from "../../features/druidSlice";

//classes
import { SevProject } from "../../classes/sevProject";
import { Service } from "../../classes/service";

//components
import ProjectServiceRow from "./ProjectServiceRow";
import { NodeForm } from "../../ajax/NodeForm";
import AddProjectView from "./AddProjectView";

//service
/*
import {
  getCustomers,
  getDefaultValues,
  getDevelopers,
  postProject,
} from "../../services/druid";
 */

//functions
import { capitalStart } from "../../functions/capitalStart";


const AddProject = () => {
  const dispatch = useDispatch();
  //const [defaultValues, setDefaultValues] = useState({});
  //const [developers, setDevelopers] = useState([]);
  //const [customers, setCustomers] = useState([]);

  useEffect(() => {
    //dispatch(setProject(new SevProject("name", "customer")));
    //getDefaultValues().then((res) => {
      //const temp = res;
      //setDefaultValues(temp);
    //});

    //getDevelopers().then((res) => {
      //const temp = res;
      //setDevelopers(temp);
    //});

    //getCustomers().then((res) => {
      //const unique = [];
      //for (let item of res) {
        //if (!unique.includes(item.company)) {
          //unique.push(item.company);
        //}
      //}
      //setCustomers(unique);
    //});
  }, [dispatch]);

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
      const newProject = new SevProject(project.name, project.customer);

      //newProject.code = genId();

      for (let attr of config.projects_attrs) {
        newProject[attr] = project[attr];
      }
      dispatch(addProject(newProject));
      //postProject(newProject);
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
      {/* <AddProjectView /> */}
      
      <NodeForm/>
    </div>
  );
};

export default AddProject;


