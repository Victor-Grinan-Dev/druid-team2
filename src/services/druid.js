import axios from 'axios';

  const baseUrl = 'http://localhost:8010/database';
  
  const getDatabase = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
  };
  
  export default { getDatabase };
