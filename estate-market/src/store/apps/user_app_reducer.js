import { createSlice } from '@reduxjs/toolkit';

const initialState = { apps: [] };

const appSlice = createSlice({
    name: 'apps',
    initialState,
    reducers: {
        setApplications: (state, { payload }) => {
            state.apps = payload;
        },
    },
});

export const userAppReducer = appSlice.reducer;

export const { setApplications } = appSlice.actions;
