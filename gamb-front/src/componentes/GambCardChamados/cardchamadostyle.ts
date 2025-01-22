import styled from "styled-components";
import { CardChamadoType } from "../../interfaces/componentes/iGambCardChamado";

export const CardChamadoContainer = styled.div`
  display: flex;
  margin: 1rem 0 1rem;

`;

export const CardChamadoWrapper = styled.div<{ type: CardChamadoType }>`
  display: flex;
  width: 15rem;
  height: 5rem;
  padding: 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  border-radius: 0.375rem;
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
  width: 5rem;
  height: 4.5rem;
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
  width: 8rem;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  align-self: stretch;
`;

export const CardChamadoText = styled.div<{ type: CardChamadoType }>`
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: Poppins;
  font-size: 1.1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2;
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
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.2;
  color: ${({ type, theme }) =>
    ["atribuidas", "concluidas", "recusadas"].includes(type)
      ? theme.cores.white
      : type === "pendentes"
      ? theme.cores.gray
      : theme.cores.white};
`;