import { ChamadoFilter } from "../../filters/ChamadoFilter";
import { ChamadoSubmit } from "../../interfaces/models/iChamado";
import BaseService from "../base/baseService";

class ChamadoService extends BaseService {
	async listarChamados(filters: ChamadoFilter): Promise<unknown> {
		const response = await this.getAll(filters);
		return response;
	}
	async criarChamado(chamado: ChamadoSubmit): Promise<unknown> {
		const response = await this.post(chamado);
		return response;
	}
}

export default new ChamadoService("chamado");
