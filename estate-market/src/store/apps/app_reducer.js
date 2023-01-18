import { createSlice } from '@reduxjs/toolkit';

const initialState = { application: [] };

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setApplication: (state, { payload }) => {
            console.log('setApplication');
            state.application = payload;
        },
    },
});

export const appReducer = appSlice.reducer;

export const { setApplication } = appSlice.actions;
