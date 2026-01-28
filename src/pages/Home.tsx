import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
} from "@mui/material";
import {
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Description as DescriptionIcon,
  Image as ImageIcon,
  LocalHospital as LocalHospitalIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import patientService, { Patient } from "../services/patientService";
import dayjs from "dayjs";
import { DashboardCardSkeleton, DashboardChartSkeleton } from "../components/LoadingSkeletons";

export default function DashboardHome(): JSX.Element {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      setLoading(true);
      const data = await patientService.getAll();
      setPatients(data);
    } catch (error: any) {
      console.error("Erro ao carregar pacientes:", error);
      toast.error("Erro ao carregar dados do dashboard");
    } finally {
      setLoading(false);
    }
  };

  const totalPatients = patients.length;
  const activePatients = patients.filter((p) => p.active).length;
  const inactivePatients = patients.filter((p) => !p.active).length;

  const fiveYearsCompleted = patients.filter((p) => p.fiveYears).length;

  const authorizeImage = patients.filter((p) => p.authorizeImage).length;

  const totalDocsDelivered = patients.reduce((acc, p) => {
    if (!p.documents) return acc;
    const docs = p.documents;
    const delivered = [
      docs.identity,
      docs.cpfDoc,
      docs.marriageCertificate,
      docs.medicalReport,
      docs.recentExams,
      docs.addressProof,
      docs.incomeProof,
      docs.hospitalCardDoc,
      docs.susCardDoc,
      docs.biopsyResultDoc,
    ].filter(Boolean).length;
    return acc + delivered;
  }, 0);

  const patientsByYear: { [key: string]: number } = {};
  patients.forEach((p) => {
    if (p.treatmentYear) {
      const year = p.treatmentYear.toString();
      patientsByYear[year] = (patientsByYear[year] || 0) + 1;
    }
  });

  const sortedYears = Object.keys(patientsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  const cancerTypes: { [key: string]: number } = {};
  patients.forEach((p) => {
    if (p.cancer?.type) {
      cancerTypes[p.cancer.type] = (cancerTypes[p.cancer.type] || 0) + 1;
    }
  });

  const topCancerTypes = Object.entries(cancerTypes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const recentPatients = patients.filter((p) =>
    dayjs(p.registrationDate).isAfter(dayjs().subtract(30, "day"))
  ).length;

  const statusCount = {
    active: patients.filter((p) => p.status === "Active").length,
    underReview: patients.filter((p) => p.status === "Under Review").length,
    inactive: patients.filter((p) => p.status === "Inactive").length,
    completed: patients.filter((p) => p.status === "Completed").length,
  };

  if (loading) {
    return (
      <Box p={3}>
        <Box mb={4}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sistema de Gestão de Pacientes - Visão Geral
          </Typography>
        </Box>
        <Grid container spacing={3} mb={4}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <DashboardCardSkeleton />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} md={6} key={item}>
              <DashboardChartSkeleton />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sistema de Gestão de Pacientes - Visão Geral
        </Typography>
      </Box>
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Total de Pacientes
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {totalPatients}
                  </Typography>
                </Box>
                <PeopleIcon sx={{ fontSize: 48, color: "primary.main", opacity: 0.3 }} />
              </Box>
              <Box mt={2} display="flex" gap={1}>
                <Chip label={`${activePatients} ativos`} size="small" color="success" />
                <Chip label={`${inactivePatients} inativos`} size="small" color="default" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Novos (30 dias)
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {recentPatients}
                  </Typography>
                </Box>
                <PersonAddIcon sx={{ fontSize: 48, color: "info.main", opacity: 0.3 }} />
              </Box>
              <Box mt={2}>
                <Typography variant="body2" color="text.secondary">
                  Cadastrados no último mês
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Completaram 5 Anos
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {fiveYearsCompleted}
                  </Typography>
                </Box>
                <CheckCircleIcon sx={{ fontSize: 48, color: "success.main", opacity: 0.3 }} />
              </Box>
              <Box mt={2}>
                <Typography variant="body2" color="text.secondary">
                  {((fiveYearsCompleted / totalPatients) * 100 || 0).toFixed(1)}% do total
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Docs Entregues
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {totalDocsDelivered}
                  </Typography>
                </Box>
                <DescriptionIcon sx={{ fontSize: 48, color: "info.main", opacity: 0.3 }} />
              </Box>
              <Box mt={2}>
                <Typography variant="body2" color="text.secondary">
                  Total de documentos no sistema
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Pacientes por Ano de Tratamento
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {sortedYears.length > 0 ? (
                <List dense>
                  {sortedYears.map((year) => (
                    <ListItem key={year}>
                      <ListItemText
                        primary={year}
                        secondary={
                          <Box width="100%" mt={1}>
                            <Box display="flex" justifyContent="space-between" mb={0.5}>
                              <Typography variant="body2">
                                {patientsByYear[year]} pacientes
                              </Typography>
                              <Typography variant="body2">
                                {((patientsByYear[year] / totalPatients) * 100).toFixed(1)}%
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={(patientsByYear[year] / totalPatients) * 100}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary" textAlign="center" py={3}>
                  Nenhum ano de tratamento registrado
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <LocalHospitalIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Top 5 Tipos de Câncer
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {topCancerTypes.length > 0 ? (
                <List dense>
                  {topCancerTypes.map(([type, count]) => (
                    <ListItem key={type}>
                      <ListItemText
                        primary={type}
                        secondary={
                          <Box width="100%" mt={1}>
                            <Box display="flex" justifyContent="space-between" mb={0.5}>
                              <Typography variant="body2">{count} casos</Typography>
                              <Typography variant="body2">
                                {((count / totalPatients) * 100).toFixed(1)}%
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={(count / totalPatients) * 100}
                              color="secondary"
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary" textAlign="center" py={3}>
                  Nenhum tipo de câncer registrado
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <DescriptionIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Documentos no Sistema
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box>
                <Box
                  p={3}
                  bgcolor="grey.100"
                  borderRadius={1}
                  textAlign="center"
                >
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Total de Documentos Cadastrados
                  </Typography>
                  <Typography variant="h2" fontWeight="bold" color="primary.main">
                    {totalDocsDelivered}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Documentos entregues pelos pacientes
                  </Typography>
                </Box>
                <Box mt={3}>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    Os documentos são opcionais e servem para
                    <br />
                    complementar o cadastro dos pacientes
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <ImageIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Informações Adicionais
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box>
                <Box mb={3}>
                  <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                    Status dos Pacientes
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                    <Chip
                      label={`Ativo: ${statusCount.active}`}
                      color="success"
                      size="small"
                    />
                    <Chip
                      label={`Em Análise: ${statusCount.underReview}`}
                      color="warning"
                      size="small"
                    />
                    <Chip
                      label={`Inativo: ${statusCount.inactive}`}
                      color="default"
                      size="small"
                    />
                    <Chip
                      label={`Concluído: ${statusCount.completed}`}
                      color="info"
                      size="small"
                    />
                  </Box>
                </Box>
                <Box mb={3}>
                  <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                    Autorização de Imagem
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="body2">Autorizaram:</Typography>
                    <Typography variant="body2" fontWeight="bold" color="success.main">
                      {authorizeImage} ({((authorizeImage / totalPatients) * 100 || 0).toFixed(1)}%)
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="body2">Não autorizaram:</Typography>
                    <Typography variant="body2" fontWeight="bold" color="error.main">
                      {totalPatients - authorizeImage} (
                      {(((totalPatients - authorizeImage) / totalPatients) * 100 || 0).toFixed(1)}
                      %)
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                    Distribuição por Gênero
                  </Typography>
                  <Box display="flex" gap={1} mt={1}>
                    <Chip
                      label={`Masculino: ${
                        patients.filter((p) => p.gender === "Masculino").length
                      }`}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={`Feminino: ${
                        patients.filter((p) => p.gender === "Feminino").length
                      }`}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={`Outro: ${
                        patients.filter((p) => p.gender === "Outro").length
                      }`}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}