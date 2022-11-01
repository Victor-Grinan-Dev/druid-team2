import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Project } from "../../classes/project";
import { Service } from "../../classes/service";
import { addProject, setIsDefaultDetails, setProject } from "../../features/druidSlice";

import { capitalStart } from "../../functions/capitalStart";
import { genId } from "../../functions/genId";
import ProjectServiceRow from "../ProjectServiceRow";

//service
import { postProject } from "../../services/druid";

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

  const [tempProj, setTemProj] = useState({})
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
              /*
              <div 
                        className={ attr === "Dev & Main" ? "dev-n-main detail-input" : `${attr} detail-input`.toLowerCase()} style={{
                          display:"flex",
                          flexDirection:"column"
                        }}>
                        <label htmlFor={`${attr}`.toLowerCase()}>{attr}: </label>
                        <input 
                            type="text" 
                            name= { attr === "Dev & Main" ? "dev_n_main" : `${j} ${attr}`.toLowerCase() }
                            id={ attr === "Dev & Main" ? "dev_n_main" : `${attr}`.toLowerCase() } 
                            onChange={changeDetail} 
                            style={{width:"50px", fontSize:"10px"}}
                            placeholder={ attr === "Dev & Main" ? defaultValues["dev_n_main"] :defaultValues[attr.toLowerCase()]}
                          />
                      </div>
              */
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

//default data: [url]	Drupal	9.4	8.0	16	webpack	Mailjet	Solr 8	11	x	MariaDB 10.5	CloudFront	-	uselagoon	Lagoon	Renovate	GHA	x

/* 
      project.services[0].service ? projectObj.service = project.service : projectObj.service = defaultValues["service"];
      project.services[0].engine ? projectObj.engine = project.engine : project[0].engine = defaultValues["engine"];
      project.services[0].version ? projectObj.version = project.version : project[0].version = defaultValues["version"];
      project.services[0].php ? projectObj.php = project.php : project[0].php = defaultValues["php"];
      project.services[0].node ? projectObj.node = project.node : project[0].node = defaultValues["node"];
      project.services[0].js ? projectObj.js = project.js : project.js = defaultValues["js"];
      project.services[0].drush ? projectObj.drush = project.drush : project[0].drush = defaultValues["drush"];
      project.services[0].omen ? projectObj.omen = project.omen : project[0].omen = defaultValues["omen"];
      project.services[0].dbs ? projectObj.dbs = project.dbs : project[0].dbs = defaultValues["dbs"];
      project.services[0].mails ? projectObj.mails = project.mails : project[0].mails = defaultValues["mails"];
      project.services[0].search ? projectObj.search = project.search : project[0].search = defaultValues["search"];
      project.services[0].cdn ? projectObj.cdn = project.cdn : project[0].cdn = defaultValues["cdn"];
      project.services[0].infra ? projectObj.infra = project.infra : project[0].infra = defaultValues["infra"];
      project.services[0].docker ? projectObj.docker = project.docker : project[0].docker = defaultValues["docker"];
      project.services[0].hosting ? projectObj.hosting = project.hosting : project[0].hosting = defaultValues["hosting"];
      project.services[0].deps ? projectObj.deps = project.deps : project[0].deps = defaultValues["deps"];
      project.services[0].ci ? projectObj.ci = project.ci : project[0].ci = defaultValues["ci"];
      project.services[0].dev_n_main ? projectObj.dev_n_main = project.dev_n_main : project[0].dev_n_main = defaultValues["dev_n_main"];
*/
/*
{
        "id": 1,
        "code": "iz11",
        "name": "poke app",
        "client": "victor oy",
        "devs": [
          "pravesh",
          "otto"
        ]
      },
      {
        "id": 2,
        "code": "63&*",
        "name": "countries app",
        "client": "margit oy",
        "devs": [
          "eric",
          "otto"
        ]
      },
      {
        "id": 3,
        "code": "4%n#",
        "name": "food app",
        "client": "jenna oy",
        "devs": [
          "pravesh",
          "toni"
        ]
      },
      {
        "id": 4,
        "code": "u%x2",
        "name": "project manager",
        "client": "jenna oy",
        "devs": [
          "ali",
          "otto"
        ]
      },
      {
        "id": 5,
        "developers": [],
        "name": "countries-app",
        "client": "Margit"
      }
*/