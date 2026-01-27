import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import authService, { LoginRequest, RegisterRequest, User } from "../../services/authService";
import { toast } from "react-toastify";

// ============================================
// INTERFACES
// ============================================

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterRequest) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  updateUserAvatar: (avatar: string) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

// ============================================
// CONTEXT
// ============================================

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// ============================================
// PROVIDER
// ============================================

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // ============================================
  // INICIALIZAÇÃO - Verificar autenticação ao carregar app
  // ============================================
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = authService.getToken();
        const storedUser = authService.getUser();

        if (token && storedUser) {
          // Verificar se o token ainda é válido
          const isValid = await authService.verifyToken(token);

          if (isValid) {
            setUser(storedUser);
            console.log('✅ Usuário autenticado:', storedUser.email);
          } else {
            console.warn('⚠️ Token inválido. Fazendo logout...');
            authService.logout();
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Erro ao inicializar autenticação:', error);
        authService.logout();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // ============================================
  // LOGIN - AGORA USA A API!
  // ============================================
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);

      if (!email || !password) {
        toast.error('Email e senha são obrigatórios');
        return false;
      }

      console.log('🔐 Tentando login com:', email);

      // AQUI FAZ A CHAMADA REAL PARA A API!
      const response = await authService.login({ email, password });

      if (response.success && response.data) {
        const { token, user: userData } = response.data;

        // Salvar token e usuário
        authService.saveAuthData(token, userData);
        setUser(userData);

        toast.success('Login realizado com sucesso!');
        console.log('✅ Login bem-sucedido:', userData.email);

        return true;
      }

      toast.error('Erro ao fazer login');
      return false;
    } catch (error: any) {
      const message = error.message || 'Erro ao fazer login';
      toast.error(message);
      console.error('❌ Erro no login:', error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // ============================================
  // REGISTER
  // ============================================
  const register = useCallback(async (userData: RegisterRequest): Promise<boolean> => {
    try {
      setLoading(true);

      if (!userData.name || !userData.email || !userData.password) {
        toast.error('Todos os campos são obrigatórios');
        return false;
      }

      if (userData.password.length < 6) {
        toast.error('A senha deve ter pelo menos 6 caracteres');
        return false;
      }

      const response = await authService.register(userData);

      if (response.success && response.data) {
        const { token, user: newUser } = response.data;

        authService.saveAuthData(token, newUser);
        setUser(newUser);

        toast.success('Cadastro realizado com sucesso!');
        console.log('✅ Registro bem-sucedido:', newUser.email);

        return true;
      }

      toast.error('Erro ao cadastrar usuário');
      return false;
    } catch (error: any) {
      const message = error.message || 'Erro ao cadastrar usuário';
      toast.error(message);
      console.error('❌ Erro no registro:', error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // ============================================
  // LOGOUT
  // ============================================
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    toast.info('Você foi desconectado');
    console.log('👋 Logout realizado');
  }, []);

  // ============================================
  // UPDATE USER AVATAR
  // ============================================
  const updateUserAvatar = useCallback((avatar: string) => {
    if (user) {
      const newUser = { ...user, avatar } as any;
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      console.log('✅ Avatar atualizado');
    }
  }, [user]);

  // ============================================
  // PROVIDER VALUE
  // ============================================
  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading,
    updateUserAvatar,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ============================================
// HOOK
// ============================================

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};