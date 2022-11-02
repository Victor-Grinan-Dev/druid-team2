import React, { useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { addProject, setProject } from "../../features/druidSlice";

//classes
import { Project } from "../../classes/project";
import { Service } from "../../classes/service";

//components
import ProjectServiceRow from "../ProjectServiceRow";

//service
import { postProject } from "../../services/druid";

//functions
import { capitalStart } from "../../functions/capitalStart";

const defaultValues = 
  {
    service:"[url]",	
    engine:"Drupal",
    version:"9.4",
    php:"8.0",
    node: "16",
    js:"webpack",
    drush:"Mailjet",
    omen:"Solr",
    dbs:"8",
    mails:"11",
    search:"MariaDB",
    cdn:"CloudFron",
    infra:"-",
    docker:"uselagoon",
    hosting:"Lagoon",
    deps:"Renovate",
    ci:"GHA",
    dev_n_main:"X" 
  }

const AddProject = () => {
  const dispatch = useDispatch();

  useEffect(() => {
  dispatch(setProject(new Project("name", "client")))
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

  const createProject = (e) => {
    e.preventDefault()
    if ((project.name && project.client) && (project.name !== "name" || project.client !== "client")) {
      
      const newProject = new Project(project.name, project.client);
      
      //newProject.code = genId();

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
            <div className="assignDevelopers">
              <label htmlFor="client">add developer</label>
              <select name="developers" onChange={changeData}>
                //map developer users as options
                <option value="developer 1">developer 1</option>
                <option value="developer 2">developer 2</option>
                <option value="developer 3">developer 3</option>
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