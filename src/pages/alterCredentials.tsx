import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AlterCredentials = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setSnackbar({
        open: true,
        message: "E-mail inválido.",
        severity: "error",
      });
      return;
    }

    if (newPassword.length < 6) {
      setSnackbar({
        open: true,
        message: "A senha deve ter pelo menos 6 caracteres.",
        severity: "error",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setSnackbar({
        open: true,
        message: "As senhas não coincidem.",
        severity: "error",
      });
      return;
    }

    setSnackbar({
      open: true,
      message: "Credenciais atualizadas com sucesso!",
      severity: "success",
    });

    setTimeout(() => {
      navigate("/perfil");
    }, 1500);
  };

  return (
    <Box display="flex" justifyContent="center" p={4}>
      <Paper sx={{ p: 4, width: "100%", maxWidth: 500 }}>
        <Typography variant="h5" gutterBottom>
          Alterar E-mail e Senha
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Novo E-mail"
            autoComplete="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ my: 2 }}
          />
          <TextField
            label="Nova Senha"
            type="password"
            autoComplete="new-password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Confirmar Senha"
            type="password"
            autoComplete="new-password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 1.5, fontWeight: "bold" }}
          >
            Salvar Alterações
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity as any} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AlterCredentials;
