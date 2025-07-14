import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

interface DeleteClientModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  clientName?: string;
}

const DeleteClientModal: React.FC<DeleteClientModalProps> = ({
  open,
  onClose,
  onConfirm,
  clientName,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Exclusão</DialogTitle>
      <DialogContent>
        <Typography>
          Tem certeza que deseja excluir{" "}
          <strong>{clientName ?? "este cliente"}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Box
          display="flex"
          justifyContent="flex-end"
          width="100%"
          gap={1}
          p={1}
        >
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Excluir
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteClientModal;
