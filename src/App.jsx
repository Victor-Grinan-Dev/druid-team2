import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect } from 'react';

//redux
import { useDispatch } from "react-redux";
import { isLoading, setProjects } from "./features/druidSlice";
import druidService from './services/druid';

//components
import Layout from "./pages/Layout";
import ProjectInfo from "./components/views/ProjectInfo";
import CustomersProjects from "./components/views/CustomersProjects";
import AddProject from "./components/views/AddProject";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    druidService.getDatabase().then(res => {
      const projects = res.projects;
      dispatch(setProjects(projects));
      dispatch(isLoading(false))
    });

  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route path="customersprojects" element={<CustomersProjects />} />
          <Route path="projectinfo" element={<ProjectInfo />} />
          <Route path="addproject" element={<AddProject />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



