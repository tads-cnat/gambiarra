import styled from "styled-components";
import { defaultTheme } from "../../styles/themes/default";
const theme = defaultTheme

export const InputText = styled.div<{
	$isInvalid?: boolean;
	$isValid?: boolean | null;
}>`
	border-radius: 6px;
	border: 1px solid
		${(props) =>
			props.$isInvalid
				? theme.cores.danger
				: props.$isValid
				? theme.cores.green_sucess_primary
				: theme.cores.black};
	background: ${theme.cores.white};
	color: ${(props) =>
		props.$isInvalid
			? theme.cores.danger
			: props.$isValid
			? theme.cores.green_sucess_primary
			: theme.cores.black};
	padding: 0.875rem;

	&::placeholder {
		color: ${theme.cores.gray_text};
	}

	display: flex;
	align-items: center;
	gap: 0.5rem;

	input {
		width: 100%;
	}
`;
