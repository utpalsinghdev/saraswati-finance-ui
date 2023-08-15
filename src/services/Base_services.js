import axios from "axios";
const unauthorizedCode = [401];

const BaseService = axios.create({
    timeout: 60000,
    baseURL: import.meta.env.VITE_BASE_URL,
});

BaseService.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;

        return Promise.reject(error);
    }
);

export default BaseService;