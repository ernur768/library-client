import axios from "axios";

// const API_URL = 'https://fine-pink-springbok-toga.cyclic.app/'
const API_URL = 'http://localhost:8080/'

const api = axios.create({
    withCredentials: true,
    credentials: 'include',
    baseURL: API_URL,
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status !== 401 || (originalRequest && originalRequest._isRetry)) {
            throw error
        }

        originalRequest._isRetry = true
        try {
            const response = await axios.get(`${API_URL}/auth/refresh`, {withCredentials: true});

            localStorage.setItem('token', response.data.accessToken);
            return await api.request(originalRequest)
        }
        catch (error) {
        }
    }
)

export {api}