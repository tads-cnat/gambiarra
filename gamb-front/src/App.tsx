import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/index";
import { ProtectedRoute } from "./auth/Routes";
import DashboardHome from "./dashboard/pages/Home";
import GerenciarUsuarios from "./dashboard/pages/Gerenciar/usuarios";
import { userRoles } from "./auth/roles";
import { ThemeProvider } from "styled-components";

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
