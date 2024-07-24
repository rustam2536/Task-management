import axios from 'axios';

class ApiService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: 'http://localhost:3003/api/',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.apiClient.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.apiClient.interceptors.response.use(
            (response) => {
                return response.data;
            },
            (error) => {
                if (error.response.status === 401) {
                    console.log('Unauthorized, logging out...');
                }
                return Promise.reject(error);
            }
        );
    }

    request(method, url, data = null, params = null) {
        return this.apiClient({
            method,
            url,
            data,
            params,
        });
    }
}

export default new ApiService();