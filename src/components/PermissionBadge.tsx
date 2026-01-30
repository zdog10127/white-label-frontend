import React from 'react';
import { Chip, Tooltip } from '@mui/material';
import {
  Visibility,
  Add,
  Edit,
  Delete,
  People,
  CalendarMonth,
  MedicalServices,
  Assessment,
  Settings,
} from '@mui/icons-material';

interface PermissionBadgeProps {
  permission: string;
  size?: 'small' | 'medium';
}

const PermissionBadge: React.FC<PermissionBadgeProps> = ({ permission, size = 'small' }) => {
  const getPermissionConfig = (perm: string) => {
    // Mapeamento de permissões para ícones e cores
    const configs: Record<string, { icon: React.ReactElement; color: string; label: string }> = {
      // Pacientes
      ViewPatients: { icon: <Visibility />, color: '#2196f3', label: 'Ver Pacientes' },
      CreatePatients: { icon: <Add />, color: '#4caf50', label: 'Criar Pacientes' },
      EditPatients: { icon: <Edit />, color: '#ff9800', label: 'Editar Pacientes' },
      DeletePatients: { icon: <Delete />, color: '#f44336', label: 'Excluir Pacientes' },

      // Prontuários
      ViewMedicalRecords: { icon: <Visibility />, color: '#9c27b0', label: 'Ver Prontuários' },
      CreateMedicalRecords: { icon: <Add />, color: '#9c27b0', label: 'Criar Prontuários' },
      EditMedicalRecords: { icon: <Edit />, color: '#9c27b0', label: 'Editar Prontuários' },
      DeleteMedicalRecords: { icon: <Delete />, color: '#9c27b0', label: 'Excluir Prontuários' },

      // Agenda
      ViewAppointments: { icon: <CalendarMonth />, color: '#00bcd4', label: 'Ver Agenda' },
      CreateAppointments: { icon: <Add />, color: '#00bcd4', label: 'Criar Agendamentos' },
      EditAppointments: { icon: <Edit />, color: '#00bcd4', label: 'Editar Agendamentos' },
      DeleteAppointments: { icon: <Delete />, color: '#00bcd4', label: 'Excluir Agendamentos' },

      // Usuários
      ViewUsers: { icon: <People />, color: '#e91e63', label: 'Ver Usuários' },
      CreateUsers: { icon: <Add />, color: '#e91e63', label: 'Criar Usuários' },
      EditUsers: { icon: <Edit />, color: '#e91e63', label: 'Editar Usuários' },
      DeleteUsers: { icon: <Delete />, color: '#e91e63', label: 'Excluir Usuários' },
      ManageRoles: { icon: <Settings />, color: '#e91e63', label: 'Gerenciar Funções' },

      // Relatórios
      ViewReports: { icon: <Assessment />, color: '#607d8b', label: 'Ver Relatórios' },
      ExportData: { icon: <Assessment />, color: '#607d8b', label: 'Exportar Dados' },

      // Configurações
      ManageSettings: { icon: <Settings />, color: '#795548', label: 'Gerenciar Configurações' },
    };

    return configs[perm] || { icon: <Settings />, color: '#9e9e9e', label: perm };
  };

  const config = getPermissionConfig(permission);

  return (
    <Tooltip title={config.label} arrow>
      <Chip
        icon={config.icon}
        label={config.label}
        size={size}
        sx={{
          backgroundColor: `${config.color}20`,
          color: config.color,
          borderColor: config.color,
          border: '1px solid',
          fontWeight: 'bold',
          fontSize: '0.75rem',
          '& .MuiChip-icon': {
            color: config.color,
          },
        }}
      />
    </Tooltip>
  );
};

export default PermissionBadge;