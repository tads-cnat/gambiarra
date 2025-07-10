export interface iuserRoles {
	INTERNO: {
		GERENTE: string;
		PROFESSOR: string;
		BOLSISTA: string;

	}
	EXTERNO: {
		CLIENTE: string;
		ALUNO: string;
		SERVIDOR: string;
	};
}


const GERENTE = "gerente";
const PROFESSOR = "professor";
const BOLSISTA = "bolsista";
const SERVIDOR = "servidor";
const CLIENTE = "cliente";
const ALUNO = "aluno";

export const userRoles: iuserRoles = {
	INTERNO: {
		
			GERENTE: GERENTE,
			PROFESSOR: PROFESSOR,
			BOLSISTA: BOLSISTA,
	},
	EXTERNO: {
			CLIENTE: CLIENTE,
			ALUNO: ALUNO,
			SERVIDOR: SERVIDOR,
	},
};
