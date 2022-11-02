import { createSlice } from "@reduxjs/toolkit";
import { User } from "../classes/user";

export const druidSlice = createSlice({
    name: 'druid',
    initialState: {
        projects:[],
        user:{},
        users:[],
        config:{},//...or settings?

        //temporal
        isLoading:true,
        search:"",
        project: {},
        createUser: new User(" ", " "),

    }, 
    reducers:{
        setProjects(state, action){
            state.projects = action.payload;
        },
        addProject(state, action){
            state.projects = ([...state.projects, action.payload]);
        },
        setUser(state, action){
            state.user = action.payload;
        },
        setConfig(state, action){
            state.config = action.payload;
        },
        addUser(state, action){
            state.users = ([...state.users, action.payload]);
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
        setCreateUser(state, action){
            const [name, value] = action.payload;
            state.createUser = {
                ...state.createUser, 
                [name] : value
            };
        },

    }
})

export const {
    setProjects,
    addProject,
    setUser,
    setConfig,

    //temporal
    isLoading,
    setSearch,
    setProject,
    setCreateUser,

} = druidSlice.actions;

export default druidSlice.reducer;

