import axiosInstance from "../../services/base/axiosInstance";
import BaseService from "../../services/base/baseService";
import { loginSubmit } from "./auth";
import { userRoles } from "../roles";
class authService extends BaseService {
	async loginAuth(data: loginSubmit): Promise<unknown> {
		try {
			const response = await axiosInstance.post(
				`${this.serviceUrl}/auth/login/`,
				data
			);
			const papel = response.data.papel; // O papel vindo da API

			if (response.status === 200) {
				localStorage.setItem("access_token", response.data.access);
				localStorage.setItem("refresh_token", response.data.refresh);

				if (
					Object.values(userRoles.INTERNO.FUNCIONARIO).includes(
						papel
					) ||
					Object.values(userRoles.INTERNO.CLIENTE).includes(papel) ||
					Object.values(userRoles.EXTERNO).includes(papel)
				) {
					localStorage.setItem("Role", papel); // Armazena o papel no localStorage
				} else {
					throw new Error(
						"Papel de utilizador recebido da API é inválido ."
					);
				}
				return response.data;
			}
		} catch (error) {
			return error.response;
		}
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
}
export default new authService("");
