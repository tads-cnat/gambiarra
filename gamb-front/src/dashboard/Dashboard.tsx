import React, { useEffect } from "react";
import { Sidebar } from "../componentes/Sidebar/Sidebar";
import {
	DashboardContainer,
	DashboardContent,
	DashboardMain,
} from "./dashboardstyles";
import { Outlet } from "react-router-dom";

export function Dashboard() {
	useEffect(() => {
		// Função para capturar mudanças no localStorage
		const handleStorageChange = (e) => {
			if (e.key === "userToken" || e.key === "role") {
				console.log("Mudança no localStorage detectada");
			}
		};

		// Adiciona o ouvinte para o evento de mudança no localStorage
		window.addEventListener("storage", handleStorageChange);

		// Limpa o ouvinte ao desmontar o componente
		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, []);
	return (
		<div>
			<DashboardContainer>
				<Sidebar />
				{/* teste botões */}
				<DashboardMain>
					<DashboardContent className="elevacao-def">
						<Outlet />
					</DashboardContent>
				</DashboardMain>
			</DashboardContainer>
		</div>
	);
}
