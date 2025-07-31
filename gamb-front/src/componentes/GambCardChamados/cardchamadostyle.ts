import styled from "styled-components";
import { CardChamadoCardKey } from "../../interfaces/componentes/iGambCardChamado";
import { defaultTheme } from "../../styles/themes/default";

const theme = defaultTheme;

const getCardColors = ($cardKey: CardChamadoCardKey) => {
  switch ($cardKey) {
    case "concluidos":
    case "resolvidos":
      return {
        bg: theme.cores.green_sucess_secondary,
        border: theme.cores.green_sucess_primary,
        text: theme.cores.green_sucess_primary,
		icon: theme.cores.green_sucess_primary,
      };
    case "pendentes":
      return {
        bg: theme.cores.warning_secondary,
        border: theme.cores.warning,
        text: theme.cores.warning,
		icon: theme.cores.warning,
      };
    case "recusados":
    case "fechados":
      return {
        bg: theme.cores.danger_secondary,
        border: theme.cores.danger,
        text: theme.cores.danger,
		icon: theme.cores.danger,
      };
    case "atribuidos":
    case "cadastrados":
    case "solicitados":
      return {
        bg: theme.cores.purple_info_secondary,
        border: theme.cores.purple_info_primary,
        text: theme.cores.purple_info_primary,
		icon: theme.cores.purple_info_primary, 
      };
    default:
      return {
        bg: theme.cores.white,
        border: theme.cores.white,
        text: theme.cores.white,
		icon: theme.cores.white, 
      };
  }
};

export const CardChamadoContainer = styled.div`
  display: flex;
  margin: 1rem 0;
`;

export const CardChamadoWrapper = styled.div<{ $cardKey: CardChamadoCardKey }>`
  display: flex;
  width: 324px;
  height: 116px;
  padding: 16px 8px;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  border-radius: 0.375rem;

  ${({ $cardKey }) => {
    const { bg, border, text } = getCardColors($cardKey);
    return `
      background-color: ${bg};
      border: 1px solid ${border};
      color: ${text};
    `;
  }}
`;

export const CardChamadoIcon = styled.div<{ $cardKey: CardChamadoCardKey }>`
  width: 5rem;
  height: 4.5rem;
  flex-shrink: 0;
  color: ${({ $cardKey }) => {
    const { icon } = getCardColors($cardKey);
    return `
      color: ${icon};
    `;
  }}
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  align-self: stretch;
`;

export const CardChamadoText = styled.div<{ $cardKey: CardChamadoCardKey }>`
  font-family: Poppins;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2;

`;

export const CardChamadoText2 = styled.div<{ $cardKey: CardChamadoCardKey }>`
  font-feature-settings: "liga" off, "clig" off;
  font-family: Poppins;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.2;
 
`;
