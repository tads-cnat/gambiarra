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
			GR: "Gerente",
			PR: "Professor",
			BO: "Bolsista",
		},
		CLIENTE: {
			AL: "Aluno",
			SE: "Servidor",
		},
	},
	EXTERNO: {
		CLIENTE: "Cliente",
	},
};
