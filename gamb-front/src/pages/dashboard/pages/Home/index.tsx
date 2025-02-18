import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

export default function DashboardHome(): JSX.Element {
	const navigate = useNavigate();
	const [chamados, setChamados] = useState<Chamados[]>([]);
	const [AceitarModalOpen, setAceitarModalOpen] = useState(false);
	const [EncerrarModalOpen, setEncerrarModalOpen] = useState(false);
	const [chamadoId, setChamadoId] = useState(0);
	const closeAceitarModal = () => setAceitarModalOpen(false);
	const closeEncerrarModal = () => setEncerrarModalOpen(false);

	const { register, handleSubmit, reset } = useForm<ChamadoFilter>({
		// resolver: yupResolver(filterSchema) TO-DO
	});

	async function handleChamados(data?: ChamadoFilter): Promise<void> {
		await ChamadoService.listarChamados(data).then((res) => {
			setChamados(res as Chamados[]);
		}
		);
	}


	const { userActiveRole } = useUser();

	useEffect(() => {
		handleChamados();
	}, []);

	if (!userActiveRole) {
		return <p>Carregando...</p>;
	}

	return (
		<div>
			<div className="flex flex-wrap gap-2">
				<RenderCards />
			</div>

			<form onSubmit={handleSubmit(handleChamados)}>
			<GambFilterTable className="elevacao-def mb-6">
				<FilterContent>
					<GambTitle label="Filtre por pessoas" />
					<FilterInputs>
						<SelectField label="Professor" placeholder="selecione um professor" register={register("professor_id")} options={[{label: "Professor 1", value: 1}, {label: "Professor 2", value: 2}]} defaultValue={""} />
						<SelectField label="Bolsista" placeholder="selecione um bolsista" register={register("bolsista_id")} options={[{label: "Bolsista 1", value: 1}, {label: "Bolsista 2", value: 2}]} defaultValue={""} />
						<SelectField label="Cliente" placeholder="selecione um cliente" register={register("cliente_id")} options={[{label: "Cliente 1", value: 1}, {label: "Cliente 2", value: 2}] } defaultValue={""} />
					</FilterInputs>
				</FilterContent>
				<FilterContent>
					<GambTitle label="Filtre pelos dados do chamado" color="roxo" />
					<FilterInputs>

						<InputField label="Descrição" placeholder="busque pela descrição" register={register("descricao")} icon="texto"/>
						<InputField label="Titulo" placeholder="busque pelo titulo" register={register("titulo")} icon="texto"/>
						<SelectField label="Status" placeholder="selecione um status" register={register("status")} options={statusChamado} defaultValue={""}/>
						<InputField label="Avaliação" placeholder="busque pela avaliação" register={register("avaliacao")} icon="texto"/>
						<InputField label="Busca por texto" placeholder="busque por campos de texto" register={register("search")} icon="x"/>

					</FilterInputs>

					<div className="flex gap-4">

					<GambButton variant="cinza" label="Filtrar" size="large" />
					<GambButton variant="inline" label=" Limpar fitros" size="large" onClick={()=>{
						reset();
					}} />
					</div>

				</FilterContent>
			</GambFilterTable>
			</form>


			<GambTable
				data={chamados}
				action={true}
				hiddenFields={["id"]}
				isChamados={true}
				TableActions={
					{
						detalhar: (id: number) => {
							navigate("/detail");
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
