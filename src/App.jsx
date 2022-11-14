import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import Cookies from "js-cookie";

//redux
import { useDispatch, useSelector } from "react-redux";
import { isLoading, setConfig, setIsLogged, setProjects, setUser, setUsers } from "./features/druidSlice";
import druidService from './services/druid';

//ajax
import ajax from './ajax';
import events from 'events'

//components
import Layout from "./pages/Layout";
import ProjectInfo from "./components/views/ProjectInfo";
import CustomersProjects from "./components/views/CustomersProjects";
import AddProject from "./components/views/AddProject";
import AddUser from "./components/views/AddUser";
import Home from "./components/Home";
import Users from "./components/views/Users";
import Profile from "./components/views/Profile";

// Create an emitter object so that we can do pub/sub
const emitter = new events.EventEmitter();

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.druid.user);
 
  useEffect(() => {
    druidService.getDatabase().then((res) => {
      const projects = res.projects;
      const users = res.users;

      const config = res.config;
      dispatch(setProjects(projects));
      dispatch(setUsers(users));
      dispatch(setConfig(config));

      if(Cookies.get("druidLog")){
        const cookie = Cookies.get("druidLog")
        for (let user of users){
          if(user.id === cookie){
            dispatch(setUser(user))
            dispatch(setIsLogged(true))
          }
        }
      }
    });
    
    dispatch(isLoading(false));
  }, [dispatch]);

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
          {/*
          <NodeList />
          <NodeForm />
          */}
      </>
    )
    
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route index element={<Home />} />
          {user.username && views()}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/*


function App() {
  return (
    <div className="App">

      <main>
        <div className="node-list">
          
          
        </div>
        
      </main>

    </div>
  );
}



const NodeForm = () => {
  const data = {}
  // note the 'async' keyword, it allows us to call 'await' later
  const handleSubmit = async (e) => {
    e.preventDefault()
    const node = {     
      type: [{
        target_id: 'article',
        target_type: 'node_type',
      }],
      title: [{
        value: data.title,
      }],
      body: [{
        value: data.body,
        format: 'plain_text',
      }],
    };
    try {
      const axios = await ajax() // wait for an initialized axios object
      const response = await axios.post('/node/', node) // wait for the POST AJAX request to complete
      console.log('Node created: ', response.data)
      emitter.emit('NODE_UPDATED')
    } catch (e) {
      alert(e)
    }
  }
  const handleChange = (e, propName) => {
    data[propName] = e.target.value
  }

  return (
    <div className="create-node-form">
      <h4>Create Node Form</h4>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <br />
        <input type="text" onChange={e => handleChange(e, 'title')}></input>
        <br />
        <label>Body</label>
        <br />
        <textarea onChange={e => handleChange(e, 'body')}></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App;
*/