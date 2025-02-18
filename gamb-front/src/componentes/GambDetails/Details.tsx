import React from "react";
import GambButton from "../GambButton/Button";
import { 
  Container, 
  Section, 
  Actions, 
  PeopleList, 
  Card, 
  CardContent, 
  CardContentPeople 
} from "./detailstyle";
import { ChamadoDetalhesProps } from "../../interfaces/componentes/iGambDetails";
import Icon from "../GambIcon/Icon";

export default function ChamadoDetalhes({ chamado }: ChamadoDetalhesProps) {
  console.log("ChamadoDetalhes recebendo:", chamado);
  return (
    <Container>
      <Card>
        <CardContent>
          <Section className="relative w-full">
            <div className="inline-flex flex-row items-center gap-1.5 w-full">
              <Icon icon="fillcircle" color="#453DA6" />
              <p>Dados Gerais</p>
              <div className="flex-grow min-w-[50px] h-[2px] bg-[#C0BCED]"></div>
            </div>

            <div className="pt-6 flex flex-col gap-7">
              <div className="flex justify-between items-center w-full">
                <div className="inline-flex flex-row items-center gap-1.5">
                  <Icon icon="text" />
                  <p>
                    <strong>Título:</strong> {chamado.titulo}
                  </p>
                </div>
                <div className="absolute right-6 bg-gray-200 p-2 rounded-md">
                  <Icon icon="note_pencil" color="black" size={20} />
                </div>
              </div>

              <div className="inline-flex flex-row items-center gap-1.5">
                <Icon icon="article" />
                <p>
                  <strong>Descrição:</strong> {chamado.descricao}
                </p>
              </div>

              <div className="inline-flex gap-4">
                <div className="inline-flex flex-row items-center gap-1.5">
                  <Icon icon="simcard" />
                  <p>
                    <strong>Tipo do item:</strong> {chamado.item.tipo}
                  </p>
                </div>
                <div className="inline-flex flex-row items-center gap-1.5">
                  <Icon icon="barcode" />
                  <p>
                    <strong>Modelo do item:</strong> {chamado.item.modelo}
                  </p>
                </div>
              </div>
            </div>
          </Section>

          <div className="inline-flex flex-col">
            <div className="inline-flex flex-row items-center gap-1.5 w-full">
              <Icon icon="fillcircle" color="#61B3FF" />
              <p>Ações</p>
              <div className="flex-grow min-w-[50px] h-[2px] bg-[#9CCFFF]"></div>
            </div>

            <Actions>
              <GambButton variant="verde" label="Aceitar" icon="checkcircle" />
              <GambButton variant="vermelho" label="Recusar" icon="checkcircle" />
              <GambButton variant="vermelho" label="Arquivar" icon="checkcircle" />
              <GambButton variant="roxo" label="Fechar Chamado" icon="checkcircle" />
              <GambButton variant="amarelo" label="Avaliar" icon="checkcircle" />
              <GambButton variant="cinza" label="Atribuir tarefas" icon="checkcircle" />
              <GambButton variant="branco" label="Alterar Status" icon="checkcircle" />
            </Actions>
          </div>
        </CardContent>

        <CardContentPeople>
          <div className="inline-flex flex-col gap-1">
            <div className="inline-flex flex-row items-center gap-1.5 w-full">
              <Icon icon="fillcircle" color="#68C17C" />
              <p>Pessoas</p>
              <div className="flex-grow min-w-[50px] h-[2px] bg-[#A0D8AD]"></div>
            </div>
            <PeopleList>
              <div className="inline-flex flex-col gap-3 w-full">
                <div className="flex justify-between items-center border-b border-gray-700 w-full">
                  <p>
                    <strong>Cliente:</strong>
                  </p>
                  <Icon icon="user" />
                </div>
                <p>{chamado.cliente}</p>
                <div className="flex justify-between items-center border-b border-gray-700 w-full">
                  <p>
                    <strong>Professor:</strong>
                  </p>
                  <Icon icon="user" />
                </div>
                <div className="break-normal">
                  <p>{chamado.professor}</p>
                </div>
                <div>
                  <div className="flex justify-between items-center border-b border-gray-700 w-full">
                    <p>
                      <strong>Bolsista:</strong>
                    </p>
                    <Icon icon="usersfour" />
                  </div>
                  <ul>
                    {chamado.bolsistas.map((bolsista, index) => (
                      <li key={index}>{bolsista}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </PeopleList>
          </div>
        </CardContentPeople>
      </Card>
    </Container>
  );
}
