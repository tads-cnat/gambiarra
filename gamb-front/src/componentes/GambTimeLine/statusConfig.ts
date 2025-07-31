import { defaultTheme } from "../../styles/themes/default";

const theme = defaultTheme;


export const statusConfig = {
  "1": {
    label: "Em Análise",
    bgColor: theme.cores.gray_300,
    lineColor: theme.cores.gray_400,
    color: theme.cores.gray_400,
  },
  "2": {
    label: "Aceito",
    bgColor: theme.cores.green_sucess_secondary,
    lineColor: theme.cores.green_sucess_primary,
    color: theme.cores.green_sucess_primary,
  },
  "3": {
    label: "Em Diagnóstico",
    bgColor: theme.cores.warning_secondary,
    lineColor: "#ce962f",
    color: "#ce962f",
  },
  "4": {
    label: "Equipamento Em Conserto",
    bgColor: theme.cores.purple_info_secondary,
    lineColor: theme.cores.purple_info_primary,
    color: theme.cores.purple_info_primary,
  },
  "5": {
    label: "Aguardando Peça",
    bgColor: theme.cores.blue_info_light,
    lineColor: theme.cores.blue_info,
    color: theme.cores.blue_info_hover,
  },
  "6": {
    label: "Fechado Sem Resolução",
    bgColor: theme.cores.gray_100,
    lineColor: theme.cores.gray_700,
    color: theme.cores.gray_700,
  },
  "7": {
    label: "Resolvido",
    bgColor: theme.cores.green_sucess_secondary,
    lineColor: theme.cores.green_sucess_hover,
    color: theme.cores.green_sucess_hover,
  },
  "8": {
    label: "Recusado",
    bgColor: theme.cores.danger_secondary,
    lineColor: theme.cores.danger,
    color: theme.cores.danger,
  },
  "9": {
    label: "Arquivado",
    bgColor: theme.cores.danger_secondary,
    lineColor: theme.cores.danger_hover,
    color: theme.cores.danger_hover,
  },
  default: {
    label: "Desconhecido",
    bgColor: theme.cores.gray_400,
    lineColor: theme.cores.gray_100,
    color: theme.cores.gray_600,
  },
};
