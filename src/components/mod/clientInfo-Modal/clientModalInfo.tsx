import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
} from "@mui/material";

import { Props } from "../../../types/clientModalInfo";
import { StyledDialog, StyledDialogTitle, StyledDialogContent } from "./styles";

const ClientInfoModal: React.FC<Props> = ({ open, client, onClose }) => {
  if (!client) return null;

  return (
    <StyledDialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <StyledDialogTitle>Informações do Cliente</StyledDialogTitle>
      <StyledDialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>
              <strong>Nome:</strong> {client.NomeCompleto}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>CPF:</strong> {client.CPF}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Data de Nascimento:</strong> {client.DataNascimento}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Telefone:</strong> {client.Telefone}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Email:</strong> {client.Email}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Gênero:</strong> {client.Genero}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Endereço:</strong> {client.Endereco}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Plano:</strong> {client.Plano}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Convênio:</strong> {client.Convenio}
            </Typography>
          </Grid>
        </Grid>
      </StyledDialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Fechar
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default ClientInfoModal;
