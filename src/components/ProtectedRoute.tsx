import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { usePermissions } from '../hooks/userPermission';
import { translatePermission } from '../utils/permissionTranslations';
import { 
  Box, 
  Typography, 
  Button, 
  Paper,
  Dialog,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { 
  Lock, 
  Home, 
  CheckCircle,
  Cancel,
  Warning,
} from '@mui/icons-material';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions: string[];
  requireAll?: boolean;
  redirectTo?: string;
  showAsModal?: boolean; // Nova prop para mostrar como modal
}

/**
 * Componente que protege rotas inteiras baseado em permissões
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermissions,
  requireAll = false,
  redirectTo,
  showAsModal = false,
}) => {
  const navigate = useNavigate();
  const { hasAllPermissions, hasAnyPermission, isAdmin, user } = usePermissions();
  const [openModal, setOpenModal] = React.useState(true);

  // Se não está logado, redireciona para login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin tem acesso a tudo
  if (isAdmin()) {
    return <>{children}</>;
  }

  // Verificar permissões
  const hasPermission = requireAll
    ? hasAllPermissions(requiredPermissions)
    : hasAnyPermission(requiredPermissions);

  // Se tem permissão, renderiza a rota
  if (hasPermission) {
    return <>{children}</>;
  }

  // Se tem redirectTo, redireciona
  if (redirectTo && !showAsModal) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleGoHome = () => {
    setOpenModal(false);
    navigate('/home');
  };

  const handleGoBack = () => {
    setOpenModal(false);
    navigate(-1);
  };

  // Versão Modal (mais sutil)
  if (showAsModal) {
    return (
      <Dialog 
        open={openModal} 
        maxWidth="sm" 
        fullWidth
        onClose={(_, reason) => {
          if (reason !== 'backdropClick') {
            handleGoHome();
          }
        }}
      >
        <DialogContent sx={{ textAlign: 'center', py: 4 }}>
          <Warning
            sx={{
              fontSize: 80,
              color: 'warning.main',
              mb: 2,
            }}
          />
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Permissão Necessária
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Você não tem permissão para acessar esta funcionalidade.
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ textAlign: 'left', mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold">
              Permissões necessárias:
            </Typography>
            <List dense>
              {requiredPermissions.map((perm) => (
                <ListItem key={perm} disableGutters>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Cancel color="error" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={translatePermission(perm)}
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {user.permissions && user.permissions.length > 0 && (
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                Suas permissões atuais:
              </Typography>
              <List dense>
                {user.permissions.slice(0, 3).map((perm) => (
                  <ListItem key={perm} disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={translatePermission(perm)}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
                {user.permissions.length > 3 && (
                  <ListItem disableGutters>
                    <ListItemText 
                      primary={`... e mais ${user.permissions.length - 3} permissões`}
                      primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
                    />
                  </ListItem>
                )}
              </List>
            </Box>
          )}

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Entre em contato com o administrador para solicitar acesso.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={handleGoBack} variant="outlined">
            Voltar
          </Button>
          <Button onClick={handleGoHome} variant="contained" startIcon={<Home />}>
            Ir para Início
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  // Versão Página Completa (mais enfática)
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
        p: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 6,
          maxWidth: 600,
          textAlign: 'center',
        }}
      >
        <Lock
          sx={{
            fontSize: 100,
            color: 'error.main',
            mb: 3,
          }}
        />
        <Typography variant="h4" gutterBottom fontWeight="bold">
          🚫 Acesso Negado
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Você não tem permissão para acessar esta página.
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ textAlign: 'left', mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            Permissões necessárias:
          </Typography>
          <List>
            {requiredPermissions.map((perm) => (
              <ListItem key={perm}>
                <ListItemIcon>
                  <Cancel color="error" />
                </ListItemIcon>
                <ListItemText 
                  primary={translatePermission(perm)}
                  secondary="Você não possui esta permissão"
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Entre em contato com o administrador do sistema para solicitar as permissões necessárias.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="outlined"
            size="large"
            onClick={handleGoBack}
          >
            Voltar
          </Button>
          <Button
            variant="contained"
            size="large"
            startIcon={<Home />}
            onClick={handleGoHome}
          >
            Ir para Início
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProtectedRoute;