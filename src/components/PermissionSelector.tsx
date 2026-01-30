import React from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Grid,
  Paper,
  Divider,
  Chip,
} from '@mui/material';
import {
  People,
  MedicalServices,
  CalendarMonth,
  PersonAdd,
  Assessment,
  Settings,
} from '@mui/icons-material';
import { translatePermission, getPermissionDescription } from '../utils/permissionTranslations';

interface PermissionSelectorProps {
  selectedPermissions: string[];
  onPermissionsChange: (permissions: string[]) => void;
  disabled?: boolean;
}

interface PermissionModule {
  name: string;
  icon: React.ReactElement;
  color: string;
  permissions: {
    key: string;
    label: string;
    description: string;
  }[];
}

const PermissionSelector: React.FC<PermissionSelectorProps> = ({
  selectedPermissions,
  onPermissionsChange,
  disabled = false,
}) => {
  const modules: PermissionModule[] = [
    {
      name: 'Pacientes',
      icon: <People />,
      color: '#2196f3',
      permissions: [
        { key: 'ViewPatients', label: 'Visualizar', description: 'Ver lista e detalhes de pacientes' },
        { key: 'CreatePatients', label: 'Criar', description: 'Cadastrar novos pacientes' },
        { key: 'EditPatients', label: 'Editar', description: 'Alterar dados de pacientes' },
        { key: 'DeletePatients', label: 'Excluir', description: 'Remover pacientes do sistema' },
      ],
    },
    {
      name: 'Prontuários',
      icon: <MedicalServices />,
      color: '#9c27b0',
      permissions: [
        { key: 'ViewMedicalRecords', label: 'Visualizar', description: 'Ver prontuários médicos' },
        { key: 'CreateMedicalRecords', label: 'Criar', description: 'Adicionar novos registros' },
        { key: 'EditMedicalRecords', label: 'Editar', description: 'Alterar prontuários' },
        { key: 'DeleteMedicalRecords', label: 'Excluir', description: 'Remover registros' },
      ],
    },
    {
      name: 'Agenda',
      icon: <CalendarMonth />,
      color: '#00bcd4',
      permissions: [
        { key: 'ViewAppointments', label: 'Visualizar', description: 'Ver agendamentos' },
        { key: 'CreateAppointments', label: 'Criar', description: 'Agendar consultas' },
        { key: 'EditAppointments', label: 'Editar', description: 'Alterar agendamentos' },
        { key: 'DeleteAppointments', label: 'Excluir', description: 'Cancelar agendamentos' },
      ],
    },
    {
      name: 'Usuários',
      icon: <PersonAdd />,
      color: '#e91e63',
      permissions: [
        { key: 'ViewUsers', label: 'Visualizar', description: 'Ver usuários do sistema' },
        { key: 'CreateUsers', label: 'Criar', description: 'Cadastrar novos usuários' },
        { key: 'EditUsers', label: 'Editar', description: 'Alterar dados de usuários' },
        { key: 'DeleteUsers', label: 'Excluir', description: 'Remover usuários' },
        { key: 'ManageRoles', label: 'Gerenciar Funções', description: 'Definir papéis e permissões' },
      ],
    },
    {
      name: 'Relatórios',
      icon: <Assessment />,
      color: '#607d8b',
      permissions: [
        { key: 'ViewReports', label: 'Visualizar', description: 'Ver relatórios e estatísticas' },
        { key: 'ExportData', label: 'Exportar', description: 'Exportar dados do sistema' },
      ],
    },
    {
      name: 'Configurações',
      icon: <Settings />,
      color: '#795548',
      permissions: [
        { key: 'ManageSettings', label: 'Gerenciar', description: 'Configurações do sistema' },
      ],
    },
  ];

  const handlePermissionToggle = (permission: string) => {
    const newPermissions = selectedPermissions.includes(permission)
      ? selectedPermissions.filter((p) => p !== permission)
      : [...selectedPermissions, permission];
    
    onPermissionsChange(newPermissions);
  };

  const handleModuleToggle = (modulePermissions: string[]) => {
    const allSelected = modulePermissions.every((p) => selectedPermissions.includes(p));
    
    if (allSelected) {
      // Desmarcar todos do módulo
      const newPermissions = selectedPermissions.filter((p) => !modulePermissions.includes(p));
      onPermissionsChange(newPermissions);
    } else {
      // Marcar todos do módulo
      const newPermissions = [...new Set([...selectedPermissions, ...modulePermissions])];
      onPermissionsChange(newPermissions);
    }
  };

  const isModuleFullySelected = (modulePermissions: string[]) => {
    return modulePermissions.every((p) => selectedPermissions.includes(p));
  };

  const isModulePartiallySelected = (modulePermissions: string[]) => {
    return (
      modulePermissions.some((p) => selectedPermissions.includes(p)) &&
      !isModuleFullySelected(modulePermissions)
    );
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Permissões Personalizadas
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Selecione as permissões específicas para este usuário
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {modules.map((module) => {
          const modulePermissionKeys = module.permissions.map((p) => p.key);
          const fullySelected = isModuleFullySelected(modulePermissionKeys);
          const partiallySelected = isModulePartiallySelected(modulePermissionKeys);

          return (
            <Grid item xs={12} md={6} key={module.name}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  border: fullySelected ? `2px solid ${module.color}` : '1px solid #e0e0e0',
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: 4,
                  },
                }}
              >
                {/* Header do Módulo */}
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        color: module.color,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {module.icon}
                    </Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {module.name}
                    </Typography>
                  </Box>
                  <Checkbox
                    checked={fullySelected}
                    indeterminate={partiallySelected}
                    onChange={() => handleModuleToggle(modulePermissionKeys)}
                    disabled={disabled}
                    sx={{
                      color: module.color,
                      '&.Mui-checked': {
                        color: module.color,
                      },
                    }}
                  />
                </Box>

                <Divider sx={{ mb: 1 }} />

                {/* Permissões do Módulo */}
                <Box>
                  {module.permissions.map((permission) => (
                    <FormControlLabel
                      key={permission.key}
                      control={
                        <Checkbox
                          checked={selectedPermissions.includes(permission.key)}
                          onChange={() => handlePermissionToggle(permission.key)}
                          disabled={disabled}
                          size="small"
                          sx={{
                            color: module.color,
                            '&.Mui-checked': {
                              color: module.color,
                            },
                          }}
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {translatePermission(permission.key)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {getPermissionDescription(permission.key)}
                          </Typography>
                        </Box>
                      }
                      sx={{ display: 'flex', mb: 0.5 }}
                    />
                  ))}
                </Box>

                {/* Badge de contagem */}
                <Box mt={1} display="flex" justifyContent="flex-end">
                  <Chip
                    label={`${modulePermissionKeys.filter((p) => selectedPermissions.includes(p)).length}/${modulePermissionKeys.length}`}
                    size="small"
                    sx={{
                      backgroundColor: `${module.color}20`,
                      color: module.color,
                      fontWeight: 'bold',
                    }}
                  />
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* Resumo de permissões selecionadas */}
      <Box mt={3}>
        <Typography variant="body2" color="text.secondary">
          <strong>{selectedPermissions.length}</strong> permissões selecionadas
        </Typography>
      </Box>
    </Box>
  );
};

export default PermissionSelector;