import styled from "styled-components";
import { CardChamadoCardKey } from "../../interfaces/componentes/iGambCardChamado";
import { defaultTheme } from "../../styles/themes/default";

export const CardChamadoContainer = styled.div`
	display: flex;
	margin: 1rem 0;
`;
const theme = defaultTheme

export const CardChamadoWrapper = styled.div<{ $cardKey: CardChamadoCardKey }>`
	display: flex;
	width: 15rem;
	height: 5rem;
	padding: 0.75rem;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	flex-shrink: 0;
	border-radius: 0.375rem;
	background-color: ${({ $cardKey }) =>
		$cardKey === "concluidos"
			? theme.cores.green_sucess_primary
			: $cardKey === "pendentes"
			? theme.cores.warning_second
			: $cardKey === "recusados"
			? theme.cores.danger_hover
			: $cardKey === "atribuidos"
			? theme.cores.purple_info_secondary
			: $cardKey === "cadastrados" || $cardKey === "solicitados"
			? theme.cores.purple_info_primary
			: $cardKey === "resolvidos"
			? theme.cores.green_sucess_primary
			: $cardKey === "fechados"
			? theme.cores.danger
			: theme.cores.white};
	color: ${({ $cardKey }) =>
		["atribuidas", "concluidos", "recusados"].includes($cardKey)
			? theme.cores.white
			: $cardKey === "pendentes"
			? theme.cores.gray_text
			: theme.cores.white};
`;

export const CardChamadoIcon = styled.div<{ $cardKey: CardChamadoCardKey }>`
	width: 5rem;
	height: 4.5rem;
	flex-shrink: 0;
	color: ${({ $cardKey}) =>
		["atribuidas", "concluidos", "recusados"].includes($cardKey)
			? theme.cores.white
			: $cardKey === "pendentes"
			? theme.cores.gray_text
			: theme.cores.white};
`;

export const TextContainer = styled.div`
	display: flex;
	width: 8rem;
	flex-direction: column;
	justify-content: center;
	flex-shrink: 0;
	align-self: stretch;
`;

export const CardChamadoText = styled.div<{ $cardKey: CardChamadoCardKey }>`
	font-feature-settings: "liga" off, "clig" off;
	font-family: Poppins;
	font-size: 1.1rem;
	font-style: normal;
	font-weight: 400;
	line-height: 1.2;
	color: ${({ $cardKey }) =>
		["atribuidas", "concluidos", "recusados"].includes($cardKey)
			? theme.cores.white
			: $cardKey === "pendentes"
			? theme.cores.gray_text
			: theme.cores.white};
`;

export const CardChamadoText2 = styled.div<{ $cardKey: CardChamadoCardKey }>`
	font-feature-settings: "liga" off, "clig" off;
	font-family: Poppins;
	font-size: 1.2rem;
	font-style: normal;
	font-weight: 700;
	line-height: 1.2;
	color: ${({ $cardKey }) =>
		["atribuidas", "concluidos", "recusados"].includes($cardKey)
			? theme.cores.white
			: $cardKey === "pendentes"
			? theme.cores.gray_text
			: theme.cores.white};
`;
