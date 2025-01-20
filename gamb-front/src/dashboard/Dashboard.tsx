import React from "react";
import { Sidebar } from "../componentes/Sidebar/Sidebar";
import {
	DashboardContainer,
	DashboardContent,
	DashboardMain,
} from "./dashboardstyles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardHome from "./Home";
import { ProtectedRoute } from "../auth/Routes";
import { userRoles } from "../auth/roles";

export function Dashboard() {
	return (
		<div>
			<DashboardContainer>
				<Sidebar />
				{/* teste botões */}
				<DashboardMain>
					<DashboardContent className="elevacao-def">
						<BrowserRouter>
							<Routes>
								{/* Página inicial da Dashboard (Rota Pública)*/}
								<Route
									path="/"
									element={<DashboardHome />}
								/>

								{/* Página de Gerenciamento de usuários */}
								<Route
									path="/gerenciar/usuarios"
									element={
										<ProtectedRoute
											element={<Dashboard />}
											requiredRole={[
												userRoles.INTERNO.FUNCIONARIO
													.GR,
											]} // Exemplo: apenas "Gerente" pode acessar
										/>
									}
								/>
							</Routes>
						</BrowserRouter>
					</DashboardContent>
				</DashboardMain>
			</DashboardContainer>
		</div>
	);
}
// 				{/* Rota pública */}
// 				<Route
// 					path="/"
// 					element={<Home />}
// 				/>

// 				{/* Rota protegida */}
