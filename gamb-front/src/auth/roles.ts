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
