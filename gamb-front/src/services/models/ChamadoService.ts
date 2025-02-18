import { ChamadoFilter } from "../../filters/ChamadoFilter";
import { ChamadoSubmit } from "../../interfaces/models/iChamado";
import axiosInstance from "../base/axiosInstance";
import BaseService from "../base/baseService";

class ChamadoService extends BaseService {
	async listarChamados(filters?: ChamadoFilter): Promise<unknown> {
		const filterList = filters 
			? Object.fromEntries(
				Object.entries(filters).filter(([value]) => value !== "")
			)
			: {};
	
		console.log(filterList);
		const response = await axiosInstance.get(`${this.serviceUrl}`, {
			params: filterList,
		});
	
		return response.data; // Retorna apenas os dados da resposta
	}
	
	async criarChamado(chamado: ChamadoSubmit): Promise<unknown> {
		const response = await this.post(chamado);
		return response;
	}

	async aceitarChamado(id: number): Promise<unknown> {
		const response = await axiosInstance.patch(
			`${this.serviceUrl}/${id}/alterar_status/`, {status: 2} )
		return response;
	}
	
	async encerrarChamado(id: number): Promise<unknown> {
		const response = await axiosInstance.patch(
		`${this.serviceUrl}/${id}/alterar_status/`, {status: 8} )
		return response;
	}

	async getChamadoID(id: number): Promise<unknown>{
		const response = await axiosInstance.get(
			`${this.serviceUrl}/${id}/`)
			return response;
	}
}

export default new ChamadoService("chamado");
