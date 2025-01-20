import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Dashboard } from "../dashboard/Dashboard";
import Home from "../index/index";
import React from "react";

// Simulação de autenticação
const isAuthenticated = (): boolean => {
	return localStorage.getItem("userToken") !== null;
};

// Simulação de verificação de permissão
const hasPermission = (requiredRole: string): boolean => {
	const userRole = localStorage.getItem("Role");
	return userRole === requiredRole;
};

// Componente para proteger rotas
function ProtectedRoute({
	element,
	requiredRole,
}: {
	element: JSX.Element;
	requiredRole?: string;
}): JSX.Element {
	if (!isAuthenticated()) {
		// Redireciona para a página inicial se o usuário não estiver autenticado
		return (
			<Navigate
				to="/"
				replace
			/>
		);
	}

	if (requiredRole && !hasPermission(requiredRole)) {
		// Redireciona para a página inicial se o usuário não tiver a permissão necessária
		return (
			<Navigate
				to="/"
				replace
			/>
		);
	}

	// Renderiza o componente protegido
	return element;
}

// Componente principal de rotas
// export function Routers(): JSX.Element {
// 	return (
// 		<BrowserRouter>
// 			<Routes>
// 				{/* Rota pública */}
// 				<Route
// 					path="/"
// 					element={<Home />}
// 				/>

// 				{/* Rota protegida */}
// 				<Route
// 					path="/dashboard"
// 					element={
// 						<ProtectedRoute
// 							element={<Dashboard />}
// 							requiredRole="Gerente" // Exemplo: apenas "Gerente" pode acessar
// 						/>
// 					}
// 				/>
// 			</Routes>
// 		</BrowserRouter>
// 	);
// }
