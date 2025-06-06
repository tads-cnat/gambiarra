import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import authService from "./service/authService";

// Função para verificar se o usuário está autenticado
export async function isAuthenticated(): Promise<boolean> {
	try {
		const result = await authService.profile();
		return result; // Espera um booleano da API (true ou false)
	} catch (error) {
		console.error("Erro ao verificar autenticação", error);
		return false;
	}
}

// Função para verificar se o usuário tem permissão
const hasPermission = (requiredRole: string[]): boolean => {
	const userRole = localStorage.getItem("user.grupo");
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
	const [isAuthenticatedState, setIsAuthenticatedState] = useState<
		boolean | null
	>(null);
	const [hasPermissionState, setHasPermissionState] = useState<boolean>(true);

	// Verificação de autenticação ao carregar o componente
	useEffect(() => {
		const checkAuthentication = async () => {
			const authenticated = await isAuthenticated();
			setIsAuthenticatedState(authenticated);

			if (requiredRole) {
				setHasPermissionState(hasPermission(requiredRole));
			}
		};

		checkAuthentication();
	}, [requiredRole]);

	if (isAuthenticatedState === null) {
		// Enquanto não sabemos se o usuário está autenticado, podemos retornar um loading
		return <div>Loading...</div>;
	}

	if (!isAuthenticatedState) {
		// Redireciona para a página de login se o usuário não estiver autenticado
		return (
			<Navigate
				to="/login"
				replace
			/>
		);
	}

	if (requiredRole && !hasPermissionState) {
		// Redireciona para a página inicial se o usuário não tiver permissão
		return (
			<Navigate
				to="/dashboard"
				replace
			/>
		);
	}

	return element; // Retorna o elemento caso a autenticação e permissão sejam válidas
}
