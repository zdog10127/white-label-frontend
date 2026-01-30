import { useMemo } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions?: string[];
  active: boolean;
}

/**
 * Hook para gerenciar permissões do usuário
 */
export const usePermissions = () => {
  // Pegar usuário do localStorage
  const user = useMemo(() => {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;
    try {
      return JSON.parse(userJson) as User;
    } catch {
      return null;
    }
  }, []);

  /**
   * Verifica se o usuário tem uma permissão específica
   */
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    if (!user.permissions || user.permissions.length === 0) return false;
    return user.permissions.includes(permission);
  };

  /**
   * Verifica se o usuário tem TODAS as permissões fornecidas
   */
  const hasAllPermissions = (permissions: string[]): boolean => {
    if (!user) return false;
    if (!user.permissions || user.permissions.length === 0) return false;
    return permissions.every((perm) => user.permissions!.includes(perm));
  };

  /**
   * Verifica se o usuário tem PELO MENOS UMA das permissões fornecidas
   */
  const hasAnyPermission = (permissions: string[]): boolean => {
    if (!user) return false;
    if (!user.permissions || user.permissions.length === 0) return false;
    return permissions.some((perm) => user.permissions!.includes(perm));
  };

  /**
   * Verifica se o usuário é administrador
   */
  const isAdmin = (): boolean => {
    if (!user) return false;
    return user.role?.toLowerCase() === 'administrator';
  };

  /**
   * Verifica se o usuário pode acessar uma rota/recurso
   */
  const canAccess = (requiredPermissions: string[]): boolean => {
    if (!user) return false;
    if (isAdmin()) return true; // Admin tem acesso a tudo
    return hasAnyPermission(requiredPermissions);
  };

  return {
    user,
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    isAdmin,
    canAccess,
  };
};

/**
 * Permissões disponíveis no sistema
 */
export const Permissions = {
  // Pacientes
  ViewPatients: 'ViewPatients',
  CreatePatients: 'CreatePatients',
  EditPatients: 'EditPatients',
  DeletePatients: 'DeletePatients',

  // Prontuários
  ViewMedicalRecords: 'ViewMedicalRecords',
  CreateMedicalRecords: 'CreateMedicalRecords',
  EditMedicalRecords: 'EditMedicalRecords',
  DeleteMedicalRecords: 'DeleteMedicalRecords',

  // Agenda
  ViewAppointments: 'ViewAppointments',
  CreateAppointments: 'CreateAppointments',
  EditAppointments: 'EditAppointments',
  DeleteAppointments: 'DeleteAppointments',

  // Usuários
  ViewUsers: 'ViewUsers',
  CreateUsers: 'CreateUsers',
  EditUsers: 'EditUsers',
  DeleteUsers: 'DeleteUsers',
  ManageRoles: 'ManageRoles',

  // Relatórios
  ViewReports: 'ViewReports',
  ExportData: 'ExportData',

  // Configurações
  ManageSettings: 'ManageSettings',
} as const;

export type Permission = typeof Permissions[keyof typeof Permissions];