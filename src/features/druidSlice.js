import { createSlice } from "@reduxjs/toolkit";

export const druidSlice = createSlice({
    name: 'druid',
    initialState: {
        projects:[],
        user:{},
        config:{},//...or settings?

        //temporal
        isLoading:true,
        search:"",
        project:{},
        isDefaultDetails:false
    }, 
    reducers:{
        setProjects(state, action){
            state.projects = action.payload;
        },

        addProject(state, action){
            state.projects.push(action.payload);
        },

        setConfig(state, action){
            state.config = action.payload;
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
        },
        setIsDefaultDetails(state, action){
            state.isDefaultDetails = action.payload;
        }
    }
})

export const {
    setProjects,
    addProject,
    setConfig,

    //temporal
    isLoading,
    setSearch,
    setProject,
    setIsDefaultDetails
} = druidSlice.actions;

export default druidSlice.reducer;


