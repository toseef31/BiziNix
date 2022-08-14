import axios from "axios";
import store from "./store";

const axiosClient = axios.create({
    baseURL: 'https://be-app-aials.ondigitalocean.app/api'
})

axiosClient.interceptors.request.use(config => {
    
    if (!config?.headers) {
        throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    
    config.headers.Authorization = `Bearer ${store.state.user.token}`;
    return config;
})

export default axiosClient;