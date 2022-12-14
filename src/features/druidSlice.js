import { createSlice } from "@reduxjs/toolkit";
import { User } from "../classes/user";
import { getProjects } from "../ajax/services";

export const druidSlice = createSlice({
    name: 'druid',
    initialState: {
        projects:[],
        user:{},
        isLogged:false,
        users:[],
        config:{},//...or settings?

        //temporal
        isLoading:true,
        search:"",
        searchBy:"",
        project: {},
        createUser: new User(" ", " "),
        editUser:{},
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
        setIsLogged(state, action){
            state.isLogged = action.payload;
        },
        setUsers(state, action){
            state.users = action.payload;
        },
        addUser(state, action){
            state.users = ([...state.users, action.payload]);
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
        setSearchBy(state, action){
            state.searchBy = action.payload;
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

        setEditUser(state, action){
            state.editUser = action.payload;
        }
    }
})

export const initializeData = () => {
    //userType
    return async (dispatch) => {
        const response = await getProjects();
        console.log("init", response);
        //dispatch(setProjects());
    }
}

export const {
    setProjects,
    addProject,
    setUser,
    setIsLogged,
    setUsers,
    addUser,
    setConfig,

    //temporal
    isLoading,
    setSearch,
    setSearchBy,
    setProject,
    setCreateUser,
    setEditUser,
} = druidSlice.actions;



export default druidSlice.reducer;

