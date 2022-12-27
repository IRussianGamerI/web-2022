import {createSlice} from "@reduxjs/toolkit";

const initialState = {cart: []};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, {payload}) => {
            state.cart = payload;
        },
    },
});

export const cartReducer = cartSlice.reducer;

export const {setCart} = cartSlice.actions;
