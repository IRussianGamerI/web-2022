import {createSlice} from "@reduxjs/toolkit";

import {addFlatAction, deleteFlatAction, getFlatByIdAction, getFlatsAction} from "./flat_actions";

const initialState = {
    flat: undefined,
    flats: [],
    error: undefined
};

const flatSlice = createSlice({
    name: "flat",
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(addFlatAction.pending, (state) => {
            state.error = null;
        });
        builder.addCase(addFlatAction.fulfilled, (state, {payload}) => {
            state.flat = payload;
        });
        builder.addCase(addFlatAction.rejected, (state, {error}) => {
            state.error = error;
        });

        builder.addCase(getFlatsAction.pending, (state) => {
            state.error = null;
        });
        builder.addCase(getFlatsAction.fulfilled, (state, {payload}) => {
            state.flats = payload;
        });
        builder.addCase(getFlatsAction.rejected, (state, {error}) => {
            state.error = error;
        });

        builder.addCase(getFlatByIdAction.pending, (state) => {
            state.error = null;
        });
        builder.addCase(getFlatByIdAction.fulfilled, (state, {payload}) => {
            state.flat = payload;
        });
        builder.addCase(getFlatByIdAction.rejected, (state, {error}) => {
            state.error = error;
        });

        builder.addCase(deleteFlatAction.pending, (state) => {
            state.error = null;
        });
        builder.addCase(deleteFlatAction.fulfilled, (state) => {
        });
        builder.addCase(deleteFlatAction.rejected, (state, {error}) => {
            state.error = error;
        });
    }
})

export const resetFlatState = flatSlice.actions.reset;
export const flatReducer = flatSlice.reducer;