import axios from 'axios';
import { getToken } from './AuthService';

export const url = 'http://bolaoarte-001-site3.htempurl.com/';

const api = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use(async config => { 
    const token = getToken();    
    if (token) {
        config.headers.Authorization = 'Bearer '+token;
    }
    return config;
});

export default api;
