import React from "react";
import { Typography } from "@mui/material";
import * as S from "./styles";

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
    <S.StyledDialog open={open} onClose={onClose}>
      <S.StyledDialogTitle>⚠️ Confirmar Exclusão</S.StyledDialogTitle>

      <S.StyledDialogContent>
        <S.MessageContainer>
          <Typography component="span">
            Tem certeza que deseja excluir{" "}
            <strong>{clientName ?? "este cliente"}</strong>?
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2, fontSize: "14px" }}
          >
            Esta ação não pode ser desfeita e todos os dados do cliente serão
            perdidos permanentemente.
          </Typography>
        </S.MessageContainer>
      </S.StyledDialogContent>

      <S.StyledDialogActions>
        <S.ActionsContainer>
          <S.CancelButton variant="outlined" onClick={onClose} color="inherit">
            Cancelar
          </S.CancelButton>
          <S.DeleteButton variant="contained" color="error" onClick={onConfirm}>
            🗑️ Excluir Cliente
          </S.DeleteButton>
        </S.ActionsContainer>
      </S.StyledDialogActions>
    </S.StyledDialog>
  );
};

export default DeleteClientModal;
