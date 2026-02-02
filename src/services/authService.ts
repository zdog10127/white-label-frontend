import api from './api';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    permissions: string[];
    active: boolean;
  };
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: string;
}

class AuthService {
  /**
   * Faz login do usuário
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post<{ success: boolean; data: LoginResponse }>(
      '/auth/login',
      { email, password }
    );

    const { token, user } = response.data.data;

    // Salvar no localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    // Configurar token no header padrão
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return response.data.data;
  }

  /**
   * Registra novo usuário
   */
  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await api.post<{ success: boolean; data: LoginResponse }>(
      '/auth/register',
      data
    );

    const { token, user } = response.data.data;

    // Salvar no localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    // Configurar token no header padrão
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return response.data.data;
  }

  /**
   * Faz logout do usuário
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    
    // Disparar evento para sincronizar com outras abas
    window.dispatchEvent(new Event('logout'));
  }

  /**
   * Verifica se usuário está autenticado
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  }

  /**
   * Obtém usuário atual do localStorage
   */
  getCurrentUser(): LoginResponse['user'] | null {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  }

  /**
   * Obtém token atual do localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Atualiza dados do usuário no localStorage
   */
  updateUser(user: Partial<LoginResponse['user']>): void {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...user };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Disparar evento para sincronizar com outras abas
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'user',
      newValue: JSON.stringify(updatedUser),
      oldValue: JSON.stringify(currentUser),
    }));
  }
}

export default new AuthService();