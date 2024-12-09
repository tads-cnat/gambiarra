import axiosInstance from "../base/axiosInstance";
import BaseService from "../base/baseService";
import { loginSubmit } from "./auth";

class authService extends BaseService {

	async loginAuth(data: loginSubmit): Promise<unknown> {
		const response = await axiosInstance.post(
			`${this.serviceUrl}/auth/login/`,
			data
		);
		localStorage.setItem("access_token", response.data.access);
		localStorage.setItem("refresh_token", response.data.refresh);
        // pegar o papel do usuário
		return response;
	}

    async refreshToken(): Promise<unknown> {
        const refresh = localStorage.getItem("refresh_token");

        const response = await axiosInstance.post(`${this.serviceUrl}/auth/token/refresh/`, refresh);
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
      
        
        return response;
    
    }
}
export default new authService("");
