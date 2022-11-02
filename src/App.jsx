import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { isLoading, setConfig, setProjects, setUser } from "./features/druidSlice";
import druidService from './services/druid';

//components
import Layout from "./pages/Layout";
import ProjectInfo from "./components/views/ProjectInfo";
import CustomersProjects from "./components/views/CustomersProjects";
import AddProject from "./components/views/AddProject";
import AddUser from "./components/views/AddUser";

import Home from "./components/Home";
import Login from "./components/Login";
import { User } from "./classes/user";

const dummyUser = new User("victor", "pm")

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.druid.user)
  useEffect(() => {
    druidService.getDatabase().then((res) => {
      const projects = res.projects;
      const config = res.config;
      dispatch(setUser(dummyUser))
    
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
          <Route path="adduser" element={<AddUser />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;