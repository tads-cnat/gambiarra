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
// export interface Chamado {
// 	// estabelecer o retorno
// }
