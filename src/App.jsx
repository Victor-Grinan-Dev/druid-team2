import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLogged,
  setUser
} from "./features/druidSlice";
//import druidService from "./services/druid";

//components
import Layout from "./pages/Layout";
import ProjectInfo from "./components/views/ProjectInfo";
import CustomersProjects from "./components/views/CustomersProjects";
import AddProject from "./components/views/AddProject";
import AddUser from "./components/views/AddUser";
import Home from "./components/Home";
import Users from "./components/views/Users";
import Profile from "./components/views/Profile";
import Invoices from "./components/views/Invoices";
import InvoiceSingle from "./components/views/InvoiceSingle";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.druid.user);

   useEffect(() => {
    if (sessionStorage.getItem("druidLog")) {
      dispatch(setIsLogged(true));
      dispatch(setUser(JSON.parse(sessionStorage.getItem("druidLog"))));
    }
    // eslint-disable-next-line
   },[]);
  // where druid is coming from?
  
  // const userStr = localStorage.getItem("druid");
  // const userObj = JSON.parse(userStr);
  // const auth = sessionStorage.getItem("druidLog");
  // if (userObj.token === auth) {
  //   dispatch(setIsLogged(true));
  //   dispatch(setUser(userObj));
  // }
  // }
  // druidService.getDatabase().then((res) => {
  //   const projects = res.projects;
  //   const users = res.users;
  //   const config = res.config;
  //   dispatch(setProjects(projects));
  //   dispatch(setUsers(users));
  //   dispatch(setConfig(config));
  // });
  //   if (Cookies.get("druidLog")) {
  //     const cookie = Cookies.get("druidLog");
  //     for (let user of users) {
  //       if (user.id === cookie) {
  //         dispatch(setUser(user));
  //         dispatch(setIsLogged(true));
  //       }
  //     }
  //   }


  //   dispatch(isLoading(false));
  

  const views = () => {
    return (
      <>
        <Route path="customersprojects" element={<CustomersProjects />} />
        <Route path="projectinfo/:name" element={<ProjectInfo />} />
        {/* <Route path="userinfo/:name" element={<Profile />} /> */}
        <Route path="addproject" element={<AddProject />} />
        <Route path="adduser" element={<AddUser />} />
        <Route path="users" element={<Users />} />
        <Route path="profile" element={<Profile />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="invoices/:uuid" element={<InvoiceSingle />} />
      </>
    );
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route index element={<Home />} />
          {user.current_user && views()}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
