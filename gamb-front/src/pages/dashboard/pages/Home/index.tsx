import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getUserActiveRole } from "../../../../auth/service/AuthStore";
import GambButton from "../../../../componentes/GambButton/Button";
import RenderCards from "../../../../componentes/GambCardChamados/CardChamado";
import { GambFilterTable } from "../../../../componentes/GambFilterTable/FilterTable";
import {
  FilterContent,
  FilterInputs,
} from "../../../../componentes/GambFilterTable/FilterTableStyles";
import InputField from "../../../../componentes/GambInput/Input";
import {
  SelectField,
  statusChamado,
} from "../../../../componentes/GambSelect/Select";
import { GambTable } from "../../../../componentes/GambTable/Table";
import { GambTitle } from "../../../../componentes/GambTitle/Title";
import { ChamadoFilter } from "../../../../filters/ChamadoFilter";
import { Chamados } from "../../../../interfaces/models/iChamado";
import ChamadoService from "../../../../services/models/ChamadoService";
import AceitarChamadoModal from "../../../../componentes/GambTable/forms/AceitarChamadoModal";
import EncerrarChamadoModal from "../../../../componentes/GambTable/forms/EncerrarChamadoModal";
import axiosInstance from "../../../../services/base/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import GambTabs, { Tab } from "../../../../componentes/GambTabs/GambTabs";
import { Collapse } from "antd";
import type { CollapseProps } from "antd";

export default function DashboardHome(): React.JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const activeTab = params.get("tab") || "todos";

  const [chamados, setChamados] = useState<Chamados[]>([]);
  const [AceitarModalOpen, setAceitarModalOpen] = useState(false);
  const [EncerrarModalOpen, setEncerrarModalOpen] = useState(false);
  const [chamadoId, setChamadoId] = useState(0);

  const closeAceitarModal = () => setAceitarModalOpen(false);
  const closeEncerrarModal = () => setEncerrarModalOpen(false);

  const [optionsProfessor, setOptionsProfessor] = useState([]);
  const [optionsCliente, setOptionsCliente] = useState([]);
  const [optionsBolsista, setOptionsBolsista] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    getValues,
  } = useForm<ChamadoFilter>();

  const handleTabChange = (tabId: string) => {
    params.set("tab", tabId);
    navigate(`?${params.toString()}`);
    let data = getValues();
    data = { ...data, tab: tabId as ChamadoFilter["tab"] };
    handleChamados(data);
  };

  async function handleChamados(data?: ChamadoFilter): Promise<void> {
    data = { ...data, tab: activeTab as ChamadoFilter["tab"] };

    const filtros = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v)
    );

    const res = await ChamadoService.listarChamados(filtros);
    setChamados(res as Chamados[]);
  }

  async function fetchUsers(grupo_id: number, setState: (data: any) => void) {
    try {
      const response = await axiosInstance.get("usuario/", {
        params: { grupo_id },
      });
      const option = response.data.map((user: any) => ({
        label: user.username,
        value: user.id,
      }));
      setState(option);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  const getUsersBolsista = useCallback(
    () => fetchUsers(3, setOptionsBolsista),
    []
  );
  const getUsersCliente = useCallback(
    () => fetchUsers(5, setOptionsCliente),
    []
  );
  const getUsersProfessor = useCallback(
    () => fetchUsers(2, setOptionsProfessor),
    []
  );

  useEffect(() => {
    handleChamados();
  }, [location.search]);

  useEffect(() => {
    getUsersBolsista();
    getUsersCliente();
    getUsersProfessor();
  }, [getUsersBolsista, getUsersCliente, getUsersProfessor]);

  if (!getUserActiveRole()) {
    return <p>Carregando...</p>;
  }


  const Buttons = <>  <div className="flex gap-4">
            <GambButton variant="cinza" label="Filtrar" size="large" />
            <GambButton
              variant="inline"
              label="Limpar filtros"
              size="large"
              onClick={() => {
                reset();
              }}
            />
          </div></>

  const tabs: Tab[] = [
    { id: "todos", label: "Todos" },
    { id: "aceitos", label: "Aceitos" },
    { id: "pendentes", label: "Pendentes" },
    { id: "recusados", label: "Recusados" },
    { id: "fechados", label: "Fechados" },
    { id: "arquivados", label: "Arquivados" },
  ];

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <GambTitle label="Filtre por pessoas" color="azul" />,
      children: (
        <FilterContent>
          <FilterInputs>
            <SelectField
              name="bolsistas_id"
              control={control}
              label="Bolsista"
              placeholder="Selecione um bolsista"
              options={optionsBolsista}
            />
            {(getUserActiveRole() === "gerente" ||
              getUserActiveRole() === "professor") && (
              <SelectField
                name="cliente_id"
                control={control}
                label="Cliente"
                placeholder="Selecione um cliente"
                options={optionsCliente}
              />
            )}
            {(getUserActiveRole() === "gerente" ||
              getUserActiveRole() === "cliente") && (
              <SelectField
                name="professor_id"
                control={control}
                label="Professor"
                placeholder="Selecione um professor"
                options={optionsProfessor}
              />
            )}
          </FilterInputs>
		  {Buttons}
        </FilterContent>
      ),
    },
    {
      key: "2",
      label: <GambTitle label="Filtre pelos dados do chamado" color="roxo" />,
      children: (
        <FilterContent>
          <FilterInputs>
            <InputField
			  name="descricao"
              label="Descrição"
			  control={control}
              placeholder="Busque pela descrição"
            />
            <InputField
			  name="titulo"
			  control={control}
              label="Titulo"
              placeholder="Busque pelo título"
            />
            <SelectField
              name="status"
              control={control}
              label="Status"
              placeholder="Selecione um status"
              options={statusChamado}
            />
            <InputField
              label="Avaliação"
			  name="avaliacao"
			  control={control}
              placeholder="Busque pela avaliação"
            />
            <InputField
              label="Busca por texto"
			  name="texto"
			  control={control}
              placeholder="Busque por campos de texto"
              icon="search"
              classNameFather="w-full"
            />
          </FilterInputs>
          {Buttons}
        </FilterContent>
      ),
    },
  ];

  return (
    <div>
      <h1># Chamados</h1>
      <div className="flex flex-wrap gap-2">
        <RenderCards />
      </div>
      <GambFilterTable className="mb-6 mx-0">
        <form onSubmit={handleSubmit(handleChamados)}>
          <Collapse items={items} defaultActiveKey={["1"]} />
        </form>
      </GambFilterTable>
      <GambTabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      <GambTable
        data={chamados}
        action={true}
        hiddenFields={["id"]}
        isChamados={true}
        TableActions={{
          detalhar: (id: number) => {
            void navigate(`/dashboard/detail/${id}`);
          },
          chat: (id: number) => console.log("chat", id),
          arquivar: (id: number) => console.log("arquivar", id),
          resolver: (id: number) => console.log(id),
          aceitar: (id: number) => {
            setChamadoId(id);
            setAceitarModalOpen(true);
          },
          recusar: (id: number) => {
            setChamadoId(id);
            setEncerrarModalOpen(true);
          },
        }}
      />
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
    </div>
  );
}
