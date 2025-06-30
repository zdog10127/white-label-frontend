import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AlterCredentials = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error("E-mail inválido.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    toast.success("Credenciais atualizadas com sucesso!");

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

      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
};

export default AlterCredentials;
