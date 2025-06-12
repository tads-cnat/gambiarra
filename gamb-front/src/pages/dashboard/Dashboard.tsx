import React, { useEffect } from "react";
import { Outlet } from "react-router-dom"; // 🔹 Corrigida a importação
import { Sidebar } from "../../componentes/Sidebar/Sidebar";
import CabecalhoDash from "../../componentes/GambCabecalhoDash/CabecalhoDash";
import {
	DashboardContainer,
	DashboardContent,
	DashboardMain,
} from "./dashboardstyles";

export const Dashboard: React.FC = () => {
	useEffect(() => {
		// Função para capturar mudanças no localStorage
		const handleStorageChange = (e: StorageEvent) => {
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
		<DashboardContainer>
			<Sidebar />
			<DashboardMain>
				<DashboardContent>
					<CabecalhoDash />
					<Outlet />
				</DashboardContent>
			</DashboardMain>
		</DashboardContainer>
	);
};
