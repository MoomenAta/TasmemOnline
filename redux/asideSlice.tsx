import { createSlice , PayloadAction , current } from "@reduxjs/toolkit";

const initialState : any = false;

export const asideSlice = createSlice({
    name : 'aside',
    initialState,
    reducers : {
        openAside : (state:boolean)=> {return state = true} ,
        closeAside : (state:boolean)=> {return state = false} 
    }
})

export const {openAside , closeAside} = asideSlice.actions;
export default asideSlice.reducer