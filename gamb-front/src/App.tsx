import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ProtectedRoute } from "./auth/Routes";
import { userRoles } from "./auth/roles";
import authService from "./auth/service/authService";
import { Dashboard } from "./pages/dashboard/Dashboard";
import GerenciarUsuarios from "./pages/dashboard/pages/Gerenciar/usuarios";
import DashboardHome from "./pages/dashboard/pages/Home";
import Home from "./pages/index";
import { Login } from "./pages/login/Login";
import { GlobalStyle } from "./styles/global";
import "./styles/index.css";
import { defaultTheme } from "./styles/themes/default";

export function App() {
	const [isAuthenticatedState, setIsAuthenticatedState] = useState<
		boolean | null
	>(null);

	// Função assíncrona para verificar autenticação
	const checkAuth = async () => {
		const isAuthenticatedResult = await authService.profile();
		setIsAuthenticatedState(isAuthenticatedResult);
	};

	// Verifica a autenticação assim que o componente é montado
	useEffect(() => {
		checkAuth();
	}, []);

	// Enquanto estamos verificando a autenticação, mostramos um carregando
	if (isAuthenticatedState === null) {
		return <div>Loading...</div>;
	}

	return (
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
						element={
							isAuthenticatedState ? (
								<Navigate to="/dashboard" />
							) : (
								<Login />
							)
						}
					/>
					{/* <Route
						path="/dashboard"
						element={
							<ProtectedRoute
								element={<Dashboard />}
								requiredRole={["Allowed"]}
							/>
						}
					> */}
						<Route
						path="/dashboard"
						element={<Dashboard />}
						>
						{/* Página inicial da Dashboard */}
						{/* <Route
							index
							element={
								<ProtectedRoute
									element={<DashboardHome />}
									requiredRole={["Allowed"]}
								/>
							}
						/> */}
						<Route
							index
							element={<DashboardHome />}

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
	);
}
