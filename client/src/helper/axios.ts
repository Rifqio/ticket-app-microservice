import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_PATH,
    timeout: 1000,
});

export default instance;