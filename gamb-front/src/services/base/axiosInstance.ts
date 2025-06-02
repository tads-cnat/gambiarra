import axios from "axios";
import {
	getAuthToken,
	setAuthToken,
	getAuthRefreshToken,
} from "../../auth/service/AuthStore";
// const baseURL = import.meta.env.VITE_API_URL;
const baseURL = "http://52.22.187.150:8000/api/v1";
;


// Criando a instância do Axios
const axiosInstance = axios.create({
	baseURL,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = getAuthToken();
		if (token !== undefined) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	async (error) => {
		await Promise.reject(error);
	}
);

// Interceptor para renovar o token
axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// Ignora rotas de autenticação para evitar loop
		const ignoredUrls = [`${baseURL}auth/token/`];

		if (ignoredUrls.some((url) => originalRequest.url?.startsWith(url))) {
			return Promise.reject(error);
		}

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const response = await axios.post(
					`${baseURL}auth/token/refresh/`,
					{
						refresh: getAuthRefreshToken(),
					}
				);
				if (!response.data.access) {
					console.error("Erro ao renovar o token: ", response.data);
					window.location.href = "/login";
					return Promise.reject(error);
				}

				setAuthToken(response.data.access);
				setAuthToken(response.data.refresh);

				axiosInstance.defaults.headers[
					"Authorization"
				] = `Bearer ${response.data.access}`;
				originalRequest.headers[
					"Authorization"
				] = `Bearer ${response.data.access}`;

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
