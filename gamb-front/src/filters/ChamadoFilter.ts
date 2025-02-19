import { BaseFilter } from "./BaseFilter";

export interface ChamadoFilter extends BaseFilter {
	status?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
	titulo?: string;
	descricao?: string;
	professor_id?: number;
	bolsistas_id?: number;
	cliente_id?: number;
	avaliacao?: string;
	search?: string;
	
}
