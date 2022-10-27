import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setProjects } from '../../features/druidSlice';
import { initializeDatabase } from '../../services/druid';

const TestPage = ({projectsArr}) => {
  const dispatch = useDispatch();
  

useEffect(()=> {
  initializeDatabase()
}, [])

const clicked = () => {
  dispatch(setProjects("victor has clicked"))
}
  return (
    <div className="App">
    <header className="App-header">
  <p onClick={clicked}>hello druid!</p>
    {/*
    <ol>
      {
        projects?.map((project, i) =>(
          <li key={i}>{project.name}</li>
        ))
      }
    </ol>
    */}
    </header>
  </div>
  )
}

export default TestPage;