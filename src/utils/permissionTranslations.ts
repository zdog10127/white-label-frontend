/**
 * Traduções de permissões do sistema
 * Converte nomes técnicos em inglês para português amigável
 */

export const PermissionTranslations: Record<string, string> = {
  // Pacientes
  ViewPatients: 'Visualizar Pacientes',
  CreatePatients: 'Criar Pacientes',
  EditPatients: 'Editar Pacientes',
  DeletePatients: 'Excluir Pacientes',

  // Prontuários
  ViewMedicalRecords: 'Visualizar Prontuários',
  CreateMedicalRecords: 'Criar Prontuários',
  EditMedicalRecords: 'Editar Prontuários',
  DeleteMedicalRecords: 'Excluir Prontuários',

  // Agenda
  ViewAppointments: 'Visualizar Agenda',
  CreateAppointments: 'Criar Agendamentos',
  EditAppointments: 'Editar Agendamentos',
  DeleteAppointments: 'Excluir Agendamentos',

  // Usuários
  ViewUsers: 'Visualizar Usuários',
  CreateUsers: 'Criar Usuários',
  EditUsers: 'Editar Usuários',
  DeleteUsers: 'Excluir Usuários',
  ManageRoles: 'Gerenciar Funções',

  // Relatórios
  ViewReports: 'Visualizar Relatórios',
  ExportData: 'Exportar Dados',

  // Configurações
  ManageSettings: 'Gerenciar Configurações',
};

/**
 * Traduz uma permissão do inglês para português
 * @param permission Nome da permissão em inglês
 * @returns Nome da permissão em português
 */
export const translatePermission = (permission: string): string => {
  return PermissionTranslations[permission] || permission;
};

/**
 * Traduz múltiplas permissões
 * @param permissions Array de permissões em inglês
 * @returns Array de permissões em português
 */
export const translatePermissions = (permissions: string[]): string[] => {
  return permissions.map(translatePermission);
};

/**
 * Descrições detalhadas das permissões em português
 */
export const PermissionDescriptions: Record<string, string> = {
  // Pacientes
  ViewPatients: 'Ver lista e detalhes de pacientes cadastrados',
  CreatePatients: 'Cadastrar novos pacientes no sistema',
  EditPatients: 'Alterar informações de pacientes existentes',
  DeletePatients: 'Remover pacientes do sistema',

  // Prontuários
  ViewMedicalRecords: 'Visualizar prontuários médicos dos pacientes',
  CreateMedicalRecords: 'Criar novos registros médicos',
  EditMedicalRecords: 'Alterar prontuários existentes',
  DeleteMedicalRecords: 'Remover registros médicos',

  // Agenda
  ViewAppointments: 'Visualizar agenda e agendamentos',
  CreateAppointments: 'Criar novos agendamentos',
  EditAppointments: 'Alterar agendamentos existentes',
  DeleteAppointments: 'Cancelar ou remover agendamentos',

  // Usuários
  ViewUsers: 'Visualizar usuários do sistema',
  CreateUsers: 'Cadastrar novos usuários',
  EditUsers: 'Alterar informações de usuários',
  DeleteUsers: 'Remover usuários do sistema',
  ManageRoles: 'Definir papéis e permissões',

  // Relatórios
  ViewReports: 'Visualizar relatórios e estatísticas',
  ExportData: 'Exportar dados do sistema',

  // Configurações
  ManageSettings: 'Gerenciar configurações do sistema',
};

/**
 * Obtém descrição detalhada da permissão
 * @param permission Nome da permissão
 * @returns Descrição em português
 */
export const getPermissionDescription = (permission: string): string => {
  return PermissionDescriptions[permission] || 'Sem descrição disponível';
};

/**
 * Categorias de permissões em português
 */
export const PermissionCategories: Record<string, string> = {
  Patients: 'Pacientes',
  MedicalRecords: 'Prontuários',
  Appointments: 'Agenda',
  Users: 'Usuários',
  Reports: 'Relatórios',
  Settings: 'Configurações',
};

/**
 * Mapeia permissão para sua categoria
 */
export const getPermissionCategory = (permission: string): string => {
  if (permission.includes('Patient')) return PermissionCategories.Patients;
  if (permission.includes('MedicalRecord')) return PermissionCategories.MedicalRecords;
  if (permission.includes('Appointment')) return PermissionCategories.Appointments;
  if (permission.includes('User') || permission.includes('Role')) return PermissionCategories.Users;
  if (permission.includes('Report') || permission.includes('Export')) return PermissionCategories.Reports;
  if (permission.includes('Setting')) return PermissionCategories.Settings;
  return 'Outros';
};