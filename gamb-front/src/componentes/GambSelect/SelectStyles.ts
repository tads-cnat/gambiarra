import styled from "styled-components";

export const SelectText = styled.select<{
	isInvalid?: boolean;
	isValid?: boolean | null;
}>`
	border-radius: 6px;
	border: 1px solid
		${(props) =>
			props.isInvalid
				? props.theme.cores.danger
				: props.isValid
				? props.theme.cores.green_sucess_primary // Aqui está o verde para válido
				: props.theme.cores.black}; // Preta como padrão
	background: ${(props) => props.theme.cores.white};
	color: ${(props) =>
		props.isInvalid
			? props.theme.cores.danger
			: props.isValid
			? props.theme.cores.green_sucess_primary // Aqui está o verde para válido
			: props.theme.cores.black}; // Preta como padrão
	padding: 0.92rem;

	option{
    	color: ${(props) => props.theme.cores.gray_text};
  	}

	display: flex;
	align-items: center;
	gap: 0.5rem;

	select {
		width: 100%;
		border: none;
		background: transparent;
		color: ${(props) => props.theme.cores.gray_text};
		outline: none;
	}
`;
