import { useState } from "react";
import { 
  Container, 
  Section, 
  PeopleList, 
  Card, 
  CardContent, 
  CardContentPeople 
} from "./detailstyle";
import { ChamadoDetalhesProps } from "../../interfaces/componentes/iGambDetails";
import Icon from "../GambIcon/Icon";
import { getActionsByStatus } from "./actions";
import AceitarChamadoModal from "../../componentes/GambTable/forms/AceitarChamadoModal";
import EncerrarChamadoModal from "../../componentes/GambTable/forms/EncerrarChamadoModal";
import { set } from "react-hook-form";
import Modal from "../GambModal/modal";
import AlterarStatusModal from "./modais/alterarStatus";
import AtribuirBolsistaModal from "./modais/atribuirBolsista";

export default function ChamadoDetalhes({ chamado }: ChamadoDetalhesProps) {
	const [AceitarModalOpen, setAceitarModalOpen] = useState(false);
	const [EncerrarModalOpen, setEncerrarModalOpen] = useState(false);
	const [chamadoId, setChamadoId] = useState(0);
	const closeAceitarModal = () => setAceitarModalOpen(false);
	const closeEncerrarModal = () => setEncerrarModalOpen(false);

  const [openModalAtribuirBolsista, setOpenModalAtribuirBolsista] = useState(false);
  const [ openModalAlterarStatus, setOpenModalAlterarStatus ] = useState(false);



  console.log("ChamadoDetalhes recebendo:", chamado);
  const Actions = {
    
    Avaliar: (id: number) => {
      console.log("avaliar", id);
    },
		arquivar: (id: number) => {console.log("arquivar", id)},
		resolver: (id:number) => {console.log(id)},
		aceitar: (id:number) =>{ 
			setChamadoId(id)
			setAceitarModalOpen(true)
		},
		recusar: (id:number) =>{
			setChamadoId(id)
			setEncerrarModalOpen(true)
		},
    AtribuirBolsista: (id: number) => {
      setChamadoId(id);
      setOpenModalAtribuirBolsista(true);
    },
    AlterarStatus: (id: number) => {
      setChamadoId(id);
      setOpenModalAlterarStatus(true);
    }
  }

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
                      ? chamado.acessorios.map(a => a.nome).join(", ")
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
            <div className="flex  flex-wrap gap-4 mt-4">
              {/* <GambButton variant="verde" label="Aceitar" icon="checkcircle" />
              <GambButton variant="vermelho" label="Recusar" icon="checkcircle" />
              <GambButton variant="vermelho" label="Arquivar" icon="checkcircle" />
              <GambButton variant="roxo" label="Fechar Chamado" icon="checkcircle" />
              <GambButton variant="amarelo" label="Avaliar" icon="checkcircle" />
              <GambButton variant="cinza" label="Atribuir tarefas" icon="checkcircle" />
              <GambButton variant="branco" label="Alterar Status" icon="checkcircle" /> */}
              {getActionsByStatus(Number(chamado.status.id), chamado.id, Actions).length > 0 ? getActionsByStatus(Number(chamado.status.id), chamado.id, Actions) : <p>Nenhuma ação disponivel</p>}

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
                isModalOpen={AceitarModalOpen}
                closeModal={closeAceitarModal}
                chamadoId={chamadoId}
              />
              <EncerrarChamadoModal
                isModalOpen={EncerrarModalOpen}
                closeModal={closeEncerrarModal}
                chamadoId={chamadoId}
              />


      

    <AlterarStatusModal 
      isModalOpen={openModalAlterarStatus}
      closeModal={() => setOpenModalAlterarStatus(false)}
      chamadoId={chamadoId}
      stats={chamado.status.id}
    />

<AtribuirBolsistaModal
      isModalOpen={openModalAtribuirBolsista}
      closeModal={() => setOpenModalAtribuirBolsista(false)}
      chamadoId={chamadoId}
    />
    </Container>



    
  );
}
