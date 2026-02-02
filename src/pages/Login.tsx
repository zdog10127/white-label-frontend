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
  Fade,
  Slide,
} from "@mui/material";
import { Visibility, VisibilityOff, LocalHospital } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { toast } from "react-toastify";
import Logo from "../components/Logo";

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
      setError("A senha deve ter no mínimo 6 caracteres");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        background: `
          linear-gradient(135deg, 
            #667eea 0%, 
            #764ba2 25%, 
            #f093fb 50%, 
            #4facfe 75%, 
            #00f2fe 100%
          )`,
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
        "@keyframes gradientShift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Elementos decorativos flutuantes */}
      <Box
        sx={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          top: "-100px",
          left: "-100px",
          animation: "float 20s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translate(0, 0)" },
            "50%": { transform: "translate(50px, 50px)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.05)",
          bottom: "-150px",
          right: "-150px",
          animation: "float 25s ease-in-out infinite reverse",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.08)",
          top: "30%",
          right: "10%",
          animation: "float 18s ease-in-out infinite",
        }}
      />

      {/* Container do formulário */}
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
          py: 4,
        }}
      >
        <Slide direction="down" in={true} timeout={800}>
          <Paper
            elevation={24}
            sx={{
              padding: { xs: 3, sm: 5 },
              width: "100%",
              maxWidth: 450,
              borderRadius: 4,
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            }}
          >
            <Fade in={true} timeout={1000}>
              <Box>
                {/* Logo e Título */}
                <Box textAlign="center" mb={4}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <Logo size={100} variant="icon" />
                  </Box>
                  <Typography
                    variant="h4"
                    gutterBottom
                    fontWeight="bold"
                    sx={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    MedInova
                  </Typography>
                  <Typography variant="body1" color="text.secondary" fontWeight={500}>
                    Sistema de Gestão em Saúde
                  </Typography>
                </Box>

                {/* Formulário */}
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        background: "rgba(255, 255, 255, 0.8)",
                      },
                    }}
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        background: "rgba(255, 255, 255, 0.8)",
                      },
                    }}
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
                    <Fade in={!!error}>
                      <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                        {error}
                      </Alert>
                    </Fade>
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
                      height: 56,
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      borderRadius: 2,
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      boxShadow: "0 4px 15px 0 rgba(102, 126, 234, 0.4)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                        boxShadow: "0 6px 20px 0 rgba(102, 126, 234, 0.6)",
                        transform: "translateY(-2px)",
                      },
                      "&:disabled": {
                        background: "linear-gradient(135deg, #ccc 0%, #999 100%)",
                      },
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={28} color="inherit" />
                    ) : (
                      "Entrar"
                    )}
                  </Button>
                </Box>

                {/* Rodapé */}
                <Box textAlign="center" mt={4}>
                  <Typography variant="caption" color="text.secondary">
                    © 2025 MedInova - Sistema de Gestão em Saúde
                  </Typography>
                </Box>
              </Box>
            </Fade>
          </Paper>
        </Slide>
      </Container>
    </Box>
  );
};

export default Login;