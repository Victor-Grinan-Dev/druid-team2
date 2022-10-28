import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";

import druidService from "./services/druid";
//components
import Layout from "./pages/Layout";

import CustomersProjects from "./components/views/CustomersProjects";

import { useEffect } from "react";
import { setProjects } from "./features/druidSlice";

import ProjectInfo from "./components/views/ProjectInfo";
import Home from "./components/Home";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    druidService.getDatabase().then((res) => {
      const projects = res.projects;
      dispatch(setProjects(projects));
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="customersprojects" element={<CustomersProjects />} />
          <Route path="projectinfo" element={<ProjectInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
