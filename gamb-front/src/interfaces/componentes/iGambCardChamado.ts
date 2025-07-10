import { UserRoles } from "../../auth/service/AuthStore";

// Se o tipo de usuário já é definido em userRoles, podemos usá-lo diretamente
export type CardChamadoCardKey =
	| "atribuidos"
	| "concluidos"
	| "pendentes"
	| "recusados"
	| "cadastrados"
	| "resolvidos"
	| "solicitados"
	| "fechados";

export interface CardChamadoProps {
	// Tipo do usuário (ex.: "bolsista", "professor", "cliente", etc.)
	userType: UserRoles;
	// Chave do cartão fixo a ser exibido
	cardKey: CardChamadoCardKey;
	// Quantidade de chamados ou tarefas
	quantity: number;
}
