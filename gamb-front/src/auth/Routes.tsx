import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./service/AuthStore";


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
	element: React.JSX.Element;
	requiredRole?: string[];
}): React.JSX.Element {
	
	const { isAuthenticated } = useUser();

	const [hasPermissionState, setHasPermissionState] = useState<boolean>(true);

	// Verificação de autenticação ao carregar o componente
	useEffect(() => {
		const checkAuthentication =  () => {
			
			if (requiredRole) {
				setHasPermissionState(hasPermission(requiredRole));
			}
		};

		checkAuthentication();
	}, [requiredRole]);

	if (!isAuthenticated) {
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
