import styled from "styled-components";

export const InputText = styled.div`
	border-radius: 6px;
	border: 1px solid ${(props) => props.theme.cores.black};
	background: ${(props) => props.theme.cores.white};
	color: ${(props) => props.theme.cores.black};
	padding: 0.875rem;

	&::placeholder {
		color: ${(props) => props.theme.cores.gray_text};
	}
	display: flex;
	align-items: center;
	gap: 0.5rem;

	input {
		width: 100%;
		border: none;
		background: transparent;
		color: ${(props) => props.theme.cores.gray_text};
		outline: none;
	}
`;
