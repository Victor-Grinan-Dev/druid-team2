/*
import axios from "../api/axios";

const getDatabase = async () => {
    console.log("hello from getDatabase")
    const response = await axios.get();
    return response.data;
  };
  
  export default { getDatabase };
*/


  import axios from 'axios';
import { setProjects } from '../features/druidSlice';
  const baseUrl = 'http://localhost:8010/database';
  
  const getDatabase = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
  };
  
  export default { getDatabase };



export const initializeDatabase = async () => {

   // const data = await getDatabase()
   // console.log("initializer has runned", data);

    return async (dispatch) => { 
        const data = await getDatabase();
        dispatch(setProjects(data.projects));
        
        console.log("initializer returns values", data)
    }
  };