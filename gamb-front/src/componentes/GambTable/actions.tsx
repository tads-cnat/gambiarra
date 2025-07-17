import Notificacao from "../GambNotificao/Notificacao";
import { defaultTheme } from "../../styles/themes/default";
import { isUserGerente, isUserProfessor } from "../../utils/checkRoleUser";

export interface Action {
	name: string;
	colorIcon: string;
	background: string;
	icon: string;
}
const { cores } = defaultTheme;

const ACTIONS = {
	detalhar: {
		name: "detalhar",
		colorIcon: cores.purple_info_primary,
		background: cores.purple_info_secondary,
		icon: "eyeopen",
	},

	resolver: {
		name: "resolver",
		colorIcon: cores.green_sucess_primary,
		background: cores.green_sucess_secondary,
		icon: "checkcircle",
	},
	arquivar: {
		name: "arquivar",
		colorIcon: cores.danger,
		background: cores.danger_secondary,
		icon: "archive",
	},
	aceitar: {
		name: "aceitar",
		colorIcon: cores.green_sucess_primary,
		background: cores.green_sucess_secondary,
		icon: "checkcircle",
	},
	recusar: {
		name: "recusar",
		colorIcon: cores.danger,
		background: cores.danger_secondary,
		icon: "xcircle",
	},
	avaliar: {
		name: "avaliar",
		colorIcon: cores.warning,
		background: cores.warning_secondary,
		icon: "star",
	},
};

export const btnsPR: Record<number, Action[]> = {
	1: [ACTIONS.aceitar, ACTIONS.recusar, ACTIONS.detalhar],
	2: [ACTIONS.detalhar, ACTIONS.resolver],
	3: [ACTIONS.detalhar,  ACTIONS.resolver],
	4: [ACTIONS.detalhar,  ACTIONS.resolver],
	5: [ACTIONS.detalhar,  ACTIONS.resolver],
	6: [ACTIONS.detalhar,  ACTIONS.arquivar],
	7: [ACTIONS.detalhar,  ACTIONS.arquivar],
	8: [ACTIONS.detalhar, ACTIONS.arquivar],
	9: [ACTIONS.detalhar],
};

export const btnsGR: Record<number, Action[]> = {
	1: [ACTIONS.detalhar],
	2: [ACTIONS.detalhar],
	3: [ACTIONS.detalhar],
	4: [ACTIONS.detalhar],
	5: [ACTIONS.detalhar],
	6: [ACTIONS.detalhar],
	7: [ACTIONS.detalhar],
	8: [ACTIONS.detalhar],
	9: [ACTIONS.detalhar],
};

export const btnClientes: Record<number, Action[]> = {
	1: [ACTIONS.detalhar],
	2: [ACTIONS.detalhar],
	3: [ACTIONS.detalhar],
	4: [ACTIONS.detalhar],
	5: [ACTIONS.detalhar],
	6: [ACTIONS.detalhar, ACTIONS.avaliar],
	7: [ACTIONS.detalhar, ACTIONS.avaliar],
	8: [ACTIONS.detalhar],
	9: [ACTIONS.detalhar],
};

// Função que mapeia as ações para componentes <Notificacao />
export const getActionsByStatus = (
	status: number,
	idLinha: number,
	funct?: Record<string, (id: number) => void> // Parâmetro opcional para funções de ação
): React.JSX.Element[] => {
	const actions: Action[] = isUserGerente()
		? btnsGR[status]
		: isUserProfessor()
		? btnsPR[status]
		: btnClientes[status];

	return actions.map((action, index) => (
		<Notificacao
			key={`${action.name}-${index}`}
			icon={action.icon}
			$backgroundColor={action.background}
			badgeNumber={-1}
			size={30}
			$iconColor={action.colorIcon}
			onClick={() => {
				if (funct && funct[action.name]) {
					funct[action.name](idLinha);
				} else {
					console.log(
						`Ação: ${action.name} não definida! Defina a função correspondente.`
					);
				}
			}}
		/>
	));
};
