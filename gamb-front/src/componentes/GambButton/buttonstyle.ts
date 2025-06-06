import styled from "styled-components";
import { defaultTheme } from "../../styles/themes/default";
const theme = defaultTheme;

interface ButtonProps {
	$variant:
		| "verde"
		| "amarelo"
		| "vermelho"
		| "roxo"
		| "branco"
		| "cinza"
		| "inline"
		| "circle";
	$size: "small" | "medium" | "large" | "mediumlg";
	$disabled?: boolean;
}

export const ButtonGeneric = styled.button<ButtonProps>`
	padding: ${({ $variant }) => ($variant == "circle" ? "8px" : "8px 20px")};
	border-radius: ${({ $variant }) => ($variant == "circle" ? "50%" : "6px")};
	border: 0;
	display: inline-flex;
	align-items: center;
	flex-shrink: 0;
	mouseout: pointer;
	font-size: ${({ $size }) => {
		switch ($size) {
			case "small":
				return `${theme.fontSize.font_scale_up_01}rem`;
			case "medium":
				return `${theme.fontSize.font_scale_up_02}rem`;
			case "mediumlg":
				return `${theme.fontSize.font_scale_up_02}rem`;
			case "large":
				return `${theme.fontSize.font_scale_up_default}rem`;
			default:
				return "1rem"; // Um valor padrão caso o tamanho não seja especificado
		}
	}};

	transition: 0.5s;

	/* variação de cores */
	background-color: ${({ $variant }) =>
		$variant === "verde"
			? theme.cores.green_sucess_primary
			: $variant === "amarelo"
			? theme.cores.warning
			: $variant === "vermelho"
			? theme.cores.danger
			: $variant === "cinza"
			? theme.cores.gray_light
			: $variant === "roxo"
			? theme.cores.purple_info_primary
			: $variant === "inline" || $variant === "circle"
			? "rgb(151,71,255,0)"
			: theme.cores.white};

	color: ${({ $variant }) =>
		$variant === "branco" ||
		$variant === "amarelo" ||
		$variant === "cinza" ||
		$variant === "inline" ||
		$variant === "circle"
			? theme.cores.gray_text
			: theme.cores.white};

	border: 1px solid
		${({ $variant }) =>
			$variant === "verde"
				? theme.cores.green_sucess_primary
				: $variant === "amarelo"
				? theme.cores.warning
				: $variant === "vermelho"
				? theme.cores.danger
				: $variant === "cinza"
				? theme.cores.gray_light
				: $variant === "roxo"
				? theme.cores.purple_info_primary
				: $variant === "inline"
				? theme.cores.gray_text
				: $variant === "circle"
				? theme.cores.white
				: theme.cores.black};

	opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
	cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
	pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};

	&:hover {
		background-color: ${({ $variant, $disabled }) =>
			$disabled
				? undefined
				: $variant === "verde"
				? theme.cores.green_sucess_secondary
				: $variant === "amarelo"
				? theme.cores.warning_second
				: $variant === "vermelho"
				? theme.cores.danger_hover
				: $variant === "cinza"
				? theme.cores.gray_300
				: $variant === "roxo"
				? theme.cores.purple_info_secondary
				: $variant === "inline" || $variant === "circle"
				? theme.cores.gray_300
				: theme.cores.light_white};

		color: ${({ $variant, $disabled }) =>
			$disabled
				? undefined
				: $variant === "branco" ||
				  $variant === "amarelo" ||
				  $variant === "cinza" ||
				  $variant === "inline" ||
				  $variant === "circle"
				? theme.cores.gray_text
				: theme.cores.white};
	}

	display: inline-flex; /* Alinha o conteúdo horizontalmente */
	gap: 2px;
	justify-content: space-between;
	width: auto; /* Remove a largura fixa e ajusta ao tamanho do conteúdo */
	white-space: nowrap; /* Impede que o texto seja quebrado em múltiplas linhas */
`;
