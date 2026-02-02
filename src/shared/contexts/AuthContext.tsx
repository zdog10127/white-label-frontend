import React, { createContext, useContext, useState, useEffect } from "react";
import {
  User,
  AuthContextType,
  AuthProviderProps,
} from "../../types/authContext";
import api from "../../services/api";

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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      } catch (error) {
        console.error('Erro ao recuperar usuário do localStorage:', error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' && e.newValue === null) {
        setUser(null);
        delete api.defaults.headers.common['Authorization'];
      }
      
      if (e.key === 'user' && e.newValue) {
        try {
          const newUser = JSON.parse(e.newValue);
          setUser(newUser);

          const token = localStorage.getItem('token');
          if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          }
        } catch (error) {
          console.error('Erro ao sincronizar usuário entre abas:', error);
        }
      }

      if (e.key === 'user' && e.newValue === null) {
        setUser(null);
        delete api.defaults.headers.common['Authorization'];
      }
    };

    const handleAuthLogin = () => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      
      if (storedUser && storedToken) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        } catch (error) {
          console.error('Erro ao sincronizar após login:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
   
    window.addEventListener('auth-login', handleAuthLogin);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-login', handleAuthLogin);
    };
  }, []);

  const login = (email: string, password: string): boolean => {

    console.warn('Use authService.login() ao invés de context.login()');
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete api.defaults.headers.common['Authorization'];

    window.dispatchEvent(new Event('logout'));
  };

  const updateUserAvatar = (avatar: string) => {
    if (user) {
      const updatedUser = { ...user, avatar };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
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