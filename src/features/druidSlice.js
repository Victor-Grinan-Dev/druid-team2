import { createSlice } from "@reduxjs/toolkit";

export const druidSlice = createSlice({
    name: 'druid',
    initialState: {
        projects:[],
        user:{},
        isLoading:true,
        search:"",
        project:{}
    }, 
    reducers:{
        setProjects(state, action){
            state.projects = action.payload;
        },

        addProject(state, action){
            state.projects.push(action.payload);
        },
        
        //temporal slices
        isLoading(state, action){
            state.isLoading = action.payload;
        },
        setProject(state, action){
            state.project = action.payload;
        }
    }
})

export const {
    setProjects,
    addProject,

    isLoading,
    setProject
} = druidSlice.actions;

export default druidSlice.reducer;