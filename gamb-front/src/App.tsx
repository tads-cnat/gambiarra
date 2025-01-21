import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Dashboard } from "./dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./index";
import React from "react";
import { ProtectedRoute } from "./auth/Routes";
import DashboardHome from "./dashboard/pages/Home";
import GerenciarUsuarios from "./dashboard/pages/Gerenciar/usuarios";
import { userRoles } from "./auth/roles";

export function App() {
	return (
		<>
			<ThemeProvider theme={defaultTheme}>
				<GlobalStyle />
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={<Home />}
						/>
						<Route
							path="/dashboard"
							element={<Dashboard />}
						>
							{/* Página inicial da Dashboard */}
							<Route
								index
								element={
									<ProtectedRoute
										element={<DashboardHome />}
										requiredRole={["Allowed"]}
									/>
								}
							/>

							{/* Página de Gerenciamento de Usuários */}
							<Route
								path="gerenciar_usuarios"
								element={
									<ProtectedRoute
										element={<GerenciarUsuarios />}
										requiredRole={[
											userRoles.INTERNO.FUNCIONARIO.GR,
										]}
									/>
								}
							/>
						</Route>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</>
	);
}
