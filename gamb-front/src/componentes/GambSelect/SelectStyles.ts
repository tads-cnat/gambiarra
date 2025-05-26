import styled from "styled-components";
import { defaultTheme } from "../../styles/themes/default";
const theme = defaultTheme

export const SelectText = styled.select<{
	isInvalid?: boolean;
	isValid?: boolean | null;
}>`
	border-radius: 6px;
	border: 1px solid
		${(props) =>
			props.isInvalid
				? theme.cores.danger
				: props.isValid
				? theme.cores.green_sucess_primary // Aqui está o verde para válido
				: theme.cores.black}; // Preta como padrão
	background: ${theme.cores.white};
	color: ${(props) =>
		props.isInvalid
			? theme.cores.danger
			: props.isValid
			? theme.cores.green_sucess_primary // Aqui está o verde para válido
			: theme.cores.black}; // Preta como padrão
	padding: 0.92rem;
	
	option{
    	color: ${theme.cores.gray_text};
  	}

	display: flex;
	align-items: center;
	gap: 0.5rem;

	width: 100%;

`;
