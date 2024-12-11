import { BaseFilter } from "./BaseFilter";

export interface ChamadoFilter extends BaseFilter {
	status?: "aceito" | "fechado" | "pendente";
}
