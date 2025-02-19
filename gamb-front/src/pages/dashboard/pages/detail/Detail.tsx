// Detail.tsx
import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatCard } from "./detailstyles";
import ChamadoDetalhes from "../../../../componentes/GambDetails/Details";
import Chat from "../../../../componentes/GambChat/Chat";
import Icon from "../../../../componentes/GambIcon/Icon";
import ChamadoService from "../../../../services/models/ChamadoService";
import { Chamado } from "../../../../interfaces/componentes/iGambDetails";
import { RequestTimeLine } from "../../../../componentes/GambTimeLine/TimeLineReceive";

const initialMessages: Array<{
  id: number;
  text: string;
  time: string;
  side: "left" | "right";
}> = [
  // {
  //   id: 1,
  //   text: "Olá, como posso ajudar?",
  //   time: "10:00",
  //   side: "left"
  // },
  // {
  //   id: 2,
  //   text: "Estou com um problema no meu equipamento",
  //   time: "10:01",
  //   side: "right"
  // }
];

export default function Detail(): JSX.Element {
  const { id } = useParams();
  const [chamado, setChamado] = useState<Chamado | null>(null);

  async function fetchChamado() {
    if (id) {
      await ChamadoService.getChamadoID(Number(id)).then(async (response:any) => {
        const chamado = response.data;
        await ChamadoService.getAcessorio(Number(chamado.item.id)).then((response:any) => {
          const acessorio = response.data;
          chamado.acessorio = acessorio;
        }).catch((error) => {
          console.error("Erro ao buscar acessorio:", error);
        }
        );
        setChamado(chamado);
      }).catch((error) => {
        console.error("Erro ao buscar chamado:", error);
      }
      );
       
    }
  }

  useEffect(() => {
    fetchChamado();
  }, [id]);

  return (
    <div className="flex flex-col gap-4">
      {chamado ? (
        <ChamadoDetalhes chamado={chamado} />
      ) : (
        <p>Carregando chamado...</p>
      )}
      <ChatCard>
        <div className="inline-flex flex-row items-center gap-4">
          <Icon icon="clock" size={40} color="#564CCF" />
          <h3 className="bg-gray-200 rounded-md px-2 py-1">Linha do Tempo</h3>
        </div>
        <div className="flex flex-col gap-8">
           <RequestTimeLine id={Number(id)} /> 
          
            <div className="inline-flex flex-row items-center gap-4">
            <Icon icon="chatfill" size={40} color="#28a745" />
            <h3 className="bg-gray-200 rounded-md px-2 py-1">Chat do Chamado</h3>
        </div>

          <Chat initialMessages={initialMessages} />
        </div>
      </ChatCard>
    </div>
  );
}
