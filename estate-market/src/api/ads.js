import {axiosInstance} from "./axios_instance";

const url = "Ads";

export const getAds = () =>
    axiosInstance
        .get(`${url}/`)
        .then((res) => res.data)
        .catch((err) => {
            throw JSON.stringify(err.response?.data);
        });

export const getAdById = (id) =>
    axiosInstance
        .get(`${url}/${id}`)
        .then((res) => res.data)
        .catch((err) => {
            throw JSON.stringify(err.response?.data);
        });

export const addAd = (ad) =>
    axiosInstance
        .post(`${url}/`, ad)
        .then((res) => res.data)
        .catch((err) => {
            throw JSON.stringify(err.response?.data);
        });

export const deleteAdById = (id) =>
    axiosInstance
        .delete(`${url}/${id}`)
        .then((res) => res.data)
        .catch((err) => {
            throw JSON.stringify(err.response?.data)
        });