import {axios} from "axios"

const url = "http://127.0.0.1:8000"

export const getAds = () =>
    axios
        .get(`${url}/Ads/`)
        .then((res) => res.data)
        .catch((err) => {
            throw JSON.stringify(err.response?.data);
        });

export const getAdById = (id) =>
    axios
        .get(`${url}/Ads/${id}`)
        .then((res) => res.data)
        .catch((err) => {
            throw JSON.stringify(err.response?.data);
        });

export const addAd = (ad) =>
    axios
        .post(`${url}/Ads/`, ad)
        .then((res) => res.data)
        .catch((err) => {
            throw JSON.stringify(err.response?.data);
        });

export const deleteAdById = (id) =>
    axios
        .delete(`${url}/Ads/${id}`)
        .then((res) => res.data)
        .catch((err) => {
            throw JSON.stringify(err.response?.data)
        });