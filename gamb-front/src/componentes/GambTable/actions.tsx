 
import Notificacao from "../GambNotificao/Notificacao";
import { userRoles } from "../../auth/roles";
import { defaultTheme } from "../../styles/themes/default";

export type Action = {
  name: string;
  colorIcon: string | "white";
  background: string;
  icon: string;
};

export const btnsPRGR: Record<number, Action[]> = {

  1: [
    { name: "aceitar", colorIcon: "white", background: defaultTheme.cores.green_sucess_primary, icon: "checkcircle" },
    { name: "recusar", colorIcon: "white", background: defaultTheme.cores.danger, icon: "xcircle" },
    { name: "detalhar", colorIcon: "white", background: defaultTheme.cores.purple_info_primary, icon: "eyeopen" },
  ],
  2: [
    { name: "detalhar", colorIcon: "white", background: defaultTheme.cores.purple_info_primary, icon: "eyeopen" },
    { name: "chat", colorIcon: "white", background: defaultTheme.cores.blue_info, icon: "chat" },
    { name: "resolver", colorIcon: "white", background: defaultTheme.cores.green_sucess_primary, icon: "checkcircle" },
  ],
  3: [
    { name: "detalhar", colorIcon: "white", background: defaultTheme.cores.purple_info_primary, icon: "eyeopen" },
    { name: "chat", colorIcon: "white", background: defaultTheme.cores.blue_info, icon: "chat" },
    { name: "resolver", colorIcon: "white", background: defaultTheme.cores.green_sucess_primary, icon: "checkcircle" },
  ],
  4: [
    { name: "detalhar", colorIcon: "white", background: defaultTheme.cores.purple_info_primary, icon: "eyeopen" },
    { name: "chat", colorIcon: "white", background: defaultTheme.cores.blue_info, icon: "chat" },
    { name: "resolver", colorIcon: "white", background: defaultTheme.cores.green_sucess_primary, icon: "checkcircle" },
  ],
  5: [
    { name: "detalhar", colorIcon: "white", background: defaultTheme.cores.purple_info_primary, icon: "eyeopen" },
    { name: "chat", colorIcon: "white", background: defaultTheme.cores.blue_info, icon: "chat" },
    { name: "resolver", colorIcon: "white", background: defaultTheme.cores.green_sucess_primary, icon: "checkcircle" },
  ],
  6: [
    { name: "detalhar", colorIcon: "white", background: defaultTheme.cores.purple_info_primary, icon: "eyeopen" },
    { name: "chat", colorIcon: "white", background: defaultTheme.cores.blue_info, icon: "chat" },
    { name: "arquivar", colorIcon: "white", background: defaultTheme.cores.danger, icon: "archive" },
  ],
  7: [
    { name: "detalhar", colorIcon: "white", background: defaultTheme.cores.purple_info_primary, icon: "eyeopen" },
    { name: "chat", colorIcon: "white", background: defaultTheme.cores.blue_info, icon: "chat" },
    { name: "arquivar", colorIcon: "white", background: defaultTheme.cores.danger, icon: "archive" },
  ],
  8: [
    { name: "detalhar", colorIcon: "white", background: defaultTheme.cores.purple_info_primary, icon: "eyeopen" },
    { name: "arquivar", colorIcon: "white", background: defaultTheme.cores.danger, icon: "archive" },
  ],
};

export const btnClientes: Record<number, Action[]> = {
  1: [{ name: "detalhar", colorIcon: "white", background: defaultTheme.cores.purple_info_primary, icon: "eyeopen" }],
  2: [
    { name: "detalhar", colorIcon: "white", background: defaultTheme.cores.purple_info_primary, icon: "eyeopen" },
    { name: "chat", colorIcon: "white", background: defaultTheme.cores.blue_info, icon: "chat" },
  ],
  3: [
    { name: "detalhar", colorIcon: "white", background: defaultTheme.cores.purple_info_primary, icon: "eyeopen" },
    { name: "chat", colorIcon: "white", background: defaultTheme.cores.blue_info, icon: "chat" },
  ],
  4: [
    { name: "detalhar", colorIcon: "white", background: defaultTheme.cores.purple_info_primary, icon: "eyeopen" },
    { name: "chat", colorIcon: "white", background: defaultTheme.cores.blue_info, icon: "chat" },
  ],
  5: [
    { name: "detalhar", colorIcon: "white", background: defaultTheme.cores.purple_info_primary, icon: "eyeopen" },
    { name: "chat", colorIcon: "white", background: defaultTheme.cores.blue_info, icon: "chat" },
  ],
  6: [
    { name: "detalhar", colorIcon: "white", background: defaultTheme.cores.purple_info_primary, icon: "eyeopen" },
    { name: "chat", colorIcon: "white", background: defaultTheme.cores.blue_info, icon: "chat" },
    { name: "avaliar", colorIcon: defaultTheme.cores.gray_text, background: defaultTheme.cores.warning, icon: "star" },
  ],
  7: [
    { name: "detalhar", colorIcon: "white", background: defaultTheme.cores.purple_info_primary, icon: "eyeopen" },
    { name: "chat", colorIcon: "white", background: defaultTheme.cores.blue_info, icon: "chat" },
    { name: "avaliar", colorIcon: defaultTheme.cores.gray_text, background: defaultTheme.cores.warning, icon: "star" },
  ],
  8: [{ name: "detalhar", colorIcon: "white", background: defaultTheme.cores.purple_info_primary, icon: "eyeopen" }],
};
// Função para checar a permissão (ajuste conforme sua lógica)
const checkPermission = (roles: string[]) =>
  roles.includes(localStorage.getItem("userActiveRole") ?? "");

// Função que mapeia as ações para componentes <Notificacao />
export const getActionsByStatus = (
  status: number,
  idLinha: number,
  funct?: Record<string, (id: number) => void> // Parâmetro opcional para funções de ação
): JSX.Element[] => {
  const actions: Action[] = checkPermission([userRoles.INTERNO.FUNCIONARIO.PR, userRoles.INTERNO.FUNCIONARIO.GR])
    ? btnsPRGR[status] || []
    : btnClientes[status] || [];

  return actions.map((action, index) => (
    <Notificacao
      key={`${action.name}-${index}`}
      icon={action.icon}
      backgroundColor={action.background}
      badgeNumber={-1}
      size={30}
      iconColor={action.colorIcon}
      onClick={() => {
        if (funct && funct[action.name]) {
          funct[action.name](idLinha);
        } else {
          console.log(`Ação: ${action.name} não definida! Defina a função correspondente.`);
        }
      }}
    />
  ));
};


