import React from "react";
import { Sidebar } from "../componentes/Sidebar/Sidebar";
import CardChamado from "../componentes/GambCardChamados/CardChamado";
import {
	DashboardContainer,
	DashboardContent,
	DashboardMain,
} from "./dashboardstyles";
import { Route, Routes } from "react-router-dom";
import DashboardHome from "./Home";

export function Dashboard() {
	return (
		<div>
			<DashboardContainer>
				<Sidebar />
				{/* teste botões */}
				<DashboardMain>
					<DashboardContent className="elevacao-def">
						<Routes>
							{/* Página inicial da Dashboard */}
							<Route
								path="/"
								element={<DashboardHome />}
							/>

							{/* Página de Gerenciamento de usuários */}
						</Routes>
					</DashboardContent>
				</DashboardMain>
			</DashboardContainer>
		</div>
	);
}
