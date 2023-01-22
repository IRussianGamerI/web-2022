import {createSlice} from "@reduxjs/toolkit";
import {axiosInstance} from "../../api/axios_instance";

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
        patchAdRequest: (state, {payload}) => {
            console.log('patchAdRequest');
            axiosInstance
                .patch(`Ads/${payload.AdID}/`, payload)
                .then((response) => {
                    console.log(response);
                    //state.ad = response.data;
                });
            state.ad = payload;
        },
        createAdRequest: (state, {payload}) => {
            console.log('createAdRequest');
            console.log(payload);
            axiosInstance
                .post(`Ads/`, payload)
                .then((response) => {
                    console.log(response);
                    //state.ad = response.data;
                });
            state.ad = payload;
        }
    },
});

export const adReducer = adSlice.reducer;

export const {setAds, setAd, patchAdRequest, createAdRequest} = adSlice.actions;