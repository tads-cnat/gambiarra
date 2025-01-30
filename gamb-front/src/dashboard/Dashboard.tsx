import React from "react";
import { Sidebar } from "../componentes/Sidebar/Sidebar";
import {
	DashboardContainer,
	DashboardContent,
	DashboardMain,
} from "./dashboardstyles";
import { GambTable } from "../componentes/GambTable/Table";

const chamados = [
	{ id: 1, codigo: "8A541DS64", titulo: "Computador", professor: "Lucena", bolsista: "Leonardo", avaliacao: "Muito Brabo" },
	{ id: 2, codigo: "X9Y72FD32", titulo: "Notebook", professor: "Camila", bolsista: "Mariana", avaliacao: "Ótimo" },

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

						<GambTable data={chamados}/>

					</DashboardContent>
				</DashboardMain>
			</DashboardContainer>
		</div>
	);
}
