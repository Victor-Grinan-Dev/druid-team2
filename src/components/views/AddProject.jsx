import React from 'react';
import { useState } from 'react';
import { Project } from '../../classes/project';
import { capitalStart } from '../../functions/capitalStart';

//service
import { postProject } from '../../services/druid';

const AddProject = () => {
    const [data, setData] = useState(new Project("", ""));

    const changeData = (e) => {
        setData({ ...data, [e.target.name]: capitalStart(e.target.value) });
      };

     const createProject = (e) => {
        e.preventDefault();
        if(data.project && data.client){
            console.log("project created", );
        }

     }

  return (
    <div>
        <p>AddProject</p>
        <form onSubmit={createProject}>

            <div >
              <label htmlFor="name">Name </label>
              <input type="text" name="name" id="name" onChange={changeData} />
            </div>

            <div >
              <label htmlFor="client">Client </label>
              <input type="text" name="client" id="name" onChange={changeData} />
            </div>
            <input type="submit" value="create project" />
        </form>

    </div>
  )
}

export default AddProject