import React, { useState, FormEvent } from "react";
import {
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  Link as MuiLink,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/contexts/AuthContext";
import { Link as RouterLink } from "react-router-dom";

import { BackgroundContainer, LoginPaper, LinksBox } from "./styles";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(email)) {
      setError("Formato de e-mail inválido. Use exemplo@exemplo.com");
      return;
    }

    const success = login(email, password);

    if (success) {
      navigate("/home");
    } else {
      setError("E-mail ou senha incorretos");
    }
  };

  return (
    <BackgroundContainer>
      <LoginPaper elevation={15}>
        <Typography variant="h4" align="center" gutterBottom>
          White Label
        </Typography>

        <Box component="form" onSubmit={handleSubmit} mt={3}>
          <TextField
            fullWidth
            label="Digite seu e-mail"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Digite sua senha"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            fullWidth
            variant="contained"
            type="submit"
            size="large"
            sx={{ mt: 2 }}
          >
            Entrar
          </Button>

          <LinksBox>
            <MuiLink component={RouterLink} to="/esqueci-senha" variant="body2">
              Esqueceu sua senha?
            </MuiLink>
            <MuiLink component={RouterLink} to="/criar-conta" variant="body2">
              Criar conta
            </MuiLink>
          </LinksBox>
        </Box>
      </LoginPaper>
    </BackgroundContainer>
  );
};

export default Login;
