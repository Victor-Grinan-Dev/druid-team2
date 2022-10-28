import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Project } from '../../classes/project';
import { addProject, setProject } from '../../features/druidSlice';

import { capitalStart } from '../../functions/capitalStart';

//service
import { postProject } from '../../services/druid';

const AddProject = () => {
    const dispatch = useDispatch()
    const project = useSelector(state => state.druid.project) 

    const changeData = (e) => {
        dispatch(setProject({...project, [e.target.name]: capitalStart(e.target.value)}))
      };

     const createProject = (e) => {
        e.preventDefault();
        if(project.name && project.client){
            dispatch(addProject(project))
            postProject(project)
        }else{
            console.log("missing info in the project")
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