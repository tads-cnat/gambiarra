import { MouseEvent } from "react";

export interface GambButtonProps {
	// Define a variante de cor do botão.
	variant:
		| "verde"
		| "amarelo"
		| "vermelho"
		| "roxo"
		| "branco"
		| "cinza"
		| "inline"
		| "circle";

	// Permite adicionar conteúdo filho dentro do botão (ícones, texto, etc.).
	children?: React.ReactNode;

	// Função a ser executada quando o botão for clicado.
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void; // Adicionar o tipo de evento aqui

	// Define o tipo do botão. Opções: "button" | "submit" | "reset".
	type?: "button" | "submit" | "reset";

	// Indica se o botão está desabilitado (inativo).
	disabled?: boolean;

	// Permite adicionar classes CSS personalizadas ao botão.
	className?: string;

	// Define estilos inline para o botão.
	style?: React.CSSProperties;

	// Texto exibido no botão.
	label?: string;

	// Define o atributo data-cypress para testes automatizados.
	dataCypress?: string;

	// Define o tamanho do botão. Opções: "small" | "medium" | "large".
	size?: "small" | "medium" | "large" | "mediumlg";

	// Define o ícone a ser exibido no botão.
	icon?: string;
	id?: string;

	'data-testid'?: string
}
