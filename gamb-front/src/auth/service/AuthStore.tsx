import { create } from "zustand";
import { persist } from "zustand/middleware";

// Interface para o usuário ativo
export interface UserActive {
	id: number;
	is_superuser: boolean;
	username: string;
	first_name: string;
	last_name: string;
	email: string;
	is_staff: boolean;
	is_active: boolean;
	grupo: UserRoles;
}

// Papéis possíveis
export type UserRoles = "bolsista" | "professor" | "cliente" | "gerente";

// Interface da store
interface UserStore {
	userActive: UserActive | null;
	userActiveRole: UserRoles;
	isAuthenticated: boolean;
	getAuthToken: () => string | null;
	getAuthRefreshToken: () => string | null;
	setAuthToken: (token: string) => void;
	setAuthRefreshToken: (token: string) => void;
	setUserActive: (user: UserActive | null) => void;
	setUserActiveRole: (role: UserRoles) => void;
	logout: () => void;
}

// Criação da store Zustand com persistência
export const useUser = create<UserStore>()(
	persist(
		(set) => ({
			userActive: null,
			userActiveRole: "cliente",
			isAuthenticated: false,

			// Retorna o token do localStorage
			getAuthToken: () => {
				const token = localStorage.getItem("access_token");
				return token || null;
			},

			// Retorna o refresh token do localStorage
			getAuthRefreshToken: () => {
				const token = localStorage.getItem("refresh_token");
				return token || null;
			},

			// Salva o token no localStorage
			setAuthToken: (token: string) => {
				localStorage.setItem("access_token", token);
			},

			// Salva o refresh token no localStorage
			setAuthRefreshToken: (token: string) => {
				localStorage.setItem("refresh_token", token);
			},

			// Define o usuário ativo e marca como autenticado
			setUserActive: (user: UserActive | null) => {
				set({
					userActive: user,
					isAuthenticated: !!user,
				});
			},

			// Define o papel ativo
			setUserActiveRole: (role: UserRoles) => {
				set({
					userActiveRole: role,
				});
			},

			// Limpa todos os dados e faz logout
			logout: () => {
				localStorage.removeItem("access_token");
				localStorage.removeItem("refresh_token");
				set({
					userActive: null,
					userActiveRole: "cliente",
					isAuthenticated: false,
				});
			},
		}),
		{
			name: "user-store", // nome no localStorage
			partialize: (state) => ({
				userActive: state.userActive,
				userActiveRole: state.userActiveRole,
			}),
		}
	)
);

// ==================== HELPERS ====================

// Retorna o token de acesso atual
export const getAuthToken = (): string | null => {
	return useUser.getState().getAuthToken();
};

// Retorna o refresh token atual
export const getAuthRefreshToken = (): string | null => {
	return useUser.getState().getAuthRefreshToken();
};

// Retorna se está autenticado
export const isAuthenticatedStore = (): boolean => {
	return useUser.getState().isAuthenticated;
};

// Define explicitamente que está autenticado (baseado no usuário ativo atual)
export const setIsAuthenticatedStore = (): void => {
	useUser.getState().setUserActive(useUser.getState().userActive);
};

// Define o token de acesso
export const setAuthToken = (token: string): void => {
	useUser.getState().setAuthToken(token);
};

// Define o refresh token
export const setAuthRefreshToken = (token: string): void => {
	useUser.getState().setAuthRefreshToken(token);
};

// Define o usuário ativo
export const setUserActive = (user: UserActive | null): void => {
	useUser.getState().setUserActive(user);
};

// Define o papel ativo
export const setUserActiveRole = (role: UserRoles): void => {
	useUser.getState().setUserActiveRole(role);
};

// Faz logout
export const logout = (): void => {
	useUser.getState().logout();
};

// Retorna o usuário ativo
export const getUserActive = (): UserActive | null => {
	return useUser.getState().userActive;
};

// Retorna o papel ativo
export const getUserActiveRole = (): UserRoles => {
	return useUser.getState().userActiveRole;
};
