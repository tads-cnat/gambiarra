import React from "react";
import { Outlet, useParams } from "react-router-dom"; // 🔹 Corrigida a importação
import { Sidebar } from "../../../../componentes/Sidebar/Sidebar";
import CabecalhoDash from "../../../../componentes/GambCabecalhoDash/CabecalhoDash";
import {
  ChatCard,
  DashboardContainer,
  DashboardContent,
  DashboardMain,
} from "./detailstyles";
import ChamadoDetalhes from "../../../../componentes/GambDetails/Details";
import Chat from "../../../../componentes/GambChat/Chat";
import Timeline from "../../../../componentes/GambTimeLine/TimeLine";
import Icon from "../../../../componentes/GambIcon/Icon";
import ChamadoService from "../../../../services/models/ChamadoService";

const chamado = {
  id: 1,
  titulo: "Problema com a tela do notebook",
  descricao: "A tela do meu notebook está piscando e não consigo trabalhar direito",
  item: { modelo: "Notebook Dell Inspiron 15 3000", acessorios: [{ nome: "Carregador" }] },
  cliente: "João da Silva",
  professor: "Prof. João da Silva",
  bolsistas: ["Maria da Silva", "José da Silva"]
}

const statuses = [
  { label: "Em análise", color: "#6c757d", completed: true },
  { label: "Aceito", color: "#28a745", completed: true },
  { label: "Esperando peça", color: "#FFC222", completed: true },
  { label: "Testando", color: "#6c757d", completed: true },
  { label: "Aceito", color: "#28a745", completed: true },
  { label: "Esperando peça", color: "#FFC222", completed: true },
  { label: "Testando", color: "#6c757d", completed: true },
  { label: "Resolvido", color: "#dc3545", completed: true },
];

const messages = [
  {
    id: 1,
    user: "Você",
    text: "Oi, tudo bem?",
    time: "13h58m 08/01/2025",
    side: "right" as const
  },
  {
    id: 2,
    user: "Lívio S.",
    text: "Estou bem e você?",
    time: "13h59m 08/01/2025",
    side: "left" as const
  },
];

export default function Detail() : JSX.Element {
  const {id} = useParams(); 


  async function GetChamadoID() : Promise <void>{
    await ChamadoService.getChamadoID(id ? 0);
  }
  return (
    <div className="flex flex-col gap-4">
      <ChamadoDetalhes chamado={chamado} />
      <ChatCard>
        <div className="inline-flex flex-row items-center">
          <Icon icon={"chatfill"} size={40} color="#28a745" />
          <h1 className="bg-gray-200 rounded-md px-2 py-1">Chat do Chamado</h1>
        </div>
        <div className="flex flex-col gap-8">
          <Timeline statuses={statuses} />
          <Chat messages={messages} />
        </div>
      </ChatCard>
    </div>
  );
};
