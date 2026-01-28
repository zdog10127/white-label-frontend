import React, { useState, FormEvent } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../shared/contexts/AuthContext";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    if (!email.trim()) {
      setError("O email é obrigatório");
      return false;
    }

    if (!validateEmail(email)) {
      setError("Formato de e-mail inválido. Use exemplo@exemplo.com");
      return false;
    }

    if (!password) {
      setError("A senha é obrigatória");
      return false;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);

      const success = await login(email, password);

      if (success) {
        console.log('✅ Login bem-sucedido! Redirecionando...');
        navigate("/home");
      } else {
        setError("E-mail ou senha incorretos");
      }
    } catch (error: any) {
      console.error("❌ Erro no login:", error);
      setError(error.message || "Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
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
          padding: 4,
          width: { xs: "90%", sm: 400 },
          border: 3,
          borderColor: "GrayText",
          borderRadius: 4,
        }}
      >
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            MedInova
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sistema de Gestão
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="E-mail"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            margin="normal"
            disabled={isLoading}
            autoComplete="email"
            placeholder="seu@email.com"
            error={!!error && !email}
          />
          <TextField
            fullWidth
            label="Senha"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            margin="normal"
            disabled={isLoading}
            autoComplete="current-password"
            placeholder="Mínimo 6 caracteres"
            error={!!error && !password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    disabled={isLoading}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
            disabled={isLoading}
            sx={{
              mt: 3,
              mb: 2,
              height: 48,
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Entrar"
            )}
          </Button>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Link
              component={RouterLink}
              to="/esqueci-senha"
              variant="body2"
              sx={{ textDecoration: "none" }}
            >
              Esqueceu sua senha?
            </Link>
            <Link
              component={RouterLink}
              to="/criar-conta"
              variant="body2"
              sx={{ textDecoration: "none" }}
            >
              Criar conta
            </Link>
          </Box>
        </Box>
        <Box textAlign="center" mt={4}>
          <Typography variant="caption" color="text.secondary">
            © 2025 MedInova
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;