import { createSlice } from "@reduxjs/toolkit";

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

export default druidSlice.reducer;