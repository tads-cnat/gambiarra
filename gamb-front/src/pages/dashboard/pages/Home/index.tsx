import { useEffect, useState } from "react";
import { GambTable } from "../../../../componentes/GambTable/Table";
import ChamadoService from "../../../../services/models/ChamadoService";
import { Chamados } from "../../../../interfaces/models/iChamado";
import { useUser } from "../../../../auth/service/user";
import RenderCards from "../../../../componentes/GambCardChamados/CardChamado";
import InputField from "../../../../componentes/GambInput/Input";
import { GambFilterTable } from "../../../../componentes/GambFilterTable/FilterTable";
import { FilterContent, FilterInputs } from "../../../../componentes/GambFilterTable/FilterTableStyles";
import { GambTitle } from "../../../../componentes/GambTitle/Title";
import GambButton from "../../../../componentes/GambButton/Button";
import { useForm } from "react-hook-form";
import { ChamadoFilter } from "../../../../filters/ChamadoFilter";




export default function DashboardHome(): JSX.Element {
	const [chamados, setChamados] = useState<Chamados[]>([]);


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
					<InputField label="Bolsista" placeholder="selecione um bolsista" register={register("bolsista_id")} icon="x"/>
					<InputField label="Professor" placeholder="selecione um professor" register={register("professor_id")} icon="x"/>
					<InputField label="Cliente" placeholder="selecione um cliente" register={register("cliente_id")} icon="x"/>

					</FilterInputs>
				</FilterContent>
				<FilterContent>
					<GambTitle label="Filtre pelos dados do chamado" color="roxo" />
					<FilterInputs>

						<InputField label="Descrição" placeholder="busque pela descrição" register={register("descricao")} icon="texto"/>
						<InputField label="Titulo" placeholder="busque pelo titulo" register={register("titulo")} icon="texto"/>
						<InputField label="Status" placeholder="busque pelo status" register={register("status_id")} icon="texto"/>
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
						detalhar: (id: number) => console.log("detalhar", id),
						chat: (id: number) => console.log("chat", id),
						arquivar: (id: number) => console.log("arquivar", id),
					}
				}
			/>
		</div>
	);
}
