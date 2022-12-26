import {axiosInstance} from "./axios_instance";

const url = "http://127.0.0.1:8000";

export const getFlats = () =>
    axiosInstance
        .get(`${url}/Flats/`)
        .then((res) => res.data)
        .catch((err) => {
            throw JSON.stringify(err.response?.data);
        });

export const getFlatById = (id) =>
    axiosInstance
        .get(`${url}/Flats/${id}`)
        .then((res) => res.data)
        .catch((err) => {
            throw JSON.stringify(err.response?.data);
        });

export const addFlat = (flat) =>
    axiosInstance
        .post(`${url}/Flats/`, flat)
        .then((res) => res.data)
        .catch((err) => {
            throw JSON.stringify(err.response?.data);
        });

export const deleteFlatById = (id) =>
    axiosInstance
        .delete(`${url}/Flats/${id}`)
        .then((res) => res.data)
        .catch((err) => {
            throw JSON.stringify(err.response?.data)
        });