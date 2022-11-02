import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Project } from "../../classes/project";
import { Service } from "../../classes/service";
import { addProject, setProject } from "../../features/druidSlice";

import { capitalStart } from "../../functions/capitalStart";
import { genId } from "../../functions/genId";
import ProjectServiceRow from "../ProjectServiceRow";

//service
import { getDefaultValues, postProject } from "../../services/druid";

const AddProject = () => {
  const dispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState({});

  useEffect(() => {
    dispatch(setProject(new Project("name", "client")));
    getDefaultValues().then(res => {
      const temp = res;
      setDefaultValues(temp);
    })
  }, []);

  const config = useSelector((state) => state.druid.config);
  const project = useSelector((state) => state.druid.project);
  const serviceAttr = useSelector(state => state.druid.config.service_attrs);
  const projects = useSelector(state => state.druid.projects);

  const changeData = (e) => {
    dispatch(setProject({ ...project, [e.target.name]: capitalStart(e.target.value) }));
  };

  const changeDetail = (e) => {
    const[rowIndex, name] = e.target.name.split(" ")
    const service = project.services[rowIndex]
    const newService = {...service, [name]:e.target.value}
    const newServices = project.services.filter(service => {
      return parseInt(service.id, 10) !== parseInt(rowIndex, 10) + 1;
    })
    dispatch(setProject({...project, "services":[...newServices, newService]}))
  };

  //attributes
  const addAttr = (e) => {
    console.log(e.target.name)
    //const newInAttr = { id: ingredients.length + 1, ingredient: '', quantity: '' };
  }

  const createProject = (e) => {
    e.preventDefault()
    if ((project.name && project.client) && (project.name !== "name" || project.client !== "client")) {
      
      const newProject = new Project(project.name, project.client);
      
      newProject.code = genId();

      for (let attr of config.projects_attrs){
        newProject[attr] = project[attr]
      }
      dispatch(addProject(newProject));
      postProject(newProject);
    } else {
      console.log("missing info in the project");
    }
  };

  const addRow = (e) => {
    e.preventDefault()
    const num = project.services.length + 1;
    const tempServ = {...project, "services": [...project.services, new Service(num, `url${num}`)]}
    //console.log(tempServ);
    dispatch(setProject(tempServ))
  }
  return (
    <div className="addProject">
      <h3>Create new project</h3>
      <form className="addProjectForm">

        <div className="addProjectInputs" style={{display:"flex", flexDirection:"column"}}>

          <div className="essentials"  style={{display:"flex"}}>
            <div className="projectNameInput">
                <label htmlFor="name">Project name: </label>
                <input type="text" name="name" id="name" onChange={changeData} />
              </div>
            <div className="customerInput">
              <label htmlFor="client">Customer company: </label>
              <input type="text" name="client" id="name" onChange={changeData} />
            </div>

            <div className="developersInput">
              <label htmlFor="developers"> developers</label>
              <select onChange={changeData} >
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>

          </div>
          
          <div className="projectDetails" style={{display:"flex", fontSize:"8px", flexDirection:"column"}}>
            
            {
                project?.services?.map((_, j) => (
                  
                  <div className="row" name={`${j}`} key={j} style={{
                    display:"flex",
                    flexDirection:"row"
                  }}>

                  {serviceAttr?.map((attr, i) => (
                    
                      <ProjectServiceRow key={`${j}${i}`} attr={attr} changeDetail={changeDetail} index={j} defaultValues={defaultValues}/>
                    
                  ))
                  }
                  </div>
                ))
            }
            <button>reset</button>
          </div>
          <button style={{width:"75px", marginTop:"10px"}} onClick={addRow}>add row</button>
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