 
import { userRoles } from "../../auth/roles";
import GambButton from "../GambButton/Button";

export type Action = {
  name: string;
  typeBtn: "verde" | "vermelho" | "cinza" | "roxo" | "amarelo" | "inline";
  icon: string;
  label: string;
};



export const btnsPR: Record<number, Action[]> = {

  1: [
    { name: "aceitar", typeBtn: "verde", icon: "checkcircle", label:"Aceitar" },
    { name: "recusar", typeBtn: "vermelho", icon: "xcircle", label:"Recusar" },
  ],
  2: [
    { name: "AtribuirTarefa", typeBtn: "cinza", icon: "clipboard", label:"Atribuir Tarefa" },
    { name: "AlterarStatus", typeBtn: "inline", icon: "gear", label:"Alterar Status" },
    { name: "ResolverChamado", typeBtn: "roxo", icon: "xcircle", label:"Resolver chamado" },
  ],
  3: [
    { name: "AtribuirTarefa", typeBtn: "cinza", icon: "clipboard", label:"Atribuir Tarefa" },
    { name: "AlterarStatus", typeBtn: "inline", icon: "gear", label:"Alterar Status" },
    { name: "ResolverChamado", typeBtn: "roxo", icon: "xcircle", label:"Resolver chamado" },
  ],
  4: [
    { name: "AtribuirTarefa", typeBtn: "cinza", icon: "clipboard", label:"Atribuir Tarefa" },
    { name: "AlterarStatus", typeBtn: "inline", icon: "gear", label:"Alterar Status" },
    { name: "ResolverChamado", typeBtn: "roxo", icon: "xcircle", label:"Resolver chamado" },
  ],
  5: [
    { name: "AtribuirTarefa", typeBtn: "cinza", icon: "clipboard", label:"Atribuir Tarefa" },
    { name: "AlterarStatus", typeBtn: "inline", icon: "gear", label:"Alterar Status" },
    { name: "ResolverChamado", typeBtn: "roxo", icon: "xcircle", label:"Resolver chamado" },
  ],
  6: [
    { name: "arquivar", typeBtn: "vermelho", icon: "archive", label:"Arquivar" },
  ],
  7: [
    { name: "arquivar", typeBtn: "vermelho", icon: "archive", label:"Arquivar" },
  ],
  8: [
    { name: "arquivar", typeBtn: "vermelho", icon: "archive", label:"Arquivar" },
  ],
};

export const btnsGR: Record<number, Action[]> = {

  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
};

export const btnClientes: Record<number, Action[]> = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [
    { name: "Avaliar", typeBtn: "amarelo", icon: "star", label:"Avaliar" },
  ],
  7: [
    { name: "Avaliar", typeBtn: "amarelo", icon: "star", label:"Avaliar" },
  ],
  8: [],
};

// Função para checar a permissão (ajuste conforme sua lógica)
const checkPermission = (roles: string[]) =>
  roles.includes(localStorage.getItem("userActiveRole") ?? "");

// Função que mapeia as ações para componentes <Notificacao />
export const getActionsByStatus = (
  status: number,
  idChamado: number,
  funct?: Record<string, (id: number) => void> // Parâmetro opcional para funções de ação
): JSX.Element[] => {
  const actions: Action[] = checkPermission([ userRoles.INTERNO.FUNCIONARIO.GR])
    ? btnsGR[status] || [] :  checkPermission([userRoles.INTERNO.FUNCIONARIO.PR]) ? btnsPR[status] || []
    : btnClientes[status] || [];

  return actions.map((action, index) => (
    <GambButton
      key={`${action.name}-${index}`}
      icon={action.icon}
      variant={action.typeBtn}
      label={action.label}
      onClick={() => {

        if (funct && funct[action.name]) {
          funct[action.name](idChamado);
        } else {
          console.log(`Ação: ${action.name} não definida! Defina a função correspondente.`);
        }
      }}
    />
  ));
};


