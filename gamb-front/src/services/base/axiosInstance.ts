import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/v1/";

class AxiosSingleton {
    static instance = null;

    constructor() {
        if (!AxiosSingleton.instance) {
            AxiosSingleton.instance = axios.create({
                baseURL,
                headers: {
                    'Authorization': `Bearer ${AxiosSingleton.getAccessToken()}`
                }
            });

            this.setupInterceptors();
        }
    }

    static getAccessToken() {
        return localStorage.getItem("access_token");
    }

    static getRefreshToken() {
        return localStorage.getItem("refresh_token");
    }

    static getInstance() {
        if (!AxiosSingleton.instance) {
            new AxiosSingleton();
        }
        return AxiosSingleton.instance;
    }

    setupInterceptors() {
        AxiosSingleton.instance.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const response = await axios.post(`${baseURL}auth/token/refresh/`, {
                            refresh: AxiosSingleton.getRefreshToken()
                        });

                        // Atualiza os tokens
                        localStorage.setItem("access_token", response.data.access);
                        localStorage.setItem("refresh_token", response.data.refresh);

                        // Atualiza o cabeçalho e refaz a requisição original
                        AxiosSingleton.instance.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
                        originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;

                        return AxiosSingleton.instance(originalRequest);
                    } catch (err) {
                        console.error("Erro ao renovar o token:", err);
                        return Promise.reject(err);
                    }
                }

                return Promise.reject(error);
            }
        );
    }
}

export default AxiosSingleton.getInstance();
