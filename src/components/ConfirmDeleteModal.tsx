import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import {
  WarningAmber as WarningIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  patientName: string;
  loading?: boolean;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  open,
  onClose,
  onConfirm,
  patientName,
  loading = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        elevation: 8,
      }}
    >
      {/* Título */}
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <WarningIcon color="error" fontSize="large" />
          <Typography variant="h6" fontWeight="bold">
            Confirmar Exclusão
          </Typography>
        </Box>
      </DialogTitle>

      {/* Conteúdo */}
      <DialogContent>
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="body2">
            Esta ação não pode ser desfeita!
          </Typography>
        </Alert>

        <Typography variant="body1" gutterBottom>
          Tem certeza que deseja excluir o paciente:
        </Typography>

        <Box
          sx={{
            p: 2,
            mt: 2,
            backgroundColor: "error.light",
            borderRadius: 1,
            border: "1px solid",
            borderColor: "error.main",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color="error.dark"
            textAlign="center"
          >
            {patientName}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Todos os dados deste paciente serão permanentemente removidos do sistema.
        </Typography>
      </DialogContent>

      {/* Ações */}
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={loading}
          startIcon={<CloseIcon />}
          size="large"
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={loading}
          startIcon={<DeleteIcon />}
          size="large"
          autoFocus
        >
          {loading ? "Excluindo..." : "Sim, Excluir"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;