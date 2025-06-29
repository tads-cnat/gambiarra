import axiosInstance from "./axiosInstance";
import { BaseFilter } from "../../filters/BaseFilter";

class BaseService {
	serviceUrl: string; 

	constructor(serviceUrl: string) {
		this.serviceUrl = serviceUrl;
	}

	async getAll(filters: BaseFilter): Promise<unknown> {
		const response = await axiosInstance.get(`${this.serviceUrl}/`, {
			params: filters,
		});
		return response;
	}

	async get(id: number, filters?: unknown): Promise<unknown> {
		const response = await axiosInstance.get(`${this.serviceUrl}/${id}/`, {
			params: filters,
		});
		return response;
	}

	async post(data: unknown): Promise<unknown> {
		const response = await axiosInstance.post(`${this.serviceUrl}/`, data);
		return response;
	}

	async put(id: number | string, data: unknown): Promise<unknown> {
		const response = await axiosInstance.put(
			`${this.serviceUrl}/${id}/`,
			data
		);
		return response;
	}

	async patch(id: number | string, data: unknown): Promise<unknown> {
		const response = await axiosInstance.patch(
			`${this.serviceUrl}/${id}/`,
			data
		);
		return response;
	}

	async delete(id: number | string): Promise<unknown> {
		const response = await axiosInstance.delete(
			`${this.serviceUrl}/${id}/`
		);
		return response;
	}
}

export default BaseService;
