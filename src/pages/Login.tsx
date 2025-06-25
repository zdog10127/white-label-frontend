import React, { useState, FormEvent } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../shared/contexts/AuthContext";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const success = login(email, password);

    if (success) {
      navigate("/home");
    } else {
      setError("email ou senha incorretos");
    }
  };
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url('assets/fundo3dbranco.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={15}
        sx={{
          padding: 10,
          mt: 10,
          width: 350,
          border: 3,
          borderColor: "GrayText",
          borderRadius: 8,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          White Label
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
            sx={{ mt: 2 }}
            size="large"
          >
            Entrar
          </Button>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width={"100%"}
            mt={10}
          >
            <Link component={RouterLink} to="/esqueci-senha" variant="body2">
              Esqueceu sua senha?
            </Link>
            <Link component={RouterLink} to="/criar-conta" variant="body2">
              Criar conta
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
