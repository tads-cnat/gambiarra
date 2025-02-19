import { createContext, useContext, useState } from "react";

// Definindo a interface para o usuário ativo
export interface UserActive {
  id: number;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  grupo: string;
}

// Definindo o tipo para o papel do usuário
export type userRoles = "bolsista" | "professor" | "cliente" | "gerente";

// Definindo o formato do contexto
interface UserContextProps {
  userActive: UserActive | null; // O usuário ativo ou null
  userActiveRole: userRoles; // O papel do usuário
  setUserActive: (user: UserActive | null) => void; // Função para definir o usuário ativo
  setUserActiveRole: (role: userRoles) => void; // Função para definir o papel
}

// Criando o contexto com valores padrão
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Provider que envolve os componentes que precisam acessar o contexto
export function UserProvider({ children }: { children: React.ReactNode }) {
  // Estado para o usuário ativo
  const [userActive, setUserActive] = useState<UserActive | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });


  // Estado para o papel do usuário
  const [userActiveRole, setUserActiveRole] = useState<userRoles>(() => {
    const role = localStorage.getItem("userActiveRole") as userRoles;
    return role || "cliente"; // Definindo um valor default caso não exista no localStorage
  });

  return (
    <UserContext.Provider
      value={{ userActive, userActiveRole, setUserActive, setUserActiveRole }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Hook para facilitar o acesso ao contexto
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
}
