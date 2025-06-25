import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Avatar,
  Paper,
  Divider,
  SelectChangeEvent,
} from "@mui/material";
import { useAuth } from "../shared/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { estadosBrasil } from "../utils/estados";

interface ProfileData {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  email: string;
  phone: string;
  street: string;
  number: string;
  city: string;
  state: string;
  zip: string;
  neighborhood: string;
}

export default function UserPage() {
  const { user, logout, updateUserAvatar } = useAuth();
  const navigate = useNavigate();

  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    email: "",
    phone: "",
    street: "",
    number: "",
    city: "",
    state: "",
    zip: "",
    neighborhood: "",
  });

  useEffect(() => {
    if (user?.email) {
      const savedImage = localStorage.getItem(
        `user-profile-image-${user.email}`
      );
      if (savedImage) setPreview(savedImage);
      else if (user.avatar) setPreview(user.avatar);

      const savedData = localStorage.getItem(`user-profile-data-${user.email}`);
      if (savedData) setFormData(JSON.parse(savedData));
    }
  }, [user]);

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && user?.email) {
      const base64 = await toBase64(file);
      setPreview(base64);
      localStorage.setItem(`user-profile-image-${user.email}`, base64);
      updateUserAvatar(base64);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (user?.email) {
      localStorage.setItem(
        `user-profile-data-${user.email}`,
        JSON.stringify(formData)
      );
      alert("Dados salvos com sucesso!");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box p={4}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Perfil do Usuário
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="h6" gutterBottom>
              Informações Pessoais
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nome"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleTextChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Sobrenome"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleTextChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Data de Nascimento"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleTextChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleSelectChange}
                  fullWidth
                  displayEmpty
                >
                  <MenuItem value="">Gênero</MenuItem>
                  <MenuItem value="male">Masculino</MenuItem>
                  <MenuItem value="female">Feminino</MenuItem>
                  <MenuItem value="other">Outro</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="E-mail"
                  name="email"
                  value={formData.email}
                  onChange={handleTextChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Telefone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleTextChange}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Endereço
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={10}>
                <TextField
                  label="Rua"
                  name="street"
                  value={formData.street}
                  onChange={handleTextChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Número"
                  name="number"
                  value={formData.number}
                  onChange={handleTextChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Bairro"
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleTextChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Cidade"
                  name="city"
                  value={formData.city}
                  onChange={handleTextChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Select
                  name="state"
                  value={formData.state}
                  onChange={handleSelectChange}
                  fullWidth
                  displayEmpty
                >
                  <MenuItem value="">Estado</MenuItem>
                  {estadosBrasil.map((estado) => (
                    <MenuItem key={estado.sigla} value={estado.sigla}>
                      {estado.nome}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="CEP"
                  name="zip"
                  value={formData.zip}
                  onChange={handleTextChange}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ mt: 3 }}
            >
              Salvar Dados
            </Button>

            <Divider sx={{ my: 4 }} />

            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/alterar-credenciais")}
              fullWidth
              sx={{ mt: 2 }}
            >
              Alterar E-mail e Senha
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
            <Avatar sx={{ width: 100, height: 100, margin: "0 auto" }}>
              {preview || user?.avatar ? (
                <img
                  src={preview || user?.avatar}
                  alt="avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                formData.firstName?.charAt(0).toUpperCase() || "U"
              )}
            </Avatar>

            <Typography variant="h6" mt={2}>
              {formData.firstName && formData.lastName
                ? `${formData.firstName} ${formData.lastName}`
                : "Usuário"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Desenvolvedor Front-end "treinee"
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Minas Gerais, Brasil
            </Typography>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
            <Typography variant="subtitle1" gutterBottom>
              Selecionar Foto de Perfil
            </Typography>

            <Box display="flex" gap={2} flexWrap="wrap" mt={2}>
              <Button variant="outlined" component="label">
                Escolher Imagem
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange}
                />
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                  py: 1.2,
                }}
              >
                Sair da Conta
              </Button>
            </Box>

            <Typography variant="caption" display="block" mt={2}>
              JPG, GIF ou PNG. Tamanho máximo: 800KB.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
