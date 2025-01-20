import styled from "styled-components";
import { CardChamadoType } from "../../interfaces/componentes/iGambCardChamado";


export const CardChamadoContainer = styled.div`
  display: flex; 
  justify-content: center; 
  align-items: center;
  margin: 16px 0; 
  width: 100%; 
`;

export const CardChamadoWrapper = styled.div<{ type: CardChamadoType }>`
    display: flex;
    width: 324px;
    height: 116px;
    padding: 16px 8px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 8px;

  background-color: ${({ type, theme }) =>
		type === "concluidas"
			? theme.cores.green_sucess_primary
			: type === "pendentes"
			? theme.cores.warning_second
			: type === "recusadas"
			? theme.cores.danger_hover
			: type === "atribuidas"
			? theme.cores.purple_info_secondary
			: theme.cores.white};
    color: ${({ type, theme }) =>
		["atribuidas", "concluidas", "recusadas"].includes(type) 
			? theme.cores.white
			: type === "pendentes"
			? theme.cores.gray
			: theme.cores.white};
`;

export const CardChamadoIcon = styled.div<{ type: CardChamadoType }>`
    width: 100px;
    height: 100px;
    flex-shrink: 0;
  color: ${({ type, theme }) =>
		["atribuidas", "concluidas", "recusadas"].includes(type) 
			? theme.cores.white
			: type === "pendentes"
			? theme.cores.gray
			: theme.cores.white};
`;

export const TextContainer = styled.div`
    display: flex;
    width: 200px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    align-self: stretch;
`;

export const CardChamadoText = styled.div<{ type: CardChamadoType }>`
        font-feature-settings: 'liga' off, 'clig' off;
        font-family: Poppins;
        font-size: 28px;
        font-style: normal;
        font-weight: 300;
        line-height: 1.4; /* 114.286% */
    color: ${({ type, theme }) =>
		["atribuidas", "concluidas", "recusadas"].includes(type) 
			? theme.cores.white
			: type === "pendentes"
			? theme.cores.gray
			: theme.cores.white}; 
   
`;

export const CardChamadoText2 = styled.div<{ type: CardChamadoType }>`
        font-feature-settings: 'liga' off, 'clig' off;
        font-family: Poppins;
        font-size: 25px;
        font-style: normal;
        font-weight: 700;
        line-height: 32px;
    color: ${({ type, theme }) =>
		["atribuidas", "concluidas", "recusadas"].includes(type) 
			? theme.cores.white
			: type === "pendentes"
			? theme.cores.gray
			: theme.cores.white}; 
   
`;


