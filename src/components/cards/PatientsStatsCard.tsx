import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import {
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
  HourglassEmpty as ReviewIcon,
} from "@mui/icons-material";
import patientService, { Patient } from "../../services/patientService";

interface StatCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const PatientsStatsCard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);

  // Estatísticas
  const [totalPatients, setTotalPatients] = useState(0);
  const [activePatients, setActivePatients] = useState(0);
  const [inactivePatients, setInactivePatients] = useState(0);
  const [underReview, setUnderReview] = useState(0);
  const [newThisMonth, setNewThisMonth] = useState(0);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await patientService.getAll();
      setPatients(data);

      // Calcular estatísticas
      setTotalPatients(data.length);

      // Por status
      const active = data.filter((p) => p.active).length;
      const inactive = data.filter((p) => !p.active).length;
      const review = data.filter((p) => p.status === "Under Review").length;

      setActivePatients(active);
      setInactivePatients(inactive);
      setUnderReview(review);

      // Novos este mês
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const newPatients = data.filter((p) => {
        if (!p.registrationDate) return false;
        const regDate = new Date(p.registrationDate);
        return regDate >= startOfMonth;
      }).length;

      setNewThisMonth(newPatients);
    } catch (error: any) {
      console.error("Erro ao carregar estatísticas:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const stats: StatCard[] = [
    {
      title: "Total de Pacientes",
      value: totalPatients,
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: "#1976d2",
      bgColor: "#e3f2fd",
    },
    {
      title: "Pacientes Ativos",
      value: activePatients,
      icon: <ActiveIcon sx={{ fontSize: 40 }} />,
      color: "#2e7d32",
      bgColor: "#e8f5e9",
    },
    {
      title: "Em Análise",
      value: underReview,
      icon: <ReviewIcon sx={{ fontSize: 40 }} />,
      color: "#ed6c02",
      bgColor: "#fff3e0",
    },
    {
      title: "Novos Este Mês",
      value: newThisMonth,
      icon: <PersonAddIcon sx={{ fontSize: 40 }} />,
      color: "#9c27b0",
      bgColor: "#f3e5f5",
    },
  ];

  if (loading) {
    return (
      <Card>
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
      <Card>
        <CardContent>
          <Alert severity="error">{error}</Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={3}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight="bold">
            Estatísticas de Pacientes
          </Typography>
          <Chip
            label={`${totalPatients} total`}
            color="primary"
            size="small"
          />
        </Box>

        <Grid container spacing={2}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: stat.bgColor,
                  border: `1px solid ${stat.color}20`,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 2,
                  },
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      color: stat.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box flex={1}>
                    <Typography variant="h4" fontWeight="bold" color={stat.color}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PatientsStatsCard;