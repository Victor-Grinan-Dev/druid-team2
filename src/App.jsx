import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";

import druidService from './services/druid';
//components
import Layout from "./pages/Layout";
import Home from "./components/views/Home";

//import { initializeDatabase } from './features/druidSlice';
import { useEffect } from 'react';
import { setProjects } from "./features/druidSlice";

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
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

