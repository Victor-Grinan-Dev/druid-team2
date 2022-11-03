import { configureStore } from "@reduxjs/toolkit";
import druidReducer from '../features/druidSlice';

export default configureStore({
   

    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

    
    reducer:{
        druid: druidReducer,
    }
});