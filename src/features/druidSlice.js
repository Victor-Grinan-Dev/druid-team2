import { createSlice } from "@reduxjs/toolkit";
import druidService from "../services/druid";

export const druidSlice = createSlice({
    name: 'druid',
    initialState: {
        projects:[],
        user:{},
        isLoading:true
    }, 
    reducers:{
        setProjects(state, action){
            state.projects = action.payload;
        },

        addProject(state, action){
            state.projects.push(action.payload);
        },

        isLoading(state, action){
            state.isLoading = action.payload;
        }
    }
})

export const {
    setProjects,
    addProject,
    isLoading
} = druidSlice.actions;

/*
export const initializeDatabase = async () => {

    const data = await druidService.getDatabase()
    console.log("initializer has runned", data);

    return async (dispatch) => { 
        const data = await druidService.getDatabase() 
        dispatch(setProjects(data.projects));
        
        console.log("initializer returns values", data)
    }
  };
*/

export default druidSlice.reducer;

/*
    console.log("we got to initializer");//ok
    return async (dispatch) => {
      const database = await druidService.getDatabase();
      console.log("database", database);
      dispatch(setProjects(database.projects));
      dispatch(isLoading(false));
    };
*/