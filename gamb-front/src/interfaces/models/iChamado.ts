export interface ChamadoSubmit {
	titulo: string;
	descricao: string;
	item: {
		modelo: string;
		acessorios?: {
			nome: string;
		}[];
	};
}

export interface Chamados {
	id: number;
	codigo: string;
	titulo: string;
	cliente_id: {
		id: number;
		username: string;
	};
	professor_id?:{
		id: number;
		username: string;
	};
	status: {
		id: number;
		username: string;
	};
	avaliacao?: {
		texto: string;
		nota: number;
	};
}

export interface ChamadoFilterGerente {
	codigo?: string;
	titulo?: string;
	status?: string;
	avaliacao?: string;
	professor_id?: number;
	cliente_id?: number;
	bolsista_id?: number;
}

export interface ChamadoFilterGerente {
	codigo?: string;
	titulo?: string;
	status?: string;
	avaliacao?: string;
	professor_id?: number;
	cliente_id?: number;
	bolsista_id?: number;
}

export interface ChamadoFilterBolsista {
	codigo?: string;
	titulo?: string;
	status?: string;
	avaliacao?: string;
	professor_id?: number;
	cliente_id?: number;
}

export interface ChamadoFilterProfessor {
	codigo?: string;
	titulo?: string;
	status?: string;
	avaliacao?: string;
	cliente_id?: number;
	bolsista_id?: number;
}
// export interface Chamado {
// 	// estabelecer o retorno
// }
