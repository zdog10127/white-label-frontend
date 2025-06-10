import React, { createContext, useContext, useState, ReactNode } from "react";

// Define o formato dos dados do usuário
interface AuthContextType {
  user: string | null;
  login: (name: string) => void;
  logout: () => void;
}

// Cria o contexto com valores padrão
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

// Hook para usar o contexto
export const useAuth = () => useContext(AuthContext);

// Provedor do contexto
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (name: string) => {
    setUser(name);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
