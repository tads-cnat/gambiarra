import React from "react";
import { Sidebar } from "../../componentes/Sidebar/Sidebar";
import {
	DashboardContainer,
	DashboardContent,
	DashboardMain,
} from "./dashboardstyles";

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

					</DashboardContent>
				</DashboardMain>
			</DashboardContainer>
		</div>
	);
}
