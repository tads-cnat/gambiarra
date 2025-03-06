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
	titulo: string;
	status: {
		id: number;
		username: string;
	};
	codigo: string;
	cliente_id: {
		id: number;
		username: string;
	};
	professor_id?:{
		id: number;
		username: string;
	};
	bolsista_id?:{
		id: number;
		username: string;
	};
	avaliacao?: {
		texto: string;
		nota: number;
	};
}

