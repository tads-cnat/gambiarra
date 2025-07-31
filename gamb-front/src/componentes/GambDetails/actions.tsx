
import { isUserGerente, isUserProfessor } from "../../utils/checkRoleUser";
import GambButton from "../GambButton/Button";

const ATRIBUIR_TAREFA_LABEL = "Atribuir Tarefa";
const ALTERAR_STATUS_LABEL = "Alterar Status";
const ATRIBUIR_BOLSISTA_LABEL = "Atribuir Bolsistas";
const RESOLVER_CHAMADO_LABEL = "Resolver chamado";

export interface Action {
	name: string;
	typeBtn: "verde" | "vermelho" | "cinza" | "roxo" | "amarelo" | "inline";
	icon: string;
	label: string;
}

export const btnsPR: Record<number, Action[]> = {
	1: [
		{
			name: "aceitar",
			typeBtn: "verde",
			icon: "checkcircle",
			label: "Aceitar",
		},
		{
			name: "recusar",
			typeBtn: "vermelho",
			icon: "xcircle",
			label: "Recusar",
		},
	],
	2: [
		{
			name: "AtribuirTarefa",
			typeBtn: "cinza",
			icon: "clipboard",
			label: ATRIBUIR_TAREFA_LABEL,
		},

		{
			name: "AlterarStatus",
			typeBtn: "inline",
			icon: "gear",
			label: ALTERAR_STATUS_LABEL,
		},
		{
			name: "AtribuirBolsista",
			typeBtn: "amarelo",
			icon: "user",
			label: ATRIBUIR_BOLSISTA_LABEL,
		},
		{
			name: "ResolverChamado",
			typeBtn: "roxo",
			icon: "xcircle",
			label: RESOLVER_CHAMADO_LABEL,
		},
	],
	3: [
		{
			name: "AtribuirTarefa",
			typeBtn: "cinza",
			icon: "clipboard",
			label: ATRIBUIR_TAREFA_LABEL,
		},

		{
			name: "AlterarStatus",
			typeBtn: "inline",
			icon: "gear",
			label: ALTERAR_STATUS_LABEL,
		},
		{
			name: "AtribuirBolsista",
			typeBtn: "amarelo",
			icon: "user",
			label: ATRIBUIR_BOLSISTA_LABEL,
		},

		{
			name: "ResolverChamado",
			typeBtn: "roxo",
			icon: "xcircle",
			label: RESOLVER_CHAMADO_LABEL,
		},
	],
	4: [
		{
			name: "AtribuirTarefa",
			typeBtn: "cinza",
			icon: "clipboard",
			label: ATRIBUIR_TAREFA_LABEL,
		},

		{
			name: "AlterarStatus",
			typeBtn: "inline",
			icon: "gear",
			label: ALTERAR_STATUS_LABEL,
		},
		{
			name: "AtribuirBolsista",
			typeBtn: "amarelo",
			icon: "user",
			label: ATRIBUIR_BOLSISTA_LABEL,
		},
		{
			name: "ResolverChamado",
			typeBtn: "roxo",
			icon: "xcircle",
			label: RESOLVER_CHAMADO_LABEL,
		},
	],
	5: [
		{
			name: "AtribuirTarefa",
			typeBtn: "cinza",
			icon: "clipboard",
			label: ATRIBUIR_TAREFA_LABEL,
		},

		{
			name: "AlterarStatus",
			typeBtn: "inline",
			icon: "gear",
			label: ALTERAR_STATUS_LABEL,
		},
		{
			name: "AtribuirBolsista",
			typeBtn: "amarelo",
			icon: "user",
			label: ATRIBUIR_BOLSISTA_LABEL,
		},
		{
			name: "ResolverChamado",
			typeBtn: "roxo",
			icon: "xcircle",
			label: RESOLVER_CHAMADO_LABEL,
		},
	],
	6: [
		{
			name: "arquivar",
			typeBtn: "vermelho",
			icon: "archive",
			label: "Arquivar",
		},
	],
	7: [
		{
			name: "arquivar",
			typeBtn: "vermelho",
			icon: "archive",
			label: "Arquivar",
		},
	],
	8: [
		{
			name: "arquivar",
			typeBtn: "vermelho",
			icon: "archive",
			label: "Arquivar",
		},
	],
	9: [
		
	],
};

export const btnsGR: Record<number, Action[]> = {
	1: [],
	2: [],
	3: [],
	4: [],
	5: [],
	6: [],
	7: [],
	8: [],
	9: [
	],
};

export const btnClientes: Record<number, Action[]> = {
	1: [],
	2: [],
	3: [],
	4: [],
	5: [],
	6: [
		{ name: "Avaliar", typeBtn: "amarelo", icon: "star", label: "Avaliar" },
	],
	7: [
		{ name: "Avaliar", typeBtn: "amarelo", icon: "star", label: "Avaliar" },
	],
	8: [],
	9: [],
};

// Função que mapeia as ações para componentes <Notificacao />
export const getActionsByStatus = (
	status: number,
	idChamado: number,
	funct?: Record<string, (id: number) => void> // Parâmetro opcional para funções de ação
): React.JSX.Element[] => {
	const actions: Action[] = isUserGerente()
		? btnsGR[status]
		: isUserProfessor()
		? btnsPR[status]
		: btnClientes[status];

	return actions.map((action, index) => (
		<GambButton
			key={`${action.name}-${index}`}
			icon={action.icon}
			variant={action.typeBtn}
			label={action.label}
			onClick={() => {
				if (funct && funct[action.name]) {
					funct[action.name](idChamado);
				} else {
					console.log(
						`Ação: ${action.name} não definida! Defina a função correspondente.`
					);
				}
			}}
		/>
	));
};
