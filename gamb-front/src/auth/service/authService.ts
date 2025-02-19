import axiosInstance from "../../services/base/axiosInstance";
import BaseService from "../../services/base/baseService";
import { LoginSubmit } from "./auth";
import { UserActive } from "./user";
interface mensagem {
	sucesso: boolean;
	mensagem: string;
}

class authService extends BaseService {
	async loginAuth(data: LoginSubmit): Promise<mensagem> {
		return axiosInstance
			.post(`${this.serviceUrl}/auth/login/`, data)
			.then((response) => {
				if (response.status === 200) {
					localStorage.setItem("access_token", response.data.access);
					localStorage.setItem(
						"refresh_token",
						response.data.refresh
					);
					return {
						sucesso: true,
						mensagem: "Login Realizado com sucesso!",
					};
				} else {
					return { sucesso: false, mensagem: response.data.detail };
				}
			})
			.catch((error) => {
				return { sucesso: false, mensagem: error.message };
			});
	}

	async refreshToken(): Promise<unknown> {
		const refresh = localStorage.getItem("refresh_token");

		const response = await axiosInstance.post(
			`${this.serviceUrl}/auth/token/refresh/`,
			refresh
		);
		localStorage.setItem("access_token", response.data.access);
		localStorage.setItem("refresh_token", response.data.refresh);

		return response;
	}
	async profile(): Promise<boolean> {
		return await axiosInstance
			.get(`${this.serviceUrl}/auth/profile/`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"access_token"
					)}`,
				},
			})
			.then((response) => {
				const user: UserActive = response.data.data;
				localStorage.setItem(
					"user",
					user ? JSON.stringify(user) : ""
				);
				localStorage.setItem(
					"userActiveRole",
					response.data.data.grupo
				);
				return true;
			})
			.catch(() => {
				return false;
			});
	}
}
export default new authService("");
