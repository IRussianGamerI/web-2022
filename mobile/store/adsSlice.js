import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ads: [],
    ad: {},
};

export const adSlice = createSlice({
    name: "ad",
    initialState,
    reducers: {
        setAds: (state, { payload }) => {
            state.ads = payload;
        },
        setAd: (state, { payload }) => {
            state.ad = payload;
        },
        resetAd: (state) => {
            state.ad = {};
        },
    },
});

export const adReducer = adSlice.reducer;

export const { setAds, setAd, resetAd } = adSlice.actions;
