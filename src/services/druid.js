import axios from 'axios';

  const baseUrl = 'http://localhost:8010/database';
  
  const getDatabase = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
  };
  
  export default { getDatabase };

  export const postProject = async (newProject) => {
    const database = await getDatabase();
    const newDatabase = {...database, "projects": [ ...database.projects, newProject]}
    const response = await axios.patch(baseUrl, newDatabase)
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
    return response;
  }

  export const postUser = async (newUser) => {
    const database = await getDatabase();
    const newDatabase = {...database, "users": [ ...database.projects, newUser]}
    const response = await axios.patch(baseUrl, newDatabase)
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
    return response;
  }
