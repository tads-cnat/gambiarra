import styled from "styled-components";
import { defaultTheme } from "../../styles/themes/default";
const theme = defaultTheme;

// Interface para definir as cores permitidas
interface ColorProps {
	color?: "roxo" | "azul";
}

export const FilterTitleContainer = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	gap: 8px;
	align-self: stretch;
	width: 100%;

	p {
		display: inline-block; /* Garante que o <p> só ocupe o tamanho do texto */
	}
`;

// Bolinha colorida
export const Bolinha = styled.div<ColorProps>`
	width: 14px;
	height: 14px;
	background-color: ${({ color }): string =>
		color === "roxo"
			? theme.cores.purple_info_primary
			: color === "azul"
			? theme.cores.blue_info
			: theme.cores.green_sucess_primary};
	border-radius: 50%;
	margin-right: 8px;
`;

// Linha colorida (corrigida)
export const Linha = styled.hr<ColorProps>`
	flex-grow: 1; /* Faz a linha ocupar todo o espaço disponível */
	height: 2px; /* Define a espessura */
	background-color: ${({ color }): string =>
		color === "roxo"
			? theme.cores.purple_info_primary
			: color === "azul"
			? theme.cores.blue_info
			: theme.cores.green_sucess_primary};
	border: none; /* Remove a borda padrão */
	margin-left: 10px;
`;
