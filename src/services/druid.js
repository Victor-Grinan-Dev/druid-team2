import axios from "axios";
import { genId } from "../functions/genId";

const baseUrl = "http://localhost:8010/database";

const getDatabase = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// eslint-disable-next-line
export default { getDatabase };

export const postProject = async (newProject) => {
  const database = await getDatabase();
  const toPostProject = {
    ...newProject,
    id: database.projects.length + 1,
    code: genId(),
  };
  const newDatabase = {
    ...database,
    projects: [...database.projects, toPostProject],
  };
  const response = await axios
    .patch(baseUrl, newDatabase)
    .catch((err) => console.log(err));
  return response;
};

export const postUser = async (newUser) => {
  console.log("clicked")
  const database = await getDatabase();
  const toPostUser = {
    ...newUser,
    id: genId(8),
  };
  const newDatabase = { ...database, users: [...database.users, toPostUser] };
  const response = await axios
    .patch(baseUrl, newDatabase)
    .catch((err) => console.log(err));
  return response;
};
