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

	async getAcessorio(id: number): Promise<unknown>{
		const response = await axiosInstance.get(
			`${this.serviceUrl}/${id}/get_acessorios_item/`)
			return response;
	}

	async alterarStatus(id: number, status: string): Promise<unknown>{
		const response = await axiosInstance.patch(
			`${this.serviceUrl}/${id}/alterar_status/`, {status} )
			return response;
	}
	
	async atribuirBolsista(id: number, bolsistas: number[]): Promise<unknown>{
		const response = await axiosInstance.patch(
			`${this.serviceUrl}/${id}/update_bolsistas/`, {bolsistas} )
			return response;
	}
}

export default new ChamadoService("chamado");
