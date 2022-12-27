import axios from 'axios';

export const axiosInstance = axios.create({ baseURL: 'http://192.168.0.106:8000/'});
