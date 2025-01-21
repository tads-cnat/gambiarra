import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/v1/";

// Função para obter tokens
const getAccessToken = () => localStorage.getItem("access_token");
const getRefreshToken = () => localStorage.getItem("refresh_token");

// Criando a instância do Axios
const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Authorization': `Bearer ${getAccessToken()}`
    }
});

// Interceptor para renovar o token
axiosInstance.interceptors.response.use(
    response => response, // Retorna a resposta diretamente se não houver erros
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await axios.post(`${baseURL}auth/token/refresh/`, {
                    refresh: getRefreshToken()
                });

                // Atualiza os tokens
                localStorage.setItem("access_token", response.data.access);
                localStorage.setItem("refresh_token", response.data.refresh);

                // Atualiza o cabeçalho e refaz a requisição original
                axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;

                return axiosInstance(originalRequest);
            } catch (err) {
                console.error("Erro ao renovar o token:", err);
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
