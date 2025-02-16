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
}

export default new ChamadoService("chamado/");
