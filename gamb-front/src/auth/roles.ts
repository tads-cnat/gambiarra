export interface iuserRoles {
	INTERNO: {
		FUNCIONARIO: {
			GR: string;
			PR: string;
			BO: string;
		};
		CLIENTE: {
			AL: string;
			SE: string;
		};
	};
	EXTERNO: {
		CLIENTE: string;
	};
}
// class GrupoEnum:
//     GERENTE = "gerente"
//     PROFESSOR = "professor"
//     BOLSISTA = "bolsista"

//     SERVIDOR = "servidor"
//     CLIENTE = "cliente"
//     ALUNO = "aluno"

//     INTERNO = (GERENTE, PROFESSOR, BOLSISTA)
//     EXTERNO = (SERVIDOR, CLIENTE, ALUNO) # externos são clientes de todos os tipos
//     STAFF = (GERENTE, PROFESSOR)

// REPLICAR ESSA LÓGICA NO FRONT

export const userRoles: iuserRoles = {
	INTERNO: {
		FUNCIONARIO: {
			GR: "gerente",
			PR: "professor",
			BO: "bolsista",
		},
		CLIENTE: {
			AL: "aluno",
			SE: "servidor",
		},
	},
	EXTERNO: {
		CLIENTE: "cliente",
	},
};
