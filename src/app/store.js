import { configureStore } from "@reduxjs/toolkit";

import druidReducer from '../features/druidSlice';

export default configureStore({
    reducer:{
        druid: druidReducer,
    }
});