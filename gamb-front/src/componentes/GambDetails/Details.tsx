import { useState } from "react";
import {
  Container,
  Section,
  PeopleList,
  Card,
  CardContent,
  CardContentPeople,
} from "./detailstyle";
import { ChamadoDetalhesProps } from "../../interfaces/componentes/iGambDetails";
import Icon from "../GambIcon/Icon";
import { getActionsByStatus } from "./actions";
import AceitarChamadoModal from "../../componentes/GambTable/forms/AceitarChamadoModal";
import EncerrarChamadoModal from "../GambTable/forms/RecusarChamadoModal";
import AlterarStatusModal from "./modais/alterarStatus";
import AtribuirBolsistaModal from "./modais/atribuirBolsista";
import ChamadoService from "../../services/models/ChamadoService";
import { notification } from "antd";

export interface AlterarStatusFormValues {
  status: number;
}

export interface AtribuirBolsistaFormValues {
  bolsistas: number[];
}

export default function ChamadoDetalhes({ chamado }: ChamadoDetalhesProps) {
  const [aceitarModalOpen, setAceitarModalOpen] = useState(false);
  const [encerrarModalOpen, setEncerrarModalOpen] = useState(false);
  const [chamadoId, setChamadoId] = useState(0);
  const [openModalAtribuirBolsista, setOpenModalAtribuirBolsista] =
    useState(false);
  const [openModalAlterarStatus, setOpenModalAlterarStatus] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const closeAceitarModal = () => setAceitarModalOpen(false);
  const closeEncerrarModal = () => setEncerrarModalOpen(false);

  async function handleAlterarStatus(values: AlterarStatusFormValues): Promise<void> {
    if (!chamadoId) return;

    await ChamadoService.alterarStatus(chamadoId, String(values.status))
      .then(() => {
        api.success({
          message: "Status alterado com sucesso",
          placement: "top",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        api.error({
          message: "Erro ao alterar status do chamado: " + error.response?.data?.erro,
          placement: "top",
        });
      })
      .finally(() => {
        setOpenModalAlterarStatus(false);
      });
  }

  async function handleAtribuirBolsista(
    values: AtribuirBolsistaFormValues
  ): Promise<void> {
    if (!chamadoId) return;

    await ChamadoService.atribuirBolsista(chamadoId, values.bolsistas)
      .then(() => {
        api.success({
          message: "Bolsistas atribuídos com sucesso",
          placement: "top",
        });
      })
      .catch(() => {
        api.error({
          message: "Erro ao atribuir bolsistas",
          placement: "top",
        });
      })
      .finally(() => {
        setOpenModalAtribuirBolsista(false);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      });
  }

  const Actions = {
    Avaliar: (id: number) => {
      console.log("avaliar", id);
    },
    arquivar: (id: number) => {
      console.log("arquivar", id);
    },
    resolver: (id: number) => {
      console.log(id);
    },
    aceitar: (id: number) => {
      setChamadoId(id);
      setAceitarModalOpen(true);
    },
    recusar: (id: number) => {
      setChamadoId(id);
      setEncerrarModalOpen(true);
    },
    AtribuirBolsista: (id: number) => {
      setChamadoId(id);
      setOpenModalAtribuirBolsista(true);
    },
    AlterarStatus: (id: number) => {
      setChamadoId(id);
      setOpenModalAlterarStatus(true);
    },
  };

  return (
    <>
      {contextHolder}
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
                    <Icon icon="barcode" />
                    <p>
                      <strong>Modelo do item:</strong> {chamado.item.modelo}
                    </p>
                  </div>
                  <div className="inline-flex flex-row items-center gap-1.5">
                    <Icon icon="simcard" />
                    <p>
                      <strong>Acessórios:</strong>{" "}
                      {chamado.acessorios && chamado.acessorios.length > 0
                        ? chamado.acessorios.map((a) => a.nome).join(", ")
                        : "Sem acessórios"}
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
              <div className="flex flex-wrap gap-4 mt-4">
                {getActionsByStatus(Number(chamado.status.id), chamado.id, Actions)
                  .length > 0 ? (
                  getActionsByStatus(Number(chamado.status.id), chamado.id, Actions)
                ) : (
                  <p>Nenhuma ação disponível</p>
                )}
              </div>
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
                  <p>{chamado.cliente.username}</p>
                  <div className="flex justify-between items-center border-b border-gray-700 w-full">
                    <p>
                      <strong>Professor:</strong>
                    </p>
                    <Icon icon="user" />
                  </div>
                  <div className="break-normal">
                    <p>{chamado.professor?.username}</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center border-b border-gray-700 w-full">
                      <p>
                        <strong>Bolsistas:</strong>
                      </p>
                      <Icon icon="usersfour" />
                    </div>
                    <ul>
                      {chamado.bolsistas &&
                        chamado.bolsistas.map((bolsista, index) => (
                          <li key={index}>{bolsista.username}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              </PeopleList>
            </div>
          </CardContentPeople>
        </Card>

        <AceitarChamadoModal
          isModalOpen={aceitarModalOpen}
          closeModal={closeAceitarModal}
          chamadoId={chamadoId}
        />
        <EncerrarChamadoModal
          isModalOpen={encerrarModalOpen}
          closeModal={closeEncerrarModal}
          chamadoId={chamadoId}
        />
        <AlterarStatusModal
          isModalOpen={openModalAlterarStatus}
          closeModal={() => setOpenModalAlterarStatus(false)}
          chamadoId={chamadoId}
          stats={chamado.status.id}
          onSubmit={handleAlterarStatus}
        />
        <AtribuirBolsistaModal
          isModalOpen={openModalAtribuirBolsista}
          closeModal={() => setOpenModalAtribuirBolsista(false)}
          chamadoId={chamadoId}
          onSubmit={handleAtribuirBolsista}
        />
      </Container>
    </>
  );
}
