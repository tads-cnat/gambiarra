import styled from "styled-components";
import { defaultTheme } from "../../styles/themes/default";

const theme = defaultTheme;

interface ButtonProps {
  $variant:
    | "verde"
    | "amarelo"
    | "vermelho"
    | "roxo"
    | "branco"
    | "cinza"
    | "inline"
    | "circle";
  $size: "small" | "medium" | "large" | "mediumlg";
  $disabled?: boolean;
}

// 👉 Função para mapear as cores principais
const getButtonColors = ($variant: ButtonProps["$variant"]) => {
  switch ($variant) {
    case "verde":
      return {
        bg: theme.cores.green_sucess_primary,
        border: theme.cores.green_sucess_primary,
        hover: theme.cores.green_sucess_hover,
        text: theme.cores.white,
      };
    case "amarelo":
      return {
        bg: theme.cores.warning,
        border: theme.cores.warning,
        hover: theme.cores.warning_hover,
        text: theme.cores.gray_text,
      };
    case "vermelho":
      return {
        bg: theme.cores.danger,
        border: theme.cores.danger,
        hover: theme.cores.danger_hover,
        text: theme.cores.white,
      };
    case "roxo":
      return {
        bg: theme.cores.purple_info_primary,
        border: theme.cores.purple_info_primary,
        hover: theme.cores.purple_info_hover,
        text: theme.cores.white,
      };
    case "cinza":
      return {
        bg: theme.cores.gray_light,
        border: theme.cores.gray_light,
        hover: theme.cores.gray_300,
        text: theme.cores.gray_text,
      };
    case "branco":
      return {
        bg: theme.cores.white,
        border: theme.cores.black,
        hover: theme.cores.light_white,
        text: theme.cores.gray_text,
      };
    case "inline":
      return {
        bg: "rgba(151,71,255,0)",
        border: theme.cores.gray_text,
        hover: theme.cores.gray_300,
        text: theme.cores.gray_text,
      };
    case "circle":
      return {
        bg: "rgba(151,71,255,0)",
        border: theme.cores.white,
        hover: theme.cores.gray_300,
        text: theme.cores.gray_text,
      };
    default:
      return getButtonColors("branco");
  }
};

export const ButtonGeneric = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: auto;
  white-space: nowrap;
  flex: 1;

  padding: ${({ $variant }) => ($variant === "circle" ? "8px" : "8px 20px")};
  border-radius: ${({ $variant }) => ($variant === "circle" ? "50%" : "6px")};
  border: 1px solid ${({ $variant }) => getButtonColors($variant).border};
  background-color: ${({ $variant }) => getButtonColors($variant).bg};
  color: ${({ $variant }) => getButtonColors($variant).text};

  font-size: ${({ $size }) => {
    switch ($size) {
      case "small":
        return `${theme.fontSize.font_scale_up_01}rem`;
      case "medium":
      case "mediumlg":
        return `${theme.fontSize.font_scale_up_02}rem`;
      case "large":
        return `${theme.fontSize.font_scale_up_default}rem`;
      default:
        return "1rem";
    }
  }};

  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};

  transition: 0.3s;

  &:hover {
    background-color: ${({ $variant, $disabled }) =>
      $disabled ? undefined : getButtonColors($variant).hover};
    color: ${({ $variant, $disabled }) =>
      $disabled ? undefined : getButtonColors($variant).text};
  }
`;
