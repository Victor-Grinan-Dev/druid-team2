import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Project } from "../../classes/project";
import { addProject, setIsDefaultDetails, setProject } from "../../features/druidSlice";

import { capitalStart } from "../../functions/capitalStart";
import { genId } from "../../functions/genId";


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
  const project = useSelector((state) => state.druid.project);
  const projectAttrs = useSelector(state => state.druid.config.projects_attrs)
  const isDefaultDetails = useSelector(state => state.druid.isDefaultDetails)
  const changeData = (e) => {
    if(e.target.name === "name" || e.target.name === "client"){
      dispatch(
        setProject({ ...project, [e.target.name]: capitalStart(e.target.value) })
      );
    }else if (e.target.name === "defaultDetails"){
      dispatch(setIsDefaultDetails(!isDefaultDetails))
    }else{
      dispatch(
        setProject({ ...project, [e.target.name]: [ [...e.target.name], capitalStart(e.target.value)] })
      );
    }
  };
  //attributes
  const addAttr = (e) => {
    console.log(e.target.name)
    //const newInAttr = { id: ingredients.length + 1, ingredient: '', quantity: '' };
  }

  const createProject = (e) => {
    e.preventDefault();
    if (project.name && project.client) {
      dispatch(addProject(project));
      const projectObj = new Project(project.name, project.client);

      projectObj.service = project.service;
      projectObj.engine = project.engine;
      projectObj.version = project.version;
      projectObj.php = project.php;
      projectObj.node = project.node;
      projectObj.js = project.js;
      projectObj.drush = project.drush;
      projectObj.omen = project.omen;
      projectObj.dbs = project.dbs;
      projectObj.mails = project.mails;
      projectObj.search = project.search;
      projectObj.cdn = project.cdn;
      projectObj.infra = project.infra;
      projectObj.docker = project.docker;
      projectObj.hosting = project.hosting;
      projectObj.deps = project.deps;
      projectObj.ci = project.ci;
      projectObj.dev_n_main = project.dev_n_main;

      projectObj.code = genId();

      postProject(projectObj);
    } else {
      console.log("missing info in the project");
    }
  };

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

            <div className="default details">
              <label htmlFor="defaultDetails">use default details: </label>
              <input type="checkbox" name="defaultDetails" id="defaultDetails" onChange={changeData} />
            </div>
          </div>
          
          <div className="projectDetails" style={{display:"flex", fontSize:"8px"}}>
            {
              projectAttrs.map((attr, i) => (
                
                <div key={i}
                  className={ attr === "Dev & Main" ? "dev-n-main detail-input" : `${attr} detail-input`.toLowerCase()} >
                  <label htmlFor={`${attr}`.toLowerCase()}>{attr}: </label>
                  <input 
                      type="text" 
                      name= { attr === "Dev & Main" ? "dev_n_main" : `${attr}`.toLowerCase() }
                      id={ attr === "Dev & Main" ? "dev_n_main" : `${attr}`.toLowerCase() } 
                      onChange={changeData} 
                      style={{width:"50px", fontSize:"10px"}}
                      value={isDefaultDetails ? defaultValues[attr.toLowerCase()] : " - "}
                    />
                </div>
              ))
            }
            
          </div>
          <button style={{width:"75px", marginTop:"10px"}}>add row</button>
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
const addIngrdient = (e) => {
    e.preventDefault();
    const newIngredient = { id: ingredients.length + 1, ingredient: '', quantity: '' };
    setIngredients([...ingredients, newIngredient])
  }
          <div className={css.ingredientsArea}>             
            <p>Ingredients</p>         
              {ingredients.map((_, i) => {
                    return (

                      <div key={i} className={css.spacedIngredients}>
                        <div className={css.spaced}>
                            <label htmlFor="ingredient">Ingredient </label>
                            <input type="text" name="ingredient" id="ingredient" onChange={(e) => changeIngredient(e, i)} className={css.input2} />
                            <br></br>
                        </div>
                                       
                        <div className={css.spaced}>
                            <label htmlFor="quantity">Quantity </label>
                            <input type="text" name="quantity" id="quantity" onChange={(e) => changeIngredient(e, i)} className={css.input2} />
                        </div>
   
                      </div>
                    );
              })}
              <div>
                <button onClick={addIngrdient}>Add ingredient</button>
              </div>
              
            </div>
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
        "name": "Food-app",
        "client": "Margit"
      }
*/