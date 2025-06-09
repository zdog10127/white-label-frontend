import React, { useState, FormEvent } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/contexts/AuthContext";
import { Password } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { blue } from "@mui/material/colors";



const Login: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim() !== "") {
      login(name);
      navigate("/dashboard");
    }
  };

  return (
<Container
  maxWidth={false} // desativa o limite de largura padrão do Container
  disableGutters    // remove padding horizontal padrão do Container
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
        width: 300,
        border: 3,
        borderColor:"GrayText", 
        borderRadius: 8, 
        }}>
        <Typography 
        variant="h4" 
        align="center" 
        gutterBottom

        
        >
          White Label
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Digite seu nome"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
         <TextField
            fullWidth
            label="Digite Sua Senha"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          
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
  width={'100%'}
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
