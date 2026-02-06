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
  Link as MuiLink,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../services/authService";

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    if (!name.trim()) {
      setError("O nome é obrigatório");
      return false;
    }

    if (name.trim().length < 3) {
      setError("O nome deve ter pelo menos 3 caracteres");
      return false;
    }

    if (!email.trim()) {
      setError("O email é obrigatório");
      return false;
    }

    if (!validateEmail(email)) {
      setError("Formato de e-mail inválido");
      return false;
    }

    if (!phone.trim()) {
      setError("O telefone é obrigatório");
      return false;
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setError("Telefone inválido. Use (XX) XXXXX-XXXX");
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

    if (!confirmPassword) {
      setError("A confirmação de senha é obrigatória");
      return false;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
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

      const success = await authService.register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        phone: phone.replace(/\D/g, ""),
        confirmPassword: confirmPassword,
        role: ""
      });

      if (success) {
        console.log("✅ Registro bem-sucedido!");
        toast.success("Conta criada com sucesso! Redirecionando...");

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        setError("Erro ao criar conta. Tente novamente.");
      }
    } catch (error: any) {
      console.error("❌ Erro no registro:", error);
      setError(error.message || "Erro ao criar conta. Tente novamente.");
      toast.error(error.message || "Erro ao criar conta");
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
          width: { xs: "90%", sm: 450 },
          border: 3,
          borderColor: "GrayText",
          borderRadius: 4,
        }}
      >
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Criar Conta
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sistema de Gestão - AMPARA
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nome Completo *"
            variant="outlined"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError(null);
            }}
            margin="normal"
            disabled={isLoading}
            autoComplete="name"
            placeholder="Seu nome completo"
            error={!!error && !name}
          />
          <TextField
            fullWidth
            label="E-mail *"
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
            label="Telefone *"
            variant="outlined"
            value={phone}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");
              if (value.length <= 11) {
                if (value.length <= 2) {
                  value = value.replace(/^(\d{0,2})/, "($1");
                } else if (value.length <= 6) {
                  value = value.replace(/^(\d{2})(\d{0,4})/, "($1) $2");
                } else if (value.length <= 10) {
                  value = value.replace(
                    /^(\d{2})(\d{4})(\d{0,4})/,
                    "($1) $2-$3",
                  );
                } else {
                  value = value.replace(
                    /^(\d{2})(\d{5})(\d{0,4})/,
                    "($1) $2-$3",
                  );
                }
              }
              setPhone(value);
              setError(null);
            }}
            margin="normal"
            disabled={isLoading}
            autoComplete="tel"
            placeholder="(00) 00000-0000"
            error={!!error && !phone}
          />
          <TextField
            fullWidth
            label="Senha *"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            margin="normal"
            disabled={isLoading}
            autoComplete="new-password"
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
          <TextField
            fullWidth
            label="Confirmar Senha *"
            variant="outlined"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError(null);
            }}
            margin="normal"
            disabled={isLoading}
            autoComplete="new-password"
            placeholder="Digite a senha novamente"
            error={!!error && password !== confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
              "Criar Conta"
            )}
          </Button>
          <Box textAlign="center" mt={2}>
            <Typography variant="body2" color="text.secondary">
              Já tem uma conta?{" "}
              <MuiLink
                component={RouterLink}
                to="/login"
                sx={{ textDecoration: "none", fontWeight: "bold" }}
              >
                Fazer Login
              </MuiLink>
            </Typography>
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

export default Register;
