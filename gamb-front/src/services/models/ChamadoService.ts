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
}

export default new ChamadoService("chamado/");
