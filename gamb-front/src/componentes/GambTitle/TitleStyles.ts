import styled from "styled-components";

// Interface para as props que definem a color de cor
interface ColorProps {
  color?: "roxo" | "azul";
}

export const FilterTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;

export const Bolinha = styled.div<ColorProps>`
  width: 14px;
  height: 14px;
  background-color: ${({ color, theme }) =>
    color === "roxo"
      ? theme.cores.purple_info_primary
      : color === "azul"
      ? theme.cores.blue_info
      : theme.cores.green_sucess_primary};
  border-radius: 50%;
  margin-right: 8px;
`;

export const Linha = styled.div<ColorProps>`
  flex-grow: 0.98;
  height: 2px;
  /* Se desejar aplicar a cor como borda, pode ser: */
  /* border: 1px solid ${({ color, theme }) =>
    color === "roxo"
      ? theme.cores.roxo
      : color === "azul"
      ? theme.cores.azul
      : theme.cores.gray_light}; */
  
  /* Ou, se preferir usar background-color, conforme seu exemplo: */
  background-color: ${({ color, theme }) =>
    color === "roxo"
      ? theme.cores.purple_info_primary
      : color === "azul"
      ? theme.cores.blue_info
      : theme.cores.green_sucess_primary};
  margin-left: 10px;
`;
