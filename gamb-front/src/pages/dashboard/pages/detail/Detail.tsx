import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatCard } from "./detailstyles";
import ChamadoDetalhes from "../../../../componentes/GambDetails/Details";
import Chat from "../../../../componentes/GambChat/Chat";
import Timeline from "../../../../componentes/GambTimeLine/TimeLine";
import Icon from "../../../../componentes/GambIcon/Icon";
import ChamadoService from "../../../../services/models/ChamadoService";
import { Chamado } from "../../../../interfaces/componentes/iGambDetails";

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
    side: "right" as const,
  },
  {
    id: 2,
    user: "Lívio S.",
    text: "Estou bem e você?",
    time: "13h59m 08/01/2025",
    side: "left" as const,
  },
];

export default function Detail(): JSX.Element {
  const { id } = useParams();
  const [chamado, setChamado] = useState<Chamado | null>(null);

  useEffect(() => {
    async function fetchChamado() {
      if (id) {
        try {
          const response = await ChamadoService.getChamadoID(Number(id));
          console.log("Chamado recebido:", response); 
          setChamado(response.data); 
        } catch (error) {
          console.error("Erro ao buscar chamado:", error);
        }
      }
    }

    fetchChamado();
  }, [id]);

  return (
    <div className="flex flex-col gap-4">
      {chamado && chamado.item ? (
        <ChamadoDetalhes chamado={chamado} />
      ) : (
        <p>Carregando chamado...</p>
      )}
      <ChatCard>
        <div className="inline-flex flex-row items-center">
          <Icon icon="chatfill" size={40} color="#28a745" />
          <h1 className="bg-gray-200 rounded-md px-2 py-1">Chat do Chamado</h1>
        </div>
        <div className="flex flex-col gap-8">
          <Timeline statuses={statuses} />
          <Chat messages={messages} />
        </div>
      </ChatCard>
    </div>
  );
}
