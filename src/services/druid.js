import axios from 'axios';

  const baseUrl = 'http://localhost:8010/database';
  
  const getDatabase = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
  };
  
  export default { getDatabase };


  export const postProject = async (newProject) => {
    const response = await axios.post(`${baseUrl}/projects`, newProject)
    return response;
  }