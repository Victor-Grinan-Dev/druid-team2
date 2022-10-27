import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";

import druidService from './services/druid';
//components
import Layout from "./pages/Layout";
import Home from "./components/views/Home";

//import { initializeDatabase } from './features/druidSlice';
import { useEffect } from 'react';
import { setProjects } from "./features/druidSlice";

function App() {
  const dispatch = useDispatch();
  const projects = useSelector((state)=>{
    return state.druid.projects;
  })

  useEffect(() => {//hooks cant be use out of react components
    //console.log("useEffct in app.jsx");
    //initializeDatabase();
    const database = druidService.getDatabase();
    dispatch(setProjects(database.projects))
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

/*


    <Route index element={} />
*/
