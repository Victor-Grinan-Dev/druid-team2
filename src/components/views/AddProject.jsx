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
    }else{
      dispatch(
        setProject({ ...project, [e.target.name]: capitalStart(e.target.value) })
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

 
      project.service ? projectObj.service = project.service : projectObj.service = defaultValues["service"];
      project.engine ? projectObj.engine = project.engine : project.engine = defaultValues["engine"];
      project.version ? projectObj.version = project.version : project.version = defaultValues["version"];
      project.php ? projectObj.php = project.php : project.php = defaultValues["php"];
      project.node ? projectObj.node = project.node : project.node = defaultValues["node"];
      project.js ? projectObj.js = project.js : project.js = defaultValues["js"];
      project.drush ? projectObj.drush = project.drush : project.drush = defaultValues["drush"];
      project.omen ? projectObj.omen = project.omen : project.omen = defaultValues["omen"];
      project.dbs ? projectObj.dbs = project.dbs : project.dbs = defaultValues["dbs"];
      project.mails ? projectObj.mails = project.mails : project.mails = defaultValues["mails"];
      project.search ? projectObj.search = project.search : project.search = defaultValues["search"];
      project.cdn ? projectObj.cdn = project.cdn : project.cdn = defaultValues["cdn"];
      project.infra ? projectObj.infra = project.infra : project.infra = defaultValues["infra"];
      project.docker ? projectObj.docker = project.docker : project.docker = defaultValues["docker"];
      project.hosting ? projectObj.hosting = project.hosting : project.hosting = defaultValues["hosting"];
      project.deps ? projectObj.deps = project.deps : project.deps = defaultValues["deps"];
      project.ci ? projectObj.ci = project.ci : project.ci = defaultValues["ci"];
      project.dev_n_main ? projectObj.dev_n_main = project.dev_n_main : project.dev_n_main = defaultValues["dev_n_main"];

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

          </div>
          
          <div className="projectDetails" style={{display:"flex", fontSize:"8px"}}>
            {
              projectAttrs.map((attr, i) => (
                
                <div key={i}
                  className={ attr === "Dev & Main" ? "dev-n-main detail-input" : `${attr} detail-input`.toLowerCase()} style={{
                    display:"flex",
                    flexDirection:"column"
                  }}>
                  <label htmlFor={`${attr}`.toLowerCase()}>{attr}: </label>
                  <input 
                      type="text" 
                      name= { attr === "Dev & Main" ? "dev_n_main" : `${attr}`.toLowerCase() }
                      id={ attr === "Dev & Main" ? "dev_n_main" : `${attr}`.toLowerCase() } 
                      onChange={changeData} 
                      style={{width:"50px", fontSize:"10px"}}
                      placeholder={ attr === "Dev & Main" ? defaultValues["dev_n_main"] :defaultValues[attr.toLowerCase()]}
                    />
                </div>
              ))
            }
            <button>reset</button>
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