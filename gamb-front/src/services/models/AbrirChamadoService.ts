import { ChamadoFilter } from "../../filters/ChamadoFilter";
import { ChamadoSubmit } from "../../interfaces/models/iChamado";
import axiosInstance from "../base/axiosInstance";
import BaseService from "../base/baseService";

class AbrirChamadoService extends BaseService {
	async listarChamados(id: string, filters: ChamadoFilter): Promise<unknown> {
		const response = await axiosInstance.get(`chamados/${id}/cursos/`, {
			params: filters,
		});
		return response;
	}
	async criarChamado(chamado: ChamadoSubmit): Promise<unknown> {
		const response = await axiosInstance.post(`chamados/`, chamado);
		return response;
	}
}

export default new AbrirChamadoService("chamados/");
