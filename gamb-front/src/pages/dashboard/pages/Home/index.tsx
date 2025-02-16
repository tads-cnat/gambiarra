import { useEffect, useState } from "react";
import { GambTable } from "../../../../componentes/GambTable/Table";
import ChamadoService from "../../../../services/models/ChamadoService";
import { Chamados } from "../../../../interfaces/models/iChamado";
import { useUser } from "../../../../auth/service/user";
import RenderCards from "../../../../componentes/GambCardChamados/CardChamado";
import { useForm } from "react-hook-form";
import GambButton from "../../../../componentes/GambButton/Button";
import { GambFilterTable } from "../../../../componentes/GambFilterTable/FilterTable";
import { FilterContent, FilterInputs } from "../../../../componentes/GambFilterTable/FilterTableStyles";
import InputField from "../../../../componentes/GambInput/Input";
import { GambTitle } from "../../../../componentes/GambTitle/Title";
// import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../../../../services/base/axiosInstance";

interface Filters {
	bolsista: string;
	professor: string;
	cliente: string;
	descricao: string;
	titulo: string;
	avaliacao: string;
	status: string;
	busca: string;
}



export default function DashboardHome(): JSX.Element {

	
	const [chamados, setChamados] = useState([]);

	useEffect(() => {
		axiosInstance.get("/chamado/listar").then((response) => {
			setChamados(response.data.data);
			console.log(response.data.data);
		})
	},[]) 
	
	const { register, handleSubmit, reset } = useForm<Filters>({
		// resolver: yupResolver(filterSchema) TO-DO
	});

	function handleFilter(data: Filters) {
		const filtrosAplicados = Object.keys(data).reduce((acumulador, chave) => {
		  const valor = data[chave as keyof Filters];
		  if (valor && valor.trim() !== "") {
			return { ...acumulador, [chave]: valor };
		  }
		  return acumulador;
		}, {} as Partial<Filters>);

		axiosInstance
		.get("/chamado/listar", { params: filtrosAplicados })
		.then((response) => {
		  setChamados(response.data.data);
		//   console.log("Filtros aplicados:", filtrosAplicados);
		//   console.log("Resultado da busca:", response.data.data);
		})
		.catch((error) => {
		  console.error("Erro ao filtrar chamados", error);
		});
	}

  if (!userActiveRole) {
		return <p>Carregando...</p>;
	}

	
	return (
		<div>
			<div className="flex flex-wrap gap-2">
				<RenderCards />
			</div>

			<form onSubmit={handleSubmit(handleFilter)}>
			<GambFilterTable className="elevacao-def mb-6">
				<FilterContent>
					<GambTitle label="Filtre por pessoas" />
					<FilterInputs>
					<InputField label="Bolsista" placeholder="selecione um bolsista" register={register("bolsista")} icon="x"/>
					<InputField label="Professor" placeholder="selecione um professor" register={register("professor")} icon="x"/>
					<InputField label="Cliente" placeholder="selecione um cliente" register={register("cliente")} icon="x"/>

					</FilterInputs>
				</FilterContent>
				<FilterContent>
					<GambTitle label="Filtre pelos dados do chamado" color="roxo" />
					<FilterInputs>

						<InputField label="Descrição" placeholder="busque pela descrição" register={register("descricao")} icon="texto"/>
						<InputField label="Titulo" placeholder="busque pelo titulo" register={register("titulo")} icon="texto"/>
						<InputField label="Avaliação" placeholder="busque pela avaliação" register={register("avaliacao")} icon="star"/>
						<InputField label="Status" placeholder="busque pelo status" register={register("status")} icon="x"/>
						<InputField label="Busca por texto" placeholder="busque por campos de texto" register={register("busca")} icon="x"/>

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
				hiddenFields={["id", "code"]}
				/>
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
