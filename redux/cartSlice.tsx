import { createSlice , PayloadAction , current } from "@reduxjs/toolkit";
import { ProductWithQuantity } from "../types";

let  initialState : ProductWithQuantity[] = [];
if(typeof window !== 'undefined')
{
    document.cookie=`cartLength = ${initialState}`
    let x:string | null = localStorage.getItem('cart')
    if( typeof x === 'string' )
    {
        initialState = JSON.parse(x)
    }
    
}


export const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        amountIncrease : (state , id:PayloadAction<number>)=>{
            var itemInCartIndex = current(state).findIndex( (citem:ProductWithQuantity) => citem.id == id.payload )
            state[itemInCartIndex].quantity +=1;
        },
        amountDecrease : (state , id:PayloadAction<number>)=>{
            var itemInCartIndex = current(state).findIndex( (citem:ProductWithQuantity) => citem.id == id.payload )
            state[itemInCartIndex].quantity -=1;
        },
        addToCart : (state , item : PayloadAction<ProductWithQuantity>) =>  {
            var itemInCartIndex = current(state).findIndex( (citem:ProductWithQuantity) => citem.id == item.payload.id )
            if(itemInCartIndex > -1)
            {
                state[itemInCartIndex].quantity = item.payload.quantity;
            }else {
                return [...current(state) , { ...item.payload}]
            }
        },
        removeFromCart : (state , id : PayloadAction<number> ) => {
            if(state.length == 0) return;
            const newCart = current(state).filter((item : ProductWithQuantity) => (item.id !== id.payload))
            return newCart
        },
    }
})

export const { amountIncrease, amountDecrease, addToCart , removeFromCart } = cartSlice.actions
export default cartSlice.reducer