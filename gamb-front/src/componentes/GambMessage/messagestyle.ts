import styled from "styled-components";
import { MessageType } from "../../interfaces/componentes/iGambMessage";
import { defaultTheme } from "../../styles/themes/default";

const theme = defaultTheme;

const getMessageColors = ($type: MessageType) => {
	switch ($type) {
		case "success":
			return {
				bg: theme.cores.green_sucess_secondary,
				border: theme.cores.green_sucess_primary,
				text: theme.cores.green_sucess_primary,
				icon: theme.cores.green_sucess_primary,
			};
		case "warning":
			return {
				bg: theme.cores.warning_secondary,
				border: theme.cores.warning,
				text: theme.cores.warning,
				icon: theme.cores.warning,
			};
		case "danger":
			return {
				bg: theme.cores.danger_secondary,
				border: theme.cores.danger,
				text: theme.cores.danger,
				icon: theme.cores.danger,
			};
		case "info":
			return {
				bg: theme.cores.purple_info_secondary,
				border: theme.cores.purple_info_primary,
				text: theme.cores.purple_info_primary,
				icon: theme.cores.purple_info_primary,
			};
		default:
			return {
				bg: theme.cores.white,
				border: theme.cores.gray_300,
				text: theme.cores.gray_300,
				icon: theme.cores.gray_300,
			};
	}
};

export const MessageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 16px 0;
	width: 100%;
`;

export const MessageWrapper = styled.div<{ $type: MessageType }>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-radius: 8px;
	padding: 0.5rem 1rem;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	width: 100%;
	max-width: 520px;
	min-width: 300px;

	${({ $type }) => {
		const { bg, border, text} = getMessageColors($type);
		return `
      background-color: ${bg};
      border: 1px solid ${border};
	  color: ${text};
    `;
	}}
`;

export const MessageIcon = styled.div<{ $type: MessageType }>`
	margin-right: 15px;
	font-size: 1.4rem;

	${({ $type }) => {
		const { icon } = getMessageColors($type);
		return `
      color: ${icon};
    `;
	}}
`;

export const MessageText = styled.div<{ $type: MessageType }>`
	flex-grow: 1;
	font-size: 1rem;
	display: inline-block;
	${({ $type }) => {
		const { text } = getMessageColors($type);
		return `
		font-color: ${text};
		color: ${text};
    `;
	}}
`;

export const CloseButton = styled.button<{ $type: MessageType }>`
	background: none;
	border: none;
	font-size: 1.2rem;
	cursor: pointer;

	${({ $type }) => {
		const { icon } = getMessageColors($type);
		return `
      color: ${icon};
    `;
	}}

	&:hover {
		opacity: 0.7;
	}
`;
