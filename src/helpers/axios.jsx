import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL


const axiosInstance = axios.create({
    baseURL: baseURL,
});

export default axiosInstance

export const axiosPrivateInstance = axios.create({
    baseURL: baseURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
