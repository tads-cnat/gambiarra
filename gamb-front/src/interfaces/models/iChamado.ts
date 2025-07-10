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

export interface ChamadoCardsResponse {
  gerente?: {
    cadastrados: number;  // Total geral
    pendentes: number;         // Ainda não resolvidos
    resolvidos: number;        // Resolvidos
    fechados: number;          // Encerrados
  };
  bolsista?: {
    atribuidos: number;   // Chamados atribuídos ao bolsista
    concluidos: number;        // Finalizados pelo bolsista
    pendentes: number;         // Em andamento
  };
  professor?: {
    atribuidos: number;   // Chamados atribuídos ao professor
    concluidos: number;        // Finalizados
    pendentes: number;         // Em andamento
    recusados: number;         // Chamados recusados
  };
  clientes?: {
    solicitados: number;  // Chamados abertos pelo cliente
    concluidos: number;        // Finalizados
    pendentes: number;         // Em aberto
    recusados: number;         // Rejeitados
  };
}

		