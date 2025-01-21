export type CardChamadoUser = "bolsista" | "professor" | "cliente";

export type CardChamadoType = "atribuidas" | "concluidas" | "pendentes" | "recusadas";

export interface CardChamadoProps {
	// Usuario da mensagem
	userType: CardChamadoUser;

    // Tipo de mensagem
	messageType: CardChamadoType;

    // Quantidade de chamados
    quantity: number;

}