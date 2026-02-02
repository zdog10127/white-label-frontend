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
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import authService from "../services/authService";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

      // Usar authService para fazer login com a API
      const response = await authService.login(email, password);

      console.log('✅ Login bem-sucedido!', response);
      toast.success(`Bem-vindo, ${response.user.name}!`);

      // Disparar evento customizado para o AuthContext sincronizar
      window.dispatchEvent(new Event('auth-login'));

      // Pequeno delay para garantir sincronização
      setTimeout(() => {
        navigate("/home");
        // Recarregar para garantir sincronização completa do contexto
        window.location.reload();
      }, 100);
      
    } catch (error: any) {
      console.error("❌ Erro no login:", error);
      
      // Extrair mensagem de erro da API
      const errorMessage = 
        error.response?.data?.detail || 
        error.response?.data?.message || 
        error.response?.data?.title ||
        "E-mail ou senha incorretos";
      
      setError(errorMessage);
      toast.error(errorMessage);
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