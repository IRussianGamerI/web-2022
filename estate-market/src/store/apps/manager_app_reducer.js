import { createSlice } from '@reduxjs/toolkit';

const initialState = { apps: [] };

const appSlice = createSlice({
    name: 'apps',
    initialState,
    reducers: {
        setApplications: (state, { payload }) => {
            console.log('setApplications');
            state.apps = payload;
        },
    },
});

export const managerAppReducer = appSlice.reducer;

export const { setApplications } = appSlice.actions;
