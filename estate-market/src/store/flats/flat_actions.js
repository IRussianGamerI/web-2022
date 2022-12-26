import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    addFlat,
    deleteFlatById,
    getFlatById,
    getFlats
} from "../../api/flats";

export const addFlatAction = createAsyncThunk(
    "flats/addFlat",
    async (flat) => {
        return await addFlat(flat);
    }
);

export const deleteFlatAction = createAsyncThunk(
    "flats/deleteFlat",
    async (id) => {
        return await deleteFlatById(id);
    }
);

export const getFlatByIdAction = createAsyncThunk(
    "flats/getFlatById",
    async (id) => {
        return await getFlatById(id);
    }
);

export const getFlatsAction = createAsyncThunk(
    "flats/getFlats",
    async () => {
        return await getFlats();
    }
);
