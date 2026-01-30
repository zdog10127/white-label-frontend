import React from 'react';
import { usePermissions } from '../hooks/userPermission';
import { translatePermissions } from '../utils/permissionTranslations';
import { Box, Tooltip, Typography } from '@mui/material';
import { Lock } from '@mui/icons-material';

interface ProtectedComponentProps {
  children: React.ReactNode;
  requiredPermissions: string[];
  requireAll?: boolean; // Se true, precisa de todas. Se false, precisa de pelo menos uma
  fallback?: React.ReactNode; // O que mostrar quando não tem permissão
  hideWhenNoPermission?: boolean; // Se true, não mostra nada. Se false, mostra desabilitado
  showLockIcon?: boolean; // Mostrar ícone de cadeado quando sem permissão
}

/**
 * Componente que protege elementos baseado em permissões
 * 
 * @example
 * // Esconde botão se não tiver permissão
 * <ProtectedComponent requiredPermissions={['CreateUsers']} hideWhenNoPermission>
 *   <Button>Criar Usuário</Button>
 * </ProtectedComponent>
 * 
 * @example
 * // Desabilita botão se não tiver permissão
 * <ProtectedComponent requiredPermissions={['EditUsers']}>
 *   <Button>Editar Usuário</Button>
 * </ProtectedComponent>
 * 
 * @example
 * // Requer todas as permissões
 * <ProtectedComponent requiredPermissions={['ViewUsers', 'EditUsers']} requireAll>
 *   <Button>Gerenciar Usuários</Button>
 * </ProtectedComponent>
 */
const ProtectedComponent: React.FC<ProtectedComponentProps> = ({
  children,
  requiredPermissions,
  requireAll = false,
  fallback = null,
  hideWhenNoPermission = false,
  showLockIcon = true,
}) => {
  const { hasAllPermissions, hasAnyPermission, isAdmin } = usePermissions();

  // Admin tem acesso a tudo
  if (isAdmin()) {
    return <>{children}</>;
  }

  // Verificar permissões
  const hasPermission = requireAll
    ? hasAllPermissions(requiredPermissions)
    : hasAnyPermission(requiredPermissions);

  // Sem permissão
  if (!hasPermission) {
    // Se deve esconder, não mostra nada
    if (hideWhenNoPermission) {
      return null;
    }

    // Se tem fallback customizado, mostra ele
    if (fallback) {
      return <>{fallback}</>;
    }

    // Mostra versão desabilitada com tooltip
    return (
      <Tooltip 
        title={
          <Box>
            <Typography variant="caption" display="block">
              Você não tem permissão para esta ação
            </Typography>
            <Typography variant="caption" display="block" sx={{ mt: 0.5, opacity: 0.8 }}>
              Permissões necessárias: {translatePermissions(requiredPermissions).join(', ')}
            </Typography>
          </Box>
        }
        arrow
      >
        <Box 
          sx={{ 
            display: 'inline-block',
            position: 'relative',
            opacity: 0.5,
            pointerEvents: 'none',
            cursor: 'not-allowed',
          }}
        >
          {children}
          {showLockIcon && (
            <Lock 
              sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                fontSize: 20,
                color: 'error.main',
              }} 
            />
          )}
        </Box>
      </Tooltip>
    );
  }

  // Tem permissão, renderiza normalmente
  return <>{children}</>;
};

export default ProtectedComponent;