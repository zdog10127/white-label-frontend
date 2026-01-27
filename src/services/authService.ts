import api from './api';

// ============================================
// INTERFACES
// ============================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string; // ADICIONAR
  confirmPassword: string; // ADICIONAR
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  active: boolean;
  createdAt: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    user: User;
  };
  message: string;
}

export interface RegisterResponse {
  success: boolean;
  data: {
    token: string;
    user: User;
  };
  message: string;
}

// ============================================
// AUTH SERVICE
// ============================================

class AuthService {
  /**
   * Realizar login de usuário
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || error.response?.data?.title || 'Erro ao fazer login';
      throw new Error(errorMessage);
    }
  }

  /**
   * Registrar novo usuário
   */
  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await api.post<RegisterResponse>('/auth/register', userData);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || error.response?.data?.title || 'Erro ao cadastrar usuário';
      throw new Error(errorMessage);
    }
  }

  /**
   * Verificar se o token JWT ainda é válido
   */
  async verifyToken(token: string): Promise<boolean> {
    try {
      const response = await api.post('/auth/verify-token', { token });
      return response.data.success;
    } catch (error) {
      console.error('Token verification failed:', error);
      return false;
    }
  }

  /**
   * Fazer logout (limpar dados locais)
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /**
   * Obter token do localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Obter usuário do localStorage
   */
  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  }

  /**
   * Verificar se usuário está autenticado
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  }

  /**
   * Salvar dados de autenticação
   */
  saveAuthData(token: string, user: User): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
}

// Exportar instância única (Singleton)
export default new AuthService();