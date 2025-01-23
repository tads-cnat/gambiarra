import React from "react";
import { Navigate } from "react-router-dom";
import authService from "./service/authService";

export async function isAuthenticated(): Promise<boolean> {
	return authService.profile();
}

// Simulação de verificação de permissão
const hasPermission = (requiredRole: string[]): boolean => {
	const userRole = localStorage.getItem("Role");
	if (requiredRole.includes("Allowed")) {
		return true;
	}
	if (!userRole) {
		return false; // Retorna false caso o "Role" não esteja no localStorage
	}
	return requiredRole.includes(userRole);
};

// Componente para proteger rotas

export function ProtectedRoute({
	element,
	requiredRole,
}: {
	element: JSX.Element;
	requiredRole?: string[];
}): JSX.Element {
	if (!isAuthenticated()) {
		// Redireciona para a página inicial se o usuário não estiver autenticado
		return (
			<Navigate
				to="/login"
				replace
			/>
		);
	}
	if (requiredRole && !hasPermission(requiredRole)) {
		// Redireciona para a página inicial se o usuário não tiver a permissão necessária
		return (
			<Navigate
				to="/dashboard"
				replace
			/>
		);
	}

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
