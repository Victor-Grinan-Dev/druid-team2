import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Project } from "./classes/project";

//components
import Layout from "./pages/Layout";
import TestPage from "./components/views/TestPage";
import CustomersProjects from "./components/views/CustomersProjects";
import ProjectInfo from "./components/views/ProjectInfo";

function App() {
  //read from database
  const database = [
    ["Worker Logger", "Jenna Koski Oy"],
    ["Poke App", "victor Grinan Oy"],
  ];

  const localRedux = [];
  //const workerLogger = new Project('Worker Logger', 'Jenna Koski Oy')

  //initialize data:
  database.forEach((project) => {
    localRedux.push(new Project(project[0], project[1]));
  });

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
