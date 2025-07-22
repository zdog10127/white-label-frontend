import React, { createContext, useContext, useState, useEffect } from "react";
import {
  User,
  AuthContextType,
  AuthProviderProps,
} from "../../types/authContext";

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
  isAuthenticated: false,
  updateUserAvatar: () => {},
  loading: true,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [usersDB, setUsersDB] = useState<any[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch("/user.json");
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        const users = await response.json();
        setUsersDB(users);
        console.log("Usuários carregados com sucesso:", users.length);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
        setUsersDB([]);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    if (usersDB.length === 0) {
      console.log("Base de usuários não carregada");
      return false;
    }

    const matchedUser = usersDB.find(
      (u) =>
        u.email === email && u.password === password && u.canLogin !== false
    );

    if (matchedUser) {
      if (matchedUser.canLogin === false) {
        console.log("Usuário não tem permissão para fazer login");
        return false;
      }

      const profileData = localStorage.getItem(`user-profile-data-${email}`);
      const avatar = localStorage.getItem(`user-profile-image-${email}`);

      const extraFields: Partial<Omit<User, "email" | "avatar">> = profileData
        ? JSON.parse(profileData)
        : {};

      const userData: User = {
        email: matchedUser.email,
        avatar: avatar || undefined,
        firstName: extraFields.firstName || matchedUser.firstName || "",
        lastName: extraFields.lastName || matchedUser.lastName || "",
        phone: extraFields.phone || matchedUser.phone || "",
        city: extraFields.city || matchedUser.city || "",
        state: extraFields.state || matchedUser.state || "",
        occupation: extraFields.occupation || matchedUser.occupation || "",
        id: matchedUser.id,
        name: matchedUser.name,
        cpf: matchedUser.cpf,
        permissions: matchedUser.permissions || [],
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Login realizado com sucesso:", userData);
      return true;
    }

    console.log("Credenciais inválidas ou usuário sem permissão de login");
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateUserAvatar = (avatar: string) => {
    if (user) {
      const updatedUser = { ...user, avatar };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      localStorage.setItem(`user-profile-image-${user.email}`, avatar);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        updateUserAvatar,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
