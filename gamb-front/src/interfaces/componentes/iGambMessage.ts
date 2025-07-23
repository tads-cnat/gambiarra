export type MessageType = "success" | "info" | "warning" | "danger";

export interface MessageProps {
	// Tipo de mensagem
	type: MessageType;

	// Texto a ser exibido
	text: string;

	viewClose?: boolean;

	datacypress?: string;
}
