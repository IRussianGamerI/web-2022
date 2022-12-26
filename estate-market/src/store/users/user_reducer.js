import {createSlice} from "@reduxjs/toolkit";

const initialState = { authorized: false };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuth: (state) => {
            console.log('setAuth');
            state.authorized = !state.authorized;
        }
    }
});

export const userReducer = userSlice.reducer;
export const {setAuth} = userSlice.actions;