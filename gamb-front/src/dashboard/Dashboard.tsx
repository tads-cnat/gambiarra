import React from "react";
import { Sidebar } from "../componentes/Sidebar/Sidebar";
import {
	DashboardContainer,
	DashboardContent,
	DashboardMain,
} from "./dashboardstyles";
import { GambTable } from "../componentes/GambTable/Table";

// Dados de exemplo para testar a tabela
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

export function Dashboard() {
	return (
		<div>
			<DashboardContainer>
				<Sidebar />
				{/* teste botões */}
				<DashboardMain>
					<DashboardContent className="elevacao-def">
						<h1>Dashboard</h1>
						<h2>Seja bem-vindo ao Dashboard</h2>
						<h3>Escolha uma opção no menu ao lado</h3>

						<GambTable
							data={chamados}
							action={true}
							hiddenFields={["id"]}
						/>
					</DashboardContent>
				</DashboardMain>
			</DashboardContainer>
		</div>
	);
}
