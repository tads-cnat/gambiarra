import styled from "styled-components";

interface ButtonProps {
	variant: "verde" | "amarelo" | "vermelho" | "roxo" | "branco";
}

export const ButtonGeneric = styled.button<ButtonProps>`
	padding: 0.875rem 1.5rem;
	border-radius: 6px;
	cursor: pointer;
	border: 0;
	display: flex;
	align-items: center;

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
`;
