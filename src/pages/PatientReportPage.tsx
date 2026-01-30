import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Divider,
  Alert,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ArrowBack,
  PictureAsPdf,
  Description,
  TrendingDown,
  TrendingUp,
  CalendarMonth,
  Person,
  FitnessCenter,
  Height as HeightIcon,
  MonitorWeight,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'react-toastify';
import reportService from '../services/reportService';
import { PatientReportResponse } from '../types/report';
import { exportPatientReportToPDF } from '../utils/pdfExporter';
import { exportPatientReportToWord } from '../utils/wordExporter';

export default function PatientReportPage() {
  const { patientId } = useParams<{ patientId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { startDate, endDate, comments } = location.state || {};

  const [report, setReport] = useState<PatientReportResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (patientId && startDate && endDate) {
      loadReport();
    } else {
      toast.error('Parâmetros inválidos');
      navigate('/relatorios');
    }
  }, [patientId, startDate, endDate]);

  const loadReport = async () => {
    try {
      setLoading(true);
      const data = await reportService.generatePatientReport({
        patientId: patientId!,
        startDate,
        endDate,
        comments,
        includeMedicalHistory: true,
        includeEvolutions: true,
        includeAppointments: true,
        includeAnthropometricData: true,
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
    
    try {
      setExporting(true);
      await exportPatientReportToPDF(report);
      toast.success('Relatório exportado para PDF com sucesso!');
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      toast.error('Erro ao exportar PDF');
    } finally {
      setExporting(false);
    }
  };

  const handleExportWord = async () => {
    if (!report) return;
    
    try {
      setExporting(true);
      await exportPatientReportToWord(report);
      toast.success('Relatório exportado para Word com sucesso!');
    } catch (error) {
      console.error('Erro ao exportar Word:', error);
      toast.error('Erro ao exportar Word');
    } finally {
      setExporting(false);
    }
  };

  const formatDate = (date: string) => {
    return format(new Date(date), "dd/MM/yyyy", { locale: ptBR });
  };

  const formatDateTime = (date: string) => {
    return format(new Date(date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
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

  // Preparar dados para o gráfico
  const chartData = report.anthropometricData.map((data) => ({
    date: formatDate(data.date),
    peso: data.weight,
    imc: data.bmi,
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
            Relatório do Paciente
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
        {/* Informações do Paciente */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Avatar sx={{ width: 80, height: 80, fontSize: 32, bgcolor: '#1976d2' }}>
                  {report.patient.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {report.patient.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    CPF: {report.patient.cpf} | Idade: {report.patient.age} anos
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {report.patient.gender} | {report.patient.phone}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center">
                    <CalendarMonth sx={{ fontSize: 40, color: '#1976d2' }} />
                    <Typography variant="h6" fontWeight="bold">
                      {report.period.totalDays} dias
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Em Tratamento
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center">
                    <Person sx={{ fontSize: 40, color: '#2e7d32' }} />
                    <Typography variant="h6" fontWeight="bold">
                      {report.statistics.totalEvolutions}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Consultas Realizadas
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center">
                    <MonitorWeight sx={{ fontSize: 40, color: report.statistics.weightChange && report.statistics.weightChange < 0 ? '#2e7d32' : '#d32f2f' }} />
                    <Typography variant="h6" fontWeight="bold">
                      {report.statistics.weightChange
                        ? `${report.statistics.weightChange > 0 ? '+' : ''}${report.statistics.weightChange.toFixed(1)} kg`
                        : 'N/A'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Variação de Peso
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Box textAlign="center">
                    <FitnessCenter sx={{ fontSize: 40, color: report.statistics.bmiChange && report.statistics.bmiChange < 0 ? '#2e7d32' : '#d32f2f' }} />
                    <Typography variant="h6" fontWeight="bold">
                      {report.statistics.bmiChange
                        ? `${report.statistics.bmiChange > 0 ? '+' : ''}${report.statistics.bmiChange.toFixed(1)}`
                        : 'N/A'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Variação de IMC
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Gráfico de Evolução */}
        {chartData.length > 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  📈 Evolução de Peso e IMC
                </Typography>
                <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                  Período: {formatDate(startDate)} até {formatDate(endDate)}
                </Typography>

                <Box sx={{ width: '100%', height: 400, mt: 3 }}>
                  <ResponsiveContainer>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" label={{ value: 'Peso (kg)', angle: -90, position: 'insideLeft' }} />
                      <YAxis yAxisId="right" orientation="right" label={{ value: 'IMC', angle: 90, position: 'insideRight' }} />
                      <RechartsTooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="peso"
                        stroke="#1976d2"
                        strokeWidth={3}
                        name="Peso (kg)"
                        dot={{ r: 5 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="imc"
                        stroke="#d32f2f"
                        strokeWidth={3}
                        name="IMC"
                        dot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Histórico Médico */}
        {report.medicalHistory && (
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  📋 Histórico Médico
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Diagnóstico Principal:
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {report.medicalHistory.mainComplaint || 'Não informado'}
                  </Typography>

                  {report.medicalHistory.chronicDiseases.length > 0 && (
                    <>
                      <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        Doenças Crônicas:
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                        {report.medicalHistory.chronicDiseases.map((disease, index) => (
                          <Chip key={index} label={disease} size="small" color="error" variant="outlined" />
                        ))}
                      </Box>
                    </>
                  )}

                  {report.medicalHistory.medications.length > 0 && (
                    <>
                      <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        Medicações em Uso:
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                        {report.medicalHistory.medications.map((med, index) => (
                          <Chip key={index} label={med} size="small" color="primary" variant="outlined" />
                        ))}
                      </Box>
                    </>
                  )}

                  {report.medicalHistory.allergies.length > 0 && (
                    <>
                      <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        Alergias:
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                        {report.medicalHistory.allergies.map((allergy, index) => (
                          <Chip key={index} label={allergy} size="small" color="warning" variant="outlined" />
                        ))}
                      </Box>
                    </>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Dados Antropométricos Recentes */}
        {report.anthropometricData.length > 0 && (
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  📊 Dados Antropométricos Atuais
                </Typography>

                {(() => {
                  const latest = report.anthropometricData[report.anthropometricData.length - 1];
                  return (
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={6}>
                        <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                          <MonitorWeight sx={{ fontSize: 30, color: '#1976d2' }} />
                          <Typography variant="h6" fontWeight="bold">
                            {latest.weight?.toFixed(1) || 'N/A'} kg
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Peso
                          </Typography>
                        </Paper>
                      </Grid>

                      <Grid item xs={6}>
                        <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                          <HeightIcon sx={{ fontSize: 30, color: '#2e7d32' }} />
                          <Typography variant="h6" fontWeight="bold">
                            {latest.height?.toFixed(2) || 'N/A'} m
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Altura
                          </Typography>
                        </Paper>
                      </Grid>

                      <Grid item xs={12}>
                        <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                          <FitnessCenter sx={{ fontSize: 30, color: reportService.getBMIColor(latest.bmi || 0) }} />
                          <Typography variant="h6" fontWeight="bold">
                            {latest.bmi?.toFixed(1) || 'N/A'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" display="block">
                            IMC - {latest.bmi ? reportService.classifyBMI(latest.bmi) : 'N/A'}
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  );
                })()}
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Evoluções */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                📝 Evoluções ({report.evolutions.length})
              </Typography>

              {report.evolutions.length === 0 ? (
                <Alert severity="info">Nenhuma evolução registrada no período</Alert>
              ) : (
                <List>
                  {report.evolutions.slice(0, 5).map((evolution, index) => (
                    <React.Fragment key={evolution.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                              <Typography variant="subtitle1" fontWeight="bold">
                                {formatDate(evolution.date)} - {evolution.professionalName}
                              </Typography>
                              <Chip label={evolution.professionalRole} size="small" color="primary" />
                            </Box>
                          }
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              {evolution.subjectiveData && (
                                <Typography variant="body2" paragraph>
                                  <strong>Queixa:</strong> {evolution.subjectiveData}
                                </Typography>
                              )}
                              {evolution.assessment && (
                                <Typography variant="body2" paragraph>
                                  <strong>Avaliação:</strong> {evolution.assessment}
                                </Typography>
                              )}
                              {evolution.plan && (
                                <Typography variant="body2">
                                  <strong>Conduta:</strong> {evolution.plan}
                                </Typography>
                              )}
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < Math.min(report.evolutions.length - 1, 4) && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}

              {report.evolutions.length > 5 && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  Mostrando apenas as 5 evoluções mais recentes. Exporteem PDF ou Word para ver todas as {report.evolutions.length} evoluções.
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Observações do Relatório */}
        {report.comments && (
          <Grid item xs={12}>
            <Card sx={{ bgcolor: '#f8f9fa' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  💬 Observações do Profissional
                </Typography>
                <Paper elevation={0} sx={{ p: 2, bgcolor: 'white', mt: 2 }}>
                  <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                    {report.comments}
                  </Typography>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Rodapé */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: '#f5f5f5', textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Relatório gerado em {formatDateTime(report.generatedAt)}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}