import {axios} from "axios"

const url = "http://127.0.0.1:8000"

export const getFlats = () =>
    axios
        .get(`${url}/Flats/`)
        .then((res) => res.data)
        .catch((err) => {
            throw JSON.stringify(err.response?.data);
        });

export const getFlatById = (id) =>
    axios
        .get(`${url}/Flats/${id}`)
        .then((res) => res.data)
        .catch((err) => {
            throw JSON.stringify(err.response?.data);
        });

export const addFlat = (flat) =>
    axios
        .post(`${url}/Flats/`, flat)
        .then((res) => res.data)
        .catch((err) => {
            throw JSON.stringify(err.response?.data);
        });

export const deleteFlatById = (id) =>
    axios
        .delete(`${url}/Flats/${id}`)
        .then((res) => res.data)
        .catch((err) => {
            throw JSON.stringify(err.response?.data)
        });