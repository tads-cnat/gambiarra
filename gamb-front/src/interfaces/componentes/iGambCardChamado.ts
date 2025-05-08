import { userRoles } from "../../auth/service/AuthStore";

// Se o tipo de usuário já é definido em userRoles, podemos usá-lo diretamente
export type CardChamadoCardKey =
	| "atribuidas"
	| "concluidas"
	| "pendentes"
	| "recusadas"
	| "cadastrados"
	| "resolvidos"
	| "fechados";

export interface CardChamadoProps {
	// Tipo do usuário (ex.: "bolsista", "professor", "cliente", etc.)
	userType: userRoles;
	// Chave do cartão fixo a ser exibido
	cardKey: CardChamadoCardKey;
	// Quantidade de chamados ou tarefas
	quantity: number;
}
