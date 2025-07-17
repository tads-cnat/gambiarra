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

type StatusProps = {
  $status: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
};

const getStatusColors = ({$status } : StatusProps) => {
  switch (Number($status)){
    case 1:
      return {
        bg: theme.cores.gray_100,
        border: theme.cores.gray_300,
        text: theme.cores.gray_600,
      };

    case 2:
      return{
        bg: theme.cores.green_sucess_secondary,
        border: theme.cores.green_sucess_primary,
        text: theme.cores.green_sucess_primary,
      };
    case 3:
      return{
        bg: theme.cores.warning_secondary,
        border: "#ce962f",
        text: "#ce962f",
      };
    case 4:
      return{
        bg: theme.cores.purple_info_secondary,
        border: theme.cores.purple_info_primary,
        text: theme.cores.purple_info_primary,
      };

    case 5:
      return{
        bg: theme.cores.blue_info_light,
        border: theme.cores.blue_info,
        text: theme.cores.blue_info_hover,
      };
    case 6:
      return{
        bg: theme.cores.gray_100,
        border: theme.cores.gray_700,
        text: theme.cores.gray_700,
      };
    default:
      return{
        bg: theme.cores.white,
        border: theme.cores.white,
        text: theme.cores.danger,
      };
  }
};

const actionColors: Record<number, string> = {
  1: "#9E9E9E",
  2: "#12A400",
  3: "#ce962f",
  4: "#7C74DA",
  5: "#a3d3ff",
  6: "#3b3b3b",
  7: "#117005",
};

export const StatusBadge = styled.span<StatusProps>`
  padding: 5px;
  border-radius: 50%;
  color: #fff;
  background: ${({ $status }): string => actionColors[$status] || "#DC3545"};
`;

export const ChamadosBadge = styled.span<StatusProps>`
  font-size: 12px;
  padding:  2px 5px;
  border-radius: 4px;
  ${({ $status }): string => {
    const { bg, border, text } = getStatusColors({$status});
    return `
      background-color: ${bg};
      border: 1px solid ${border};
      color: ${text};
    `;
  }}
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
