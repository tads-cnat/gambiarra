import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import GambButton from "../../../../componentes/GambButton/Button";
import CardChamado from "../../../../componentes/GambCardChamados/CardChamado";
import { GambFilterTable } from "../../../../componentes/GambFilterTable/FilterTable";
import { FilterContent, FilterInputs } from "../../../../componentes/GambFilterTable/FilterTableStyles";
import { GambFilterTitle } from "../../../../componentes/GambFilterTitle/filterTitle";
import InputField from "../../../../componentes/GambInput/Input";
import { GambTable } from "../../../../componentes/GambTable/Table";
import { yupResolver } from "@hookform/resolvers/yup";

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
	const { register, handleSubmit } = useForm<Filters>({
		// resolver: yupResolver(filterSchema) TO-DO
	});

	function handleFilter(data: Filters) {
		
	}

	const [formIsValid, setFormIsValid] = useState(false);


	const chamados = [
		{
			id: 1,
			status: "Aceito",
			codigo: "8A541DS64",
			titulo: "Computador",
			professor: "Lucena",
			bolsista: "Leonardo",
			avaliacao: ["Muito Brabo", 5],
		},
		{
			id: 2,
			status: "Em analise",
			codigo: "X9Y72FD32",
			titulo: "Notebook",
			professor: "Camila",
			bolsista: "Mariana",
			avaliacao: ["Ótimo", 3],
		},
		{
			id: 3,
			status: "Resolvido",
			codigo: "A1B2C3D4",
			titulo: "Monitor",
			professor: "Roberto",
			bolsista: "Fernanda",
			avaliacao: ["Satisfatório", 4],
		},
		{
			id: 4,
			status: "Recusado",
			codigo: "Z7X6Y5W4",
			titulo: "Impressora",
			professor: "Juliana",
			bolsista: "Carlos",
			avaliacao: ["Ruim", 2],
		},
		{
			id: 5,
			status: "Arquivado",
			codigo: "QWERTY12",
			titulo: "Projetor",
			professor: "Bruno",
			bolsista: "Ana",
			avaliacao: ["Bom", 4],
		},
		{
			id: 6,
			status: "Aceito",
			codigo: "LKJHGF98",
			titulo: "Teclado Mecânico",
			professor: "Daniela",
			bolsista: "Pedro",
			avaliacao: ["Excelente", 5],
		},
		{
			id: 7,
			status: "Em analise",
			codigo: "ZXCVB654",
			titulo: "Mouse Gamer",
			professor: "Henrique",
			bolsista: "Sophia",
			avaliacao: ["Razoável", 3],
		},
		{
			id: 8,
			status: "Resolvido",
			codigo: "BNMASD78HFDHJFDHGFDHGCDHGDFHGFDDFSHGDFSHJFDSJHFDSHGDFSJHFDSHGJFDSHGFDSJHDFSGJH",
			titulo: "Cadeira Ergonômica",
			professor: "Patrícia",
			bolsista: "Eduardo",
			avaliacao: ["Muito Confortável", 5],
		},
		{
			id: 9,
			status: "Recusado",
			codigo: "YUIOJKL2",
			titulo: "Mesa Digitalizadora",
			professor: "Ricardo",
			bolsista: "Beatriz",
			avaliacao: ["Pouco útil", 2],
		},
		{
			id: 10,
			status: "Arquivado",
			codigo: "OPMNBV56",
			titulo: "Headset",
			professor: "Sérgio",
			bolsista: "Larissa",
			avaliacao: ["Muito Bom", 4],
		},
	];
	return (
		<div>

			<div className="flex gap-2">
				<CardChamado
					userType={"professor"}
					messageType={"atribuidas"}
					quantity={0}
				/>
				<CardChamado
					userType={"professor"}
					messageType={"concluidas"}
					quantity={0}
				/>
				<CardChamado
					userType={"professor"}
					messageType={"pendentes"}
					quantity={0}
				/>
				<CardChamado
					userType={"professor"}
					messageType={"recusadas"}
					quantity={0}
				/>
			</div>

			<form onSubmit={handleSubmit(handleFilter)}>
			<GambFilterTable>
				<FilterContent>
					<GambFilterTitle label="Filtre por pessoas" />
					<FilterInputs>
					<InputField label="Bolsista" placeholder="selecione um bolsista" register={register("bolsista")}/>
					<InputField label="Professor" placeholder="selecione um professor" register={register("professor")}/>
					<InputField label="Cliente" placeholder="selecione um cliente" register={register("cliente")}/>

					</FilterInputs>
				</FilterContent>
				<FilterContent>
					<GambFilterTitle label="Filtre pelos dados do chamado" />
					<FilterInputs>
					<InputField label="Descrição" placeholder="busque pela descrição" register={register("descricao")}/>
					<InputField label="Titulo" placeholder="busque pelo titulo" register={register("titulo")}/>
					<InputField label="Avaliação" placeholder="busque pela avaliação" register={register("avaliacao")}/>
					<InputField label="Status" placeholder="busque pelo status" register={register("status")}/>
					<InputField label="Busca" placeholder="busque por campos de texto" register={register("busca")}/>

					</FilterInputs>
					<GambButton variant="roxo" label="Filtrar" size="large" />
				</FilterContent>
			</GambFilterTable>
			</form>

			<GambTable
				data={chamados}
				action={true}
				hiddenFields={["id"]}
			/>
		</div>
	);
}
