import { createSlice , PayloadAction } from "@reduxjs/toolkit";

const initialState : boolean = true;

export const langSlice = createSlice({
    name : 'lang',
    initialState,
    reducers : {
        enlang : (state:boolean)=> {return !state} ,
    }
})

export const {enlang } = langSlice.actions;
export default langSlice.reducer