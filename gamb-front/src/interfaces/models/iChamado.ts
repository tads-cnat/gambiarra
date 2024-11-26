export interface ChamadoSubmit {
	titulo: string;
	descricao: string;
	acessorios: string[];
	item: string;
}

export interface Chamados {
	id: number;
	codigo: string;
	titulo: string;
	cliente_id: number;
	professor_id?: number;
	status: string;
	avaliacao?: string;
}
// export interface Chamado {
// 	// estabelecer o retorno
// }
