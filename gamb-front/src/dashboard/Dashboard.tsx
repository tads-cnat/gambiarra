import React from "react";
import { Sidebar } from "../componentes/Sidebar/Sidebar";
import Breadcrumb from "../componentes/GambBreadCrumb/Breadcrumb";
import CardChamado from "../componentes/GambCardChamados/CardChamado";
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
						<Breadcrumb crumbs={[
							{ label: "Dashboard", href: "/dashboard" },
						]} />
						<div className="flex gap-3">
							<CardChamado userType={"professor"} messageType={"atribuidas"} quantity={42} />
							<CardChamado userType={"professor"} messageType={"concluidas"} quantity={42} />
							<CardChamado userType={"professor"} messageType={"pendentes"} quantity={42} />
							<CardChamado userType={"professor"} messageType={"recusadas"} quantity={42} />
						</div>

						<h1>Dashboard</h1>
						<h2>Seja bem-vindo ao Dashboard</h2>
						<h3>Escolha uma opção no menu ao lado</h3>

					</DashboardContent>
				</DashboardMain>
			</DashboardContainer>
		</div>
	);
}
