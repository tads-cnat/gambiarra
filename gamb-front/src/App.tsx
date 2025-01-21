import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/index";
import { ProtectedRoute } from "./auth/Routes";
import { userRoles } from "./auth/roles";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";
import { Dashboard } from "./pages/dashboard/Dashboard";
import DashboardHome from "./pages/dashboard/pages/Home";
import GerenciarUsuarios from "./pages/dashboard/pages/Gerenciar/usuarios";
import { defaultTheme } from "./styles/themes/default";
import { Login } from "./pages/login/Login";
import "./styles/index.css";

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
							path="/login"
							element={<Login />}
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
