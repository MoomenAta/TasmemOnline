import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginUser } from "../types";
import { auth } from '../firebase.config';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    updateProfile,
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut 
    } from 'firebase/auth';


let initialState : {user : null | LoginUser} = {
    user : null
}


export const loginUserSlice = createSlice({
    name: 'user',
    initialState ,
    reducers:{
        login : (state , action : PayloadAction<LoginUser>) => {
            state.user = { ...action.payload}
        },
        logout : (state) =>{
            auth.signOut();
            state.user = null
        }

    }
})

export const {login , logout} = loginUserSlice.actions
export default loginUserSlice.reducer