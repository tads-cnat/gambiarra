import { ChamadoFilter } from "../../filters/ChamadoFilter";
import { ChamadoSubmit } from "../../interfaces/models/iChamado";
import axiosInstance from "../base/axiosInstance";
import BaseService from "../base/baseService";

class ChamadoService extends BaseService {
	async listarChamados(filters?: ChamadoFilter): Promise<unknown> {
		const response = await axiosInstance.get(`${this.serviceUrl}`,{
			params: filters || {},
		});
		
		return response;
	}
	async criarChamado(chamado: ChamadoSubmit): Promise<unknown> {
		const response = await this.post(chamado);
		return response;
	}
	async aceitarChamado(id: number): Promise<unknown> {
		const response = await axiosInstance.patch(
			`${this.serviceUrl}${id}/alterar_status/`, {status: 2} )
		return response;
	}
	async encerrarChamado(id: number): Promise<unknown> {
		const response = await axiosInstance.patch(
			`${this.serviceUrl}${id}/alterar_status/`, {status: 8} )
		return response;
	}
}

export default new ChamadoService("chamado/");
