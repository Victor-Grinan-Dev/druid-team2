import { createSlice } from "@reduxjs/toolkit";

export const druidSlice = createSlice({
    name: 'druid',
    initialState: {
        projects:[],
        user:{}
    }, 
    reducers:{
        setProjects(state, action){
            state.projects = action.payload;
        },

        addProject(state, action){
            state.projects.push(action.payload);
        },
    }
});

export default druidSlice.reducer;