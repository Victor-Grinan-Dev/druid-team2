import { createSlice } from "@reduxjs/toolkit";
import { User } from "../classes/user";
import { getProjects } from "../ajax/services";

export const druidSlice = createSlice({
    name: 'druid',
    initialState: {
        //user
        user:{},
        isLogged:false,

        //data
        projects:[],
        customers:[],
        users:[],

        //temporal
        isLoading:true,
        search:"",
        searchBy:"",
    }, 
    
    reducers:{
        setUser(state, action){
            state.user = action.payload;
        },
        setIsLogged(state, action){
            state.isLogged = action.payload;
        },

        //data
        setUsers(state, action){
            state.users = action.payload;
        },
        setProjects(state, action){
            state.projects = action.payload;
        },
        setCustomers(state, action){
            state.customers = action.payload;
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
    
    //user
    setUser,
    setIsLogged,
    
    //data
    setCustomers,
    setProjects,
    setUsers,

    //temporal
    isLoading,
    setSearch,
    setSearchBy,


} = druidSlice.actions;



export default druidSlice.reducer;

