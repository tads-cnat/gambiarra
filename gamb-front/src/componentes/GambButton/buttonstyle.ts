import styled from "styled-components";

interface ButtonProps {
	variant: "verde" | "amarelo" | "vermelho" | "roxo" | "branco";
	size: "small" | "medium" | "large";
}

export const ButtonGeneric = styled.button<ButtonProps>`
	padding: 8px 20px;
	border-radius: 6px;
	cursor: pointer;
	border: 0;
	display: inline-flex;
	align-items: center;
	flex-shrink: 0;
	font-size: ${({ size, theme }) => {
		switch (size) {
			case "small":
				return `${theme.fontSize.font_scale_up_01}rem`;
			case "medium":
				return `${theme.fontSize.font_scale_up_02}rem`;
			case "large":
				return `${theme.fontSize.font_scale_up_default}rem`;
			default:
				return "1rem"; // Um valor padrão caso o tamanho não seja especificado
		}
	}};

	transition: 0.5s;

	/* variação de cores */
	background-color: ${({ variant, theme }) =>
		variant === "verde"
			? theme.cores.green_sucess_primary
			: variant === "amarelo"
			? theme.cores.warning
			: variant === "vermelho"
			? theme.cores.danger
			: variant === "roxo"
			? theme.cores.purple_info_primary
			: theme.cores.white};

	color: ${({ variant, theme }) =>
		variant === "branco" || variant === "amarelo"
			? theme.cores.black
			: theme.cores.white};

	border: 1px solid
		${({ variant, theme }) =>
			variant === "verde"
				? theme.cores.green_sucess_primary
				: variant === "amarelo"
				? theme.cores.warning
				: variant === "vermelho"
				? theme.cores.danger
				: variant === "roxo"
				? theme.cores.purple_info_primary
				: theme.cores.black};

	&:hover {
		background-color: ${({ variant, theme }) =>
			variant === "verde"
				? theme.cores.green_sucess_secondary
				: variant === "amarelo"
				? theme.cores.warning_second
				: variant === "vermelho"
				? theme.cores.danger_hover
				: variant === "roxo"
				? theme.cores.purple_info_secondary
				: theme.cores.light_white};

		color: ${({ variant, theme }) =>
			variant === "branco" || variant === "amarelo"
				? theme.cores.black
				: theme.cores.white};
	}

	display: inline-flex; /* Alinha o conteúdo horizontalmente */
	gap: 2px;
	width: auto; /* Remove a largura fixa e ajusta ao tamanho do conteúdo */
	white-space: nowrap; /* Impede que o texto seja quebrado em múltiplas linhas */
`;
