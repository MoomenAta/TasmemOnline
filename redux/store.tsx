import { configureStore } from "@reduxjs/toolkit";
import  asideReducer  from "./asideSlice";
import cartReducer from './cartSlice';
import loginUserReducer from "./firebaseLoginSlice";
import langReducer from "./langSlice";

export const store = configureStore({
    reducer : {
        cart : cartReducer,
        aside : asideReducer,
        loginUser : loginUserReducer,
        lang : langReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
