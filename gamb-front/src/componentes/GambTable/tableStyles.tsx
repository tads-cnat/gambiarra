import styled from "styled-components";
import { defaultTheme } from "../../styles/themes/default";
const theme = defaultTheme

export const HeadTr = styled.tr`
  display: flex;
  height: 66.4px;
  align-items: flex-start;
  align-self: stretch;
  background: ${theme.cores.white};
`;

// Necessário olhar a largura mínima das células; se a tela diminuir, elas podem sair do container da dashboard.

const actionColors: Record<number, string> = {
  1: "#9E9E9E",
  2: "#12A400",
  3: "#ce962f",
  4: "#7C74DA",
  5: "#61B3FF",
  6: "#3b3b3b",
  7: "#117005",

};

interface StatusProps {
  $status: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

export const StatusBadge = styled.span<StatusProps>`
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  font-size: 12px;
  background: ${({ $status }) => actionColors[$status] || "#DC3545"};
`;

export const HeadTh = styled.th`
  display: flex;
  height: 66px;
  min-width: 200px;
  max-width: 200px;
  max-height: 200px;
  padding: 20px;
  align-items: center;
  gap: 10px;
  font-weight: 600;
`;

export const BodyTr = styled.tr`
  display: flex;
  height: 66.4px;
  align-items: flex-start;
  align-self: stretch;
  background: ${theme.cores.white};
  border-bottom: 1px solid ${theme.cores.gray_light};
  /* Removendo duplicação: background: #fff; */
`;

export const BodyTd = styled.td`
  display: flex;
  min-width: 200px;
  max-width: 200px;
  padding: 20px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  /* Ajustando para garantir truncamento */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* Forçando os filhos a respeitarem o truncamento */
  > * {
    text-overflow: ellipsis;
  }
`;

export const Table = styled.table`
  overflow-x: auto;
`;
