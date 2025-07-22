import React from "react";
import {
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import {
  Block as BlockIcon,
  Security as SecurityIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";

interface AccessDeniedModalProps {
  open: boolean;
  onClose: () => void;
  routeName: string;
  userPermissions: string[];
  requiredPermissions: string[];
}

const AccessDeniedModal: React.FC<AccessDeniedModalProps> = ({
  open,
  onClose,
  routeName,
  userPermissions,
  requiredPermissions,
}) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    onClose();
    navigate("/home");
  };

  const handleGoBack = () => {
    onClose();

    window.history.back();
  };

  const handleCloseModal = () => {
    onClose();

    navigate("/home");
  };

  return (
    <S.StyledDialog
      open={open}
      onClose={handleCloseModal}
      maxWidth="sm"
      fullWidth
    >
      <S.StyledDialogTitle>
        <SecurityIcon fontSize="large" />
        <Typography variant="h6" fontWeight="bold">
          Acesso Negado
        </Typography>
      </S.StyledDialogTitle>

      <DialogContent>
        <S.ContentContainer>
          <S.IconContainer>
            <BlockIcon className="icon" />
          </S.IconContainer>

          <Typography
            variant="h6"
            gutterBottom
            fontWeight="bold"
            color="error.main"
          >
            Você não tem permissão para acessar esta página
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            <strong>{routeName}</strong> requer permissões específicas que você
            não possui.
          </Typography>

          <Alert severity="info" sx={{ mb: 3, textAlign: "left" }}>
            <Typography variant="subtitle2" gutterBottom>
              📋 Permissões necessárias:
            </Typography>
            <Box sx={{ mb: 2 }}>
              {requiredPermissions.map((permission) => (
                <S.PermissionChip
                  key={permission}
                  label={permission}
                  size="small"
                />
              ))}
            </Box>

            <Typography variant="subtitle2" gutterBottom>
              👤 Suas permissões atuais:
            </Typography>
            <Box>
              {userPermissions.length > 0 ? (
                userPermissions.map((permission) => (
                  <S.UserPermissionChip
                    key={permission}
                    label={permission}
                    size="small"
                  />
                ))
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontStyle="italic"
                >
                  Nenhuma permissão atribuída
                </Typography>
              )}
            </Box>
          </Alert>

          <Typography variant="body2" color="text.secondary">
            Entre em contato com o administrador do sistema para solicitar as
            permissões necessárias.
          </Typography>
        </S.ContentContainer>
      </DialogContent>

      <DialogActions>
        <S.ActionsContainer>
          <S.StyledButton>
            <Button onClick={handleGoBack} variant="outlined" color="inherit">
              Voltar
            </Button>
          </S.StyledButton>

          <S.StyledButton>
            <Button
              onClick={handleGoHome}
              variant="contained"
              startIcon={<HomeIcon />}
              sx={{ textTransform: "none" }}
            >
              Ir para o Painel
            </Button>
          </S.StyledButton>
        </S.ActionsContainer>
      </DialogActions>
    </S.StyledDialog>
  );
};

export default AccessDeniedModal;
