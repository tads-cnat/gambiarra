 
import {
  CardChamadoContainer,
  CardChamadoWrapper,
  CardChamadoIcon,
  CardChamadoText,
  CardChamadoText2,
  TextContainer,
} from "./cardchamadostyle";
import Icon from "../GambIcon/Icon";
import { CardChamadoProps } from "../../interfaces/componentes/iGambCardChamado";
import { useUser } from "../../auth/service/user";
import { useEffect, useState } from "react";
import axios from "axios";

function CardChamado({
  userType,
  cardKey,
  quantity,
}: CardChamadoProps) {
  const messages = {
    gerente: {
      cadastrados: "Chamados Cadastrados",
      pendentes: "Chamados Pendentes",
      resolvidos: "Chamados Resolvidos",
      fechados: "Sem solução",
    },
    bolsista: {
      atribuidas: "Atribuídas",
      concluidas: "Concluídas",
      pendentes: "Pendentes",
    },
    professor: {
      atribuidas: "Recebidos",
      concluidas: "Concluídos",
      pendentes: "Pendentes",
      recusadas: "Recusados",
    },
    cliente: {
      atribuidas: "Cadastrados",
      concluidas: "Resolvidos",
      pendentes: "Pendentes",
      recusadas: "Recusados",
    },
  };

  const icons = {
    gerente: {
      cadastrados: "usercircleplus",
      pendentes: "usercirclegear",
      resolvidos: "usercirclecheck",
      fechados: "usercircleminus",

    },
    bolsista: {
      atribuidas: "usercircleplus",
      concluidas: "usercirclecheck",
      pendentes: "usercirclegear",
    },
    professor: {
      atribuidas: "usercircleplus",
      concluidas: "usercirclecheck",
      pendentes: "usercirclegear",
      recusadas: "usercircleminus",
    },
    cliente: {
      atribuidas: "usercircleplus",
      concluidas: "usercirclecheck",
      pendentes: "usercirclegear",
      recusadas: "usercircleminus",
    },
  };

  // Corrigindo o erro usando type assertion para que o TS saiba que as chaves são do tipo string
  const message =
    (messages[userType] as Record<string, string>)[cardKey] || "Status desconhecido.";
  const iconName =
    (icons[userType] as Record<string, string>)[cardKey] || "usercirclegear";

  return (
    <CardChamadoContainer>
      <CardChamadoWrapper $cardKey={cardKey}>
        <CardChamadoIcon $cardKey={cardKey}>
          <Icon icon={iconName} size={75} />
        </CardChamadoIcon>
        <TextContainer>
          <CardChamadoText $cardKey={cardKey}>
            {quantity} {userType === "bolsista" ? "tarefas" : "chamados"}
          </CardChamadoText>
          <CardChamadoText2 $cardKey={cardKey}>{message}</CardChamadoText2>
        </TextContainer>
      </CardChamadoWrapper>
    </CardChamadoContainer>
  );
}

export default function RenderCards() {
  const { userActiveRole } = useUser();
  const [quantidades, setQuantidades] = useState({
    cadastrados: 0,
    pendentes: 0,
    resolvidos: 0,
    fechados: 0,
    atribuidas: 0,
    concluidas: 0,
    recusadas: 0,
  });

  useEffect(() => {
  const token = localStorage.getItem("access_token");
  axios.get("http://127.0.0.1:8000/api/v1/chamado/contagem_chamados/", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
    .then((response) => {
      console.log("Dados da API:", response.data);
      
      // Preencher as quantidades faltantes com 0 para o caso de "gerente"
      const data = response.data.quantidades || {};
      setQuantidades({
        cadastrados: data.cadastrados || 0,
        pendentes: data.pendentes || 0,
        resolvidos: data.resolvidos || 0,
        fechados: data.fechados || 0,
        atribuidas: data.atribuidas || 0,
        concluidas: data.concluidas || 0,
        recusadas: data.recusadas || 0,
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar chamados:", error);
    });
}, []);


  return (
    <>
      {userActiveRole === "gerente" ? (
        <>
          <CardChamado userType={userActiveRole} cardKey="cadastrados" quantity={quantidades.cadastrados} />
          <CardChamado userType={userActiveRole} cardKey="pendentes" quantity={quantidades.pendentes} />
          <CardChamado userType={userActiveRole} cardKey="resolvidos" quantity={quantidades.resolvidos} />
          <CardChamado userType={userActiveRole} cardKey="fechados" quantity={quantidades.fechados} />
        </>
      ) : userActiveRole === "cliente" ? (
        <>
          <CardChamado userType={userActiveRole} cardKey="atribuidas" quantity={quantidades.atribuidas} />
          <CardChamado userType={userActiveRole} cardKey="concluidas" quantity={quantidades.concluidas} />
          <CardChamado userType={userActiveRole} cardKey="pendentes" quantity={quantidades.pendentes} />
          <CardChamado userType={userActiveRole} cardKey="recusadas" quantity={quantidades.recusadas} />
        </>
      ) : userActiveRole === "professor" ? (
        <>
          <CardChamado userType={userActiveRole} cardKey="atribuidas" quantity={quantidades.atribuidas} />
          <CardChamado userType={userActiveRole} cardKey="concluidas" quantity={quantidades.concluidas} />
          <CardChamado userType={userActiveRole} cardKey="pendentes" quantity={quantidades.pendentes} />
        </>
      ) : (
        <>
          <CardChamado userType={userActiveRole} cardKey="atribuidas" quantity={quantidades.atribuidas} />
          <CardChamado userType={userActiveRole} cardKey="concluidas" quantity={quantidades.concluidas} />
          <CardChamado userType={userActiveRole} cardKey="pendentes" quantity={quantidades.pendentes} />
        </>
      )}
    </>
  );
}
