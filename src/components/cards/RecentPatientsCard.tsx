import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  CircularProgress,
  Alert,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import {
  Person as PersonIcon,
  ArrowForward as ArrowIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import patientService, { Patient } from "../../services/patientService";

const RecentPatientsCard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentPatients, setRecentPatients] = useState<Patient[]>([]);

  useEffect(() => {
    loadRecentPatients();
  }, []);

  const loadRecentPatients = async () => {
    try {
      setLoading(true);
      const data = await patientService.getAll();

      // Ordenar por data de cadastro (mais recentes primeiro) e pegar os 5 primeiros
      const sorted = data
        .sort((a, b) => {
          const dateA = a.registrationDate ? new Date(a.registrationDate).getTime() : 0;
          const dateB = b.registrationDate ? new Date(b.registrationDate).getTime() : 0;
          return dateB - dateA;
        })
        .slice(0, 5);

      setRecentPatients(sorted);
    } catch (error: any) {
      console.error("Erro ao carregar pacientes recentes:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "Data não informada";

    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return "Hoje";
      if (diffDays === 1) return "Ontem";
      if (diffDays < 7) return `${diffDays} dias atrás`;

      return date.toLocaleDateString("pt-BR");
    } catch {
      return dateString;
    }
  };

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  };

  const getStatusColor = (status?: string): "success" | "warning" | "default" => {
    if (!status) return "default";
    if (status === "Active") return "success";
    if (status === "Under Review") return "warning";
    return "default";
  };

  const getStatusLabel = (status?: string): string => {
    if (!status) return "Sem status";
    if (status === "Active") return "Ativo";
    if (status === "Under Review") return "Em análise";
    if (status === "Inactive") return "Inativo";
    return status;
  };

  if (loading) {
    return (
      <Card elevation={3}>
        <CardContent>
          <Box display="flex" justifyContent="center" alignItems="center" py={5}>
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card elevation={3}>
        <CardContent>
          <Alert severity="error">{error}</Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={3}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold">
            Pacientes Recentes
          </Typography>
          <Button
            size="small"
            endIcon={<ArrowIcon />}
            onClick={() => navigate("/clientes")}
          >
            Ver Todos
          </Button>
        </Box>

        {recentPatients.length === 0 ? (
          <Box textAlign="center" py={3}>
            <Typography variant="body2" color="text.secondary">
              Nenhum paciente cadastrado ainda
            </Typography>
            <Button
              variant="contained"
              size="small"
              sx={{ mt: 2 }}
              onClick={() => navigate("/cadastro-usuario")}
            >
              Cadastrar Primeiro Paciente
            </Button>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {recentPatients.map((patient, index) => (
              <React.Fragment key={patient.id}>
                {index > 0 && <Divider />}
                <ListItem
                  sx={{
                    px: 0,
                    py: 1.5,
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "action.hover",
                      borderRadius: 1,
                    },
                  }}
                  onClick={() => navigate(`/clientes/${patient.id}`)}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body1" fontWeight="medium">
                          {patient.name}
                        </Typography>
                        <Chip
                          label={getStatusLabel(patient.status)}
                          color={getStatusColor(patient.status)}
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {calculateAge(patient.birthDate)} anos • {formatDate(patient.registrationDate)}
                      </Typography>
                    }
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentPatientsCard;