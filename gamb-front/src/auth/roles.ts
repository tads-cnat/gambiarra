interface iuserRoles {
	INTERNO: {
		FUNCIONARIO: {
			GR: "Gerente";
			PR: "Professor";
			BO: "Bolsista";
		};
		CLIENTE: {
			AL: "Aluno";
			SE: "Servidor";
		};
	};
	EXTERNO: {
		CLIENTE: "Cliente";
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
