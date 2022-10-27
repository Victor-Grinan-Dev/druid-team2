import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";

import druidService from './services/druid';
//components
import Layout from "./pages/Layout";

import CustomersProjects from "./components/views/CustomersProjects";

import { useEffect } from 'react';
import { setProjects } from "./features/druidSlice";

import TestPage from "./components/views/TestPage";
import CustomersProjects from "./components/views/CustomersProjects";
import ProjectInfo from "./components/views/ProjectInfo";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    druidService.getDatabase().then(res => {
      const projects = res.projects;
      dispatch(setProjects(projects));
    });

  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<TestPage />} />
          <Route path="customersprojects" element={<CustomersProjects />} />
          <Route path="projectinfo" element={<ProjectInfo />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



