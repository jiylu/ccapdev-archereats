import axios from "axios";

const baseUrl = import.meta.env.PROD ? import.meta.env.VITE_PRODUCTION_URL : import.meta.env.VITE_DEVELOPMENT_URL

const api = axios.create({
    baseURL: baseUrl
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    } 
    return config;
    },
    (error) => Promise.reject(error)
);

export default api;