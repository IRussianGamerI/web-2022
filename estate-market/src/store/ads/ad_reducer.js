import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    ads: [],
    ad: {},
};

const adSlice = createSlice({
    name: "ad",
    initialState,
    reducers: {
        setAds: (state, {payload}) => {
            console.log('setAds');
            state.ads = payload.ads;
        },
        setAd: (state, {payload}) => {
            console.log('setAd');
            state.ad = payload;
        },
    },
});

export const adReducer = adSlice.reducer;

export const {setAds, setAd} = adSlice.actions;