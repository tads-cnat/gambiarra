/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../../../auth/service/user";
import GambButton from "../../../../componentes/GambButton/Button";
import RenderCards from "../../../../componentes/GambCardChamados/CardChamado";
import { GambFilterTable } from "../../../../componentes/GambFilterTable/FilterTable";
import { FilterContent, FilterInputs } from "../../../../componentes/GambFilterTable/FilterTableStyles";
import InputField from "../../../../componentes/GambInput/Input";
import { SelectField, statusChamado } from "../../../../componentes/GambSelect/Select";
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

export default function DashboardHome(): JSX.Element {
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


	const { register, handleSubmit, reset, getValues } = useForm<ChamadoFilter>({
		// resolver: yupResolver(filterSchema) TO-DO
	});
  const handleTabChange = (tabId: string) => {
    params.set("tab", tabId);
    navigate(`?${params.toString()}`);
    let data = getValues();
    data = { ...data, tab: tabId as ChamadoFilter["tab"] };
    handleChamados(data);
  };
  
  async function handleChamados(data?: ChamadoFilter): Promise<void> {
    data = { ...data, tab: activeTab as ChamadoFilter["tab"] };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const filtros = Object.fromEntries(Object.entries(data).filter(([_, v]) => v));
  
    const res = await ChamadoService.listarChamados(filtros);
    setChamados(res as Chamados[]);
  }
  

  async function fetchUsers(grupo_id: number, setState: (data: any) => void) {
    try {
      const response = await axiosInstance.get("usuario/", { params: { grupo_id } });
      const option = response.data.map((user: any) => ({
        label: user.username,
        value: user.id,
      }));
      setState(option);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  const getUsersBolsista = useCallback(() => fetchUsers(3, setOptionsBolsista), []);
  const getUsersCliente = useCallback(() => fetchUsers(5, setOptionsCliente), []);
  const getUsersProfessor = useCallback(() => fetchUsers(2, setOptionsProfessor), []);

  const { userActiveRole } = useUser();

  useEffect(() => {
    handleChamados();
  }, [location.search]);

  useEffect(() => {
    getUsersBolsista();
    getUsersCliente();
    getUsersProfessor();
  }, [getUsersBolsista, getUsersCliente, getUsersProfessor]);

  if (!userActiveRole) {
    return <p>Carregando...</p>;
  }

  // tabs para o filtro de chamados.
  const tabs: Tab[] = [
    { id: "todos", label: "Todos" },
    { id: "aceitos", label: "Aceitos" },
    { id: "pendentes", label: "Pendentes" },
    { id: "recusados", label: "Recusados" },
    { id: "fechados", label: "Fechados" },
    { id: "arquivados", label: "Arquivados" },
  ];

  return (
    <div>
      <h1># Chamados</h1>
      <div className="flex flex-wrap gap-2">
        <RenderCards />
      </div>

      <form onSubmit={handleSubmit(handleChamados)}>
        <GambFilterTable className="elevacao-def mb-6">
          <FilterContent>
						<GambTitle
							label="Filtre por pessoas"
							color="azul"
						/>
            <FilterInputs>
              <SelectField
                label="Bolsista"
                placeholder="selecione um bolsista"
                register={register("bolsistas_id")}
                options={optionsBolsista}
                defaultValue={""}
              />
              {(userActiveRole === "gerente" || userActiveRole === "professor") && (
                <SelectField
                  label="Cliente"
                  placeholder="selecione um cliente"
                  register={register("cliente_id")}
                  options={optionsCliente}
                  defaultValue={""}
                />
              )}
              {(userActiveRole === "gerente" || 
			  userActiveRole === "cliente") && (
                <SelectField
                  label="Professor"
                  placeholder="selecione um professor"
                  register={register("professor_id")}
                  options={optionsProfessor}
                  defaultValue={""}
                />
              )}
            </FilterInputs>
          </FilterContent>
          <FilterContent className="mt-4">
						<GambTitle
							label="Filtre pelos dados do chamado"
							color="roxo"
						/>
            <FilterInputs>
              <InputField
                label="Descrição"
                placeholder="busque pela descrição"
                register={register("descricao")}
              />
              <InputField
                label="Titulo"
                placeholder="busque pelo titulo"
                register={register("titulo")}
              />
              <SelectField
                label="Status"
                placeholder="selecione um status"
                register={register("status")}
                options={statusChamado}
                defaultValue={""}
              />
              <InputField
                label="Avaliação"
                placeholder="busque pela avaliação"
                register={register("avaliacao")}
              />
              <InputField
                label="Busca por texto"
                placeholder="busque por campos de texto"
                register={register("search")}
                icon="search"
                classNameFather="w-full"
              />
            </FilterInputs>

            <div className="flex gap-4">
							<GambButton
								variant="cinza"
								label="Filtrar"
								size="large"
							/>
							<GambButton
								variant="inline"
								label=" Limpar fitros"
								size="large"
								onClick={() => {
									reset();
								}}
							/>
            </div>
          </FilterContent>
        </GambFilterTable>
        
      </form>
                
      <GambTabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

      <GambTable
        data={chamados}
        action={true}
        hiddenFields={["id"]}
        isChamados={true}
				TableActions={
					{
						detalhar: (id: number) => {
							navigate(`/dashboard/detail/${id}`);
						},
          chat: (id: number) => console.log("chat", id),
          arquivar: (id: number) => console.log("arquivar", id),
						resolver: (id:number) => console.log(id),
						aceitar: (id:number) =>{ 
												setChamadoId(id)
												setAceitarModalOpen(true)
          },
						recusar: (id:number) =>{
												setChamadoId(id)
												setEncerrarModalOpen(true)
          },
					}

				}
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
