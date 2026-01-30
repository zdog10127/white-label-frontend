import api from './api';
import { User, CreateUserDto, UpdateUserDto, ChangePasswordDto, RoleInfo, UserResponse } from '../types/user';

// ============================================
// USER SERVICE
// ============================================

class UserService {
  /**
   * Listar todos os usuários
   */
  async getAll(): Promise<User[]> {
    try {
      const response = await api.get<UserResponse>('/users');
      
      if (Array.isArray(response.data)) {
        return response.data;
      }
      
      if (response.data.data) {
        return Array.isArray(response.data.data) ? response.data.data : [response.data.data];
      }
      
      return [];
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || error.response?.data?.title || 'Erro ao buscar usuários';
      throw new Error(errorMessage);
    }
  }

  /**
   * Buscar usuário por ID
   */
  async getById(id: string): Promise<User> {
    try {
      const response = await api.get<UserResponse>(`/users/${id}`);
      
      if (response.data.data) {
        return response.data.data as User;
      }
      
      return response.data as any;
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || error.response?.data?.title || 'Erro ao buscar usuário';
      throw new Error(errorMessage);
    }
  }

  /**
   * Criar novo usuário
   */
  async create(user: CreateUserDto): Promise<User> {
    try {
      console.log('📝 Criando usuário:', user);
      const response = await api.post<UserResponse>('/users', user);
      
      if (response.data.data) {
        return response.data.data as User;
      }
      
      return response.data as any;
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || error.response?.data?.title || 'Erro ao criar usuário';
      throw new Error(errorMessage);
    }
  }

  /**
   * Atualizar usuário existente
   */
  async update(id: string, user: UpdateUserDto): Promise<User> {
    try {
      console.log('✏️ Atualizando usuário:', id, user);
      const response = await api.put<UserResponse>(`/users/${id}`, user);
      
      if (response.data.data) {
        return response.data.data as User;
      }
      
      return response.data as any;
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || error.response?.data?.title || 'Erro ao atualizar usuário';
      throw new Error(errorMessage);
    }
  }

  /**
   * Deletar usuário
   */
  async delete(id: string): Promise<void> {
    try {
      console.log('🗑️ Deletando usuário:', id);
      await api.delete(`/users/${id}`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || error.response?.data?.title || 'Erro ao deletar usuário';
      throw new Error(errorMessage);
    }
  }

  /**
   * Alterar senha
   */
  async changePassword(id: string, data: ChangePasswordDto): Promise<void> {
    try {
      console.log('🔐 Alterando senha do usuário:', id);
      await api.put(`/users/${id}/change-password`, data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || error.response?.data?.title || 'Erro ao alterar senha';
      throw new Error(errorMessage);
    }
  }

  /**
   * Listar roles disponíveis
   */
  async getRoles(): Promise<RoleInfo[]> {
    try {
      const response = await api.get<{ success: boolean; data: RoleInfo[] }>('/users/roles');
      
      if (response.data.data) {
        return response.data.data;
      }
      
      return [];
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || error.response?.data?.title || 'Erro ao buscar roles';
      throw new Error(errorMessage);
    }
  }

  /**
   * Verificar se email já existe
   */
  async emailExists(email: string, excludeId?: string): Promise<boolean> {
    try {
      const users = await this.getAll();
      return users.some(u => u.email.toLowerCase() === email.toLowerCase() && u.id !== excludeId);
    } catch (error) {
      console.error('Erro ao verificar email:', error);
      return false;
    }
  }

  /**
   * Validar email
   */
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Formatar telefone
   */
  formatPhone(phone: string): string {
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length === 10) {
      return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    
    if (cleanPhone.length === 11) {
      return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    
    return phone;
  }

  /**
   * Remover máscara do telefone
   */
  unformatPhone(phone: string): string {
    return phone.replace(/\D/g, '');
  }

  /**
   * Obter label da role
   */
  getRoleLabel(role: string): string {
    const roleLabels: Record<string, string> = {
      'administrator': 'Administrador',
      'socialworker': 'Assistente Social',
      'nutritionist': 'Nutricionista',
      'psychologist': 'Psicólogo',
      'physiotherapist': 'Fisioterapeuta',
      'secretary': 'Secretária',
    };
    
    return roleLabels[role.toLowerCase()] || role;
  }

  /**
   * Obter cor da role (para badges/pills)
   */
  getRoleColor(role: string): string {
    const roleColors: Record<string, string> = {
      'administrator': '#e74c3c',      // Vermelho
      'socialworker': '#3498db',       // Azul
      'nutritionist': '#2ecc71',       // Verde
      'psychologist': '#9b59b6',       // Roxo
      'physiotherapist': '#f39c12',    // Laranja
      'secretary': '#34495e',          // Cinza escuro
    };
    
    return roleColors[role.toLowerCase()] || '#95a5a6';
  }

  /**
   * Obter todas as permissões disponíveis agrupadas por módulo
   */
  getAllPermissions(): Record<string, string[]> {
    return {
      Pacientes: [
        'ViewPatients',
        'CreatePatients',
        'EditPatients',
        'DeletePatients',
      ],
      Prontuários: [
        'ViewMedicalRecords',
        'CreateMedicalRecords',
        'EditMedicalRecords',
        'DeleteMedicalRecords',
      ],
      Agenda: [
        'ViewAppointments',
        'CreateAppointments',
        'EditAppointments',
        'DeleteAppointments',
      ],
      Usuários: [
        'ViewUsers',
        'CreateUsers',
        'EditUsers',
        'DeleteUsers',
        'ManageRoles',
      ],
      Relatórios: [
        'ViewReports',
        'ExportData',
      ],
      Configurações: [
        'ManageSettings',
      ],
    };
  }

  /**
   * Obter descrição da permissão
   */
  getPermissionDescription(permission: string): string {
    const descriptions: Record<string, string> = {
      ViewPatients: 'Visualizar lista e detalhes de pacientes',
      CreatePatients: 'Cadastrar novos pacientes no sistema',
      EditPatients: 'Editar informações de pacientes existentes',
      DeletePatients: 'Remover pacientes do sistema',
      ViewMedicalRecords: 'Visualizar prontuários médicos',
      CreateMedicalRecords: 'Criar novos registros médicos',
      EditMedicalRecords: 'Editar prontuários existentes',
      DeleteMedicalRecords: 'Remover registros médicos',
      ViewAppointments: 'Visualizar agenda e agendamentos',
      CreateAppointments: 'Criar novos agendamentos',
      EditAppointments: 'Editar agendamentos existentes',
      DeleteAppointments: 'Cancelar ou remover agendamentos',
      ViewUsers: 'Visualizar usuários do sistema',
      CreateUsers: 'Cadastrar novos usuários',
      EditUsers: 'Editar informações de usuários',
      DeleteUsers: 'Remover usuários do sistema',
      ManageRoles: 'Gerenciar papéis e permissões',
      ViewReports: 'Visualizar relatórios e estatísticas',
      ExportData: 'Exportar dados do sistema',
      ManageSettings: 'Gerenciar configurações do sistema',
    };
    
    return descriptions[permission] || permission;
  }

  /**
   * Verificar se usuário tem permissão
   */
  hasPermission(user: User, permission: string): boolean {
    if (!user.permissions || user.permissions.length === 0) {
      return false;
    }
    
    return user.permissions.includes(permission);
  }

  /**
   * Verificar se usuário é administrador
   */
  isAdmin(user: User): boolean {
    return user.role?.toLowerCase() === 'administrator';
  }
}

// Exportar instância única (Singleton)
export default new UserService();