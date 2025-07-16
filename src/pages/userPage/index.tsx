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
} from "@mui/material";
import { useAuth } from "../../shared/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { estadosBrasil } from "../../utils/estados";
import { occupationOptions } from "../../constants/occupationOptions";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  userProfileSchema,
  UserProfileFormData,
} from "../../schemas/userPageSchemas";

import ChangeEmail from "../changeEmail";
import ChangePassword from "../changePassword";

export default function UserPage() {
  const { user, logout, updateUserAvatar } = useAuth();
  const navigate = useNavigate();

  const [view, setView] = useState<"main" | "email" | "password">("main");
  const [preview, setPreview] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      gender: "",
      email: "",
      phone: "",
      occupation: "",
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  useEffect(() => {
    if (user?.email) {
      const savedImage = localStorage.getItem(
        `user-profile-image-${user.email}`
      );
      if (savedImage) setPreview(savedImage);
      else if (user.avatar) setPreview(user.avatar);

      const savedData = localStorage.getItem(`user-profile-data-${user.email}`);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        Object.keys(parsed).forEach((key) => {
          setValue(key as keyof UserProfileFormData, parsed[key]);
        });
      } else {
        setValue("firstName", user.firstName || "");
        setValue("lastName", user.lastName || "");
        setValue("birthDate", user.birthDate || "");
        setValue("gender", user.gender || "");
        setValue("email", user.email || "");
        setValue("phone", user.phone || "");
        setValue("occupation", user.occupation || "");
        setValue("street", user.street || "");
        setValue("number", user.number || "");
        setValue("neighborhood", user.neighborhood || "");
        setValue("city", user.city || "");
        setValue("state", user.state || "");
        setValue("zip", user.zip || "");
      }
    }
  }, [user, setValue]);

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

  const onSubmit = (data: UserProfileFormData) => {
    if (user?.email) {
      localStorage.setItem(
        `user-profile-data-${user.email}`,
        JSON.stringify(data)
      );
      alert("Dados salvos com sucesso!");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleBackToMain = () => setView("main");

  return (
    <Box p={4}>
      {view === "main" && (
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
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Nome"
                        fullWidth
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Sobrenome"
                        fullWidth
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="birthDate"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Data de Nascimento"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.birthDate}
                        helperText={errors.birthDate?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        fullWidth
                        displayEmpty
                        error={!!errors.gender}
                      >
                        <MenuItem value="">Gênero</MenuItem>
                        <MenuItem value="male">Masculino</MenuItem>
                        <MenuItem value="female">Feminino</MenuItem>
                        <MenuItem value="other">Outro</MenuItem>
                      </Select>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="E-mail"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        disabled
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Telefone"
                        fullWidth
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Controller
                    name="occupation"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        fullWidth
                        displayEmpty
                        error={!!errors.occupation}
                      >
                        <MenuItem value="">Selecione sua ocupação</MenuItem>
                        {occupationOptions.map((occupation) => (
                          <MenuItem key={occupation} value={occupation}>
                            {occupation}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Endereço
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={10}>
                  <Controller
                    name="street"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Rua"
                        fullWidth
                        error={!!errors.street}
                        helperText={errors.street?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Controller
                    name="number"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Número"
                        fullWidth
                        error={!!errors.number}
                        helperText={errors.number?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Controller
                    name="neighborhood"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Bairro"
                        fullWidth
                        error={!!errors.neighborhood}
                        helperText={errors.neighborhood?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Cidade"
                        fullWidth
                        error={!!errors.city}
                        helperText={errors.city?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        fullWidth
                        displayEmpty
                        error={!!errors.state}
                      >
                        <MenuItem value="">Estado</MenuItem>
                        {estadosBrasil.map((estado) => (
                          <MenuItem key={estado.sigla} value={estado.sigla}>
                            {estado.nome}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Controller
                    name="zip"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="CEP"
                        fullWidth
                        error={!!errors.zip}
                        helperText={errors.zip?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
                sx={{ mt: 3 }}
              >
                Salvar Dados
              </Button>

              <Divider sx={{ my: 4 }} />

              <Box
                display="flex"
                gap={2}
                mt={3}
                justifyContent="center"
                flexWrap="wrap"
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setView("email")}
                  sx={{
                    flex: 1,
                    minWidth: 140,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: "600",
                    py: 1.5,
                  }}
                >
                  Alterar E-mail
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setView("password")}
                  sx={{
                    flex: 1,
                    minWidth: 140,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: "600",
                    py: 1.5,
                  }}
                >
                  Alterar Senha
                </Button>
              </Box>
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
                  watch("firstName")?.charAt(0).toUpperCase() || "U"
                )}
              </Avatar>

              <Typography variant="h6" mt={2}>
                {watch("firstName") && watch("lastName")
                  ? `${watch("firstName")} ${watch("lastName")}`
                  : "Usuário"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {watch("occupation") || "Ocupação não definida"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {watch("city") && watch("state")
                  ? `${watch("city")}, ${watch("state")}`
                  : "Localização não definida"}
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
      )}

      {view === "email" && user?.email && (
        <ChangeEmail onBack={handleBackToMain} clientEmail={user.email} />
      )}

      {view === "password" && <ChangePassword onBack={handleBackToMain} />}
    </Box>
  );
}
