import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setCustomers, setIsLogged, setUser, setUsers } from "./features/druidSlice";

//ajax
import ajax from "./ajax/ajax";

//components
import Layout from "./pages/Layout";
import CustomersProjects from "./components/views/CustomersProjects";
import AddProject from "./components/views/AddProject";
import AddUser from "./components/views/AddUser";
import Home from "./components/Home";
import Users from "./components/views/Users";
import Invoices from "./components/views/Invoices";
import InvoiceSingle from "./components/views/InvoiceSingle";
import { Customers } from "./components/views/Customers";
import SingleProjectCard from "./components/views/projectCard/SingleProjectCard";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.druid.user);
  
   useEffect(() => {
    if (sessionStorage.getItem("druidLog")) {
      dispatch(setIsLogged(true));
      dispatch(setUser(JSON.parse(sessionStorage.getItem("druidLog")))); 
      getCustomers();
      getUsers();
    }    
   },[]);

   const getCustomers = async () => {
    try {
      const axios = await ajax();
      const response = await axios.get("/node/customers");
      //console.log("customers:", response.data);
      if (response.data) {
        dispatch(setCustomers(response.data))   ;
      }
    } catch (e) {
      alert(e);
    }
  }

  const getUsers = async () => {
    try {
      const axios = await ajax();
      const response = await axios.get("/admin/people/users");
      if (response.data) {
        dispatch(setUsers(response.data));
      }
    } catch (e) {
      alert(e);
    }
  }
  const views = () => {
    //console.log("who im I:", user?.current_user?.name, user?.current_user?.roles)
    return (
      <>
        <Route path="customersprojects" element={<CustomersProjects />} />
        <Route path="projectinfo/:name" element={<SingleProjectCard />} />
        <Route path="users" element={<Users />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="invoices/:uuid" element={<InvoiceSingle />} />
        <Route path="customers" element={<Customers />} />
        <Route path="adduser" element={<AddUser />} />
        <Route path="addproject" element={<AddProject />} />
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
