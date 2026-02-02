import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Paper,
  CircularProgress,
  IconButton,
  Stack,
} from '@mui/material';
import {
  ArrowBack,
  PictureAsPdf,
  Description,
  People,
  PersonAdd,
  CalendarMonth,
  TrendingUp,
} from '@mui/icons-material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'react-toastify';
import reportService from '../services/reportService';
import { ConsolidatedReportResponse } from '../types/report';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

export default function ConsolidatedReportPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { startDate, endDate } = location.state || {};

  const [report, setReport] = useState<ConsolidatedReportResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (startDate && endDate) {
      loadReport();
    } else {
      toast.error('Parâmetros inválidos');
      navigate('/relatorios');
    }
  }, [startDate, endDate]);

  const loadReport = async () => {
    try {
      setLoading(true);
      const data = await reportService.generateConsolidatedReport({
        startDate,
        endDate,
      });
      setReport(data);
    } catch (error: any) {
      console.error('Erro ao carregar relatório:', error);
      toast.error(error.response?.data?.detail || 'Erro ao carregar relatório');
      navigate('/relatorios');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    if (!report) return;
    toast.info('Exportação de PDF do relatório consolidado em desenvolvimento');
  };

  const handleExportWord = async () => {
    if (!report) return;
    toast.info('Exportação de Word do relatório consolidado em desenvolvimento');
  };

  const formatDate = (date: string) => {
    return format(new Date(date), "dd/MM/yyyy", { locale: ptBR });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!report) {
    return null;
  }

  // Preparar dados para gráficos
  const genderData = Object.entries(report.patientsByGender).map(([name, value]) => ({
    name,
    value,
  }));

  const ageGroupData = Object.entries(report.patientsByAgeGroup).map(([name, value]) => ({
    name,
    value,
  }));

  const professionalData = Object.entries(report.appointmentsByProfessional)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, value]) => ({
      name,
      atendimentos: value,
    }));

  return (
    <Box sx={{ p: 3 }}>
      {/* Cabeçalho */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton onClick={() => navigate('/relatorios')}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" fontWeight="bold">
            Relatório Consolidado
          </Typography>
        </Box>
        
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<PictureAsPdf />}
            onClick={handleExportPDF}
            disabled={exporting}
          >
            Exportar PDF
          </Button>
          <Button
            variant="outlined"
            startIcon={<Description />}
            onClick={handleExportWord}
            disabled={exporting}
          >
            Exportar Word
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        {/* Período */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', textAlign: 'center' }}>
            <Typography variant="h6" fontWeight="bold">
              Período: {formatDate(startDate)} até {formatDate(endDate)}
            </Typography>
          </Paper>
        </Grid>

        {/* KPIs Principais */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box textAlign="center">
                <People sx={{ fontSize: 50, color: '#1976d2', mb: 1 }} />
                <Typography variant="h4" fontWeight="bold">
                  {report.totalPatients}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total de Pacientes
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box textAlign="center">
                <PersonAdd sx={{ fontSize: 50, color: '#2e7d32', mb: 1 }} />
                <Typography variant="h4" fontWeight="bold">
                  {report.newPatients}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Novos Pacientes
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box textAlign="center">
                <CalendarMonth sx={{ fontSize: 50, color: '#ed6c02', mb: 1 }} />
                <Typography variant="h4" fontWeight="bold">
                  {report.totalAppointments}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total de Atendimentos
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box textAlign="center">
                <TrendingUp sx={{ fontSize: 50, color: '#9c27b0', mb: 1 }} />
                <Typography variant="h4" fontWeight="bold">
                  {report.totalEvolutions}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Evoluções Registradas
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Gráfico de Pizza - Distribuição por Gênero */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                📊 Distribuição por Gênero
              </Typography>
              <Box sx={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Gráfico de Pizza - Distribuição por Faixa Etária */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                📊 Distribuição por Faixa Etária
              </Typography>
              <Box sx={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={ageGroupData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {ageGroupData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Gráfico de Barras - Atendimentos por Profissional */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                📊 Atendimentos por Profissional (Top 10)
              </Typography>
              <Box sx={{ width: '100%', height: 400, mt: 2 }}>
                <ResponsiveContainer>
                  <BarChart data={professionalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="atendimentos" fill="#1976d2" name="Atendimentos" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Rodapé */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Relatório gerado em {format(new Date(report.generatedAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}