import { createSlice } from "@reduxjs/toolkit";

export const druidSlice = createSlice({
    name: 'druid',
    initialState: {
        projects:[],
        user:{},

        //temporal
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
        setSearch(state, action){
            state.search = action.payload;
        },
        setProject(state, action){
            state.project = action.payload;
        }
    }
})

export const {
    setProjects,
    addProject,

    //temporal
    isLoading,
    setSearch,
    setProject
} = druidSlice.actions;

export default druidSlice.reducer;