import { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import Detail from "./pages/dashboard/pages/detail/Detail";
import "./styles/index.css";
import {
	isAuthenticatedStore,
	setIsAuthenticatedStore,
} from "./auth/service/AuthStore";
import { Cadastro } from "./pages/cadastro/cadastro";
import Callback from "./pages/login/callback";

export function App() {
	function checkAuth(): void {
		setIsAuthenticatedStore();
	}

	useEffect(() => {
		checkAuth();
	}, []);

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
							isAuthenticatedStore() ? (
								<Navigate to="/dashboard" />
							) : (
								<Login />
							)
						}
					/>
					<Route
						path="/login/callback"
						element={ Callback() }
					/>

					<Route
						path="/cadastro"
						element={
							isAuthenticatedStore() ? (
								<Navigate to="/dashboard" />
							) : (
								<Cadastro />
							)
						}
					/>
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute
								element={<Dashboard />}
								requiredRole={["Allowed"]}
							/>
						}
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

						<Route
							path="detail/:id"
							element={
								<ProtectedRoute
									element={<Detail />}
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
	);
}
