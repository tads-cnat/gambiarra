import styled from "styled-components";
import { MessageType } from "../../interfaces/componentes/iGambMessage";


export const MessageContainer = styled.div`
  display: flex; 
  justify-content: center; 
  align-items: center;
  margin: 16px 0; 
  width: 100%; 
`;

export const MessageWrapper = styled.div<{ type: MessageType }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  padding: clamp(0.8rem, 2vw, 1rem) clamp(1rem, 4vw, 2rem);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 520px;
  min-width: 300px; 

  background-color: ${({ type, theme }) =>
		type === "success"
			? theme.cores.green_sucess_secondary
			: type === "warning"
			? theme.cores.warning_second
			: type === "danger"
			? theme.cores.danger_hover
			: type === "info"
			? theme.cores.purple_info_secondary
			: theme.cores.white};
    border:2px solid ${({ type, theme }) =>
		type === "success"
			? theme.cores.green_sucess_primary
			: type === "warning"
			? theme.cores.warning
			: type === "danger"
			? theme.cores.danger
			: type === "info"
			? theme.cores.blue_info
			: theme.cores.white};
    color: ${({ type, theme }) =>
		["success", "info", "danger"].includes(type) 
			? theme.cores.white
			: type === "warning"
			? theme.cores.gray
			: theme.cores.white};
`;

export const MessageIcon = styled.div<{ type: MessageType }>`
  margin-right: 15px;
  font-size: 1.4rem;
  color: ${({ type, theme }) =>
		["success", "info", "danger"].includes(type) 
			? theme.cores.white
			: type === "warning"
			? theme.cores.gray
			: theme.cores.white};
`;

export const MessageText = styled.div`
  flex-grow: 1;  
  font-size: 1rem;
  display: inline-block;
`;

export const CloseButton = styled.button<{ type: MessageType }>`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: ${({ type, theme }) =>
		["success", "info", "danger"].includes(type) 
			? theme.cores.white
			: type === "warning"
			? theme.cores.gray
			: theme.cores.white};

  &:hover {
    opacity: 0.7;
  }
`;
