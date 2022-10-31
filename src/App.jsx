import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect } from 'react';

//redux
import { useDispatch } from "react-redux";
import { isLoading, setConfig, setProjects } from "./features/druidSlice";
import druidService from './services/druid';

//components
import Layout from "./pages/Layout";
import ProjectInfo from "./components/views/ProjectInfo";
import CustomersProjects from "./components/views/CustomersProjects";
import AddProject from "./components/views/AddProject";
import Home from "./components/Home";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    druidService.getDatabase().then((res) => {
      const projects = res.projects;
      const config = res.config;
      dispatch(setProjects(projects));
      dispatch(setConfig(config));
      dispatch(isLoading(false));
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />
          <Route path="customersprojects" element={<CustomersProjects />} />
          <Route path="projectinfo" element={<ProjectInfo />} />
          <Route path="addproject" element={<AddProject />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
