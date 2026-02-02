import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Paper,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Assessment,
  Person,
  PictureAsPdf,
  Description,
  DateRange,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import patientService from '../services/patientService';
import reportService from '../services/reportService';
import { PatientReportRequest } from '../types/report';
import { toast } from 'react-toastify';
import ProtectedComponent from '../components/ProtectedComponent';
import { Permissions } from '../hooks/userPermission';

export default function ReportsPage() {
  const navigate = useNavigate();
  
  // Estados
  const [reportType, setReportType] = useState<'patient' | 'consolidated'>('patient');
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingPatients, setLoadingPatients] = useState(true);

  // Carregar pacientes
  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      setLoadingPatients(true);
      const data = await patientService.getAll();
      setPatients(data);
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
      toast.error('Erro ao carregar lista de pacientes');
    } finally {
      setLoadingPatients(false);
    }
  };

  // Gerar relatório
  const handleGenerateReport = async () => {
    // Validações
    if (reportType === 'patient' && !selectedPatient) {
      toast.warning('Selecione um paciente');
      return;
    }

    if (!startDate || !endDate) {
      toast.warning('Selecione o período do relatório');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error('Data inicial não pode ser maior que data final');
      return;
    }

    setLoading(true);

    try {
      if (reportType === 'patient') {
        // Redirecionar para página de relatório do paciente
        navigate(`/relatorios/paciente/${selectedPatient}`, {
          state: { startDate, endDate, comments }
        });
      } else {
        // Redirecionar para página de relatório consolidado
        navigate('/relatorios/consolidado', {
          state: { startDate, endDate }
        });
      }
    } catch (error: any) {
      console.error('Erro ao gerar relatório:', error);
      toast.error(error.response?.data?.detail || 'Erro ao gerar relatório');
    } finally {
      setLoading(false);
    }
  };

  // Definir período pré-definido
  const setPredefinedPeriod = (period: 'month' | 'quarter' | 'year') => {
    const end = new Date();
    const start = new Date();

    switch (period) {
      case 'month':
        start.setMonth(start.getMonth() - 1);
        break;
      case 'quarter':
        start.setMonth(start.getMonth() - 3);
        break;
      case 'year':
        start.setFullYear(start.getFullYear() - 1);
        break;
    }

    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Cabeçalho */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          📊 Relatórios
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Seleção de Tipo de Relatório */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Tipo de Relatório
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={reportType === 'patient' ? 8 : 2}
                    sx={{
                      p: 3,
                      cursor: 'pointer',
                      border: reportType === 'patient' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                      transition: 'all 0.3s',
                      '&:hover': {
                        boxShadow: 6,
                      },
                    }}
                    onClick={() => setReportType('patient')}
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      <Person sx={{ fontSize: 50, color: '#1976d2' }} />
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          Relatório do Paciente
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Evolução detalhada de um paciente específico com gráficos e histórico
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={reportType === 'consolidated' ? 8 : 2}
                    sx={{
                      p: 3,
                      cursor: 'pointer',
                      border: reportType === 'consolidated' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                      transition: 'all 0.3s',
                      '&:hover': {
                        boxShadow: 6,
                      },
                    }}
                    onClick={() => setReportType('consolidated')}
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      <Assessment sx={{ fontSize: 50, color: '#1976d2' }} />
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          Relatório Consolidado
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Estatísticas gerais da clínica com indicadores e gráficos
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Filtros */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Filtros
              </Typography>

              <Grid container spacing={2} sx={{ mt: 1 }}>
                {/* Seleção de Paciente (apenas para relatório individual) */}
                {reportType === 'patient' && (
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Paciente *</InputLabel>
                      <Select
                        value={selectedPatient}
                        onChange={(e) => setSelectedPatient(e.target.value)}
                        label="Paciente *"
                        disabled={loadingPatients}
                      >
                        {loadingPatients ? (
                          <MenuItem disabled>
                            <CircularProgress size={20} sx={{ mr: 1 }} />
                            Carregando...
                          </MenuItem>
                        ) : (
                          patients.map((patient) => (
                            <MenuItem key={patient.id} value={patient.id}>
                              {patient.name} - {patient.cpf}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                {/* Período */}
                <Grid item xs={12} md={reportType === 'patient' ? 3 : 4}>
                  <TextField
                    fullWidth
                    label="Data Início *"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={reportType === 'patient' ? 3 : 4}>
                  <TextField
                    fullWidth
                    label="Data Fim *"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                {/* Botões de período rápido */}
                <Grid item xs={12} md={4}>
                  <Box display="flex" gap={1} flexWrap="wrap">
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<DateRange />}
                      onClick={() => setPredefinedPeriod('month')}
                    >
                      Último Mês
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<DateRange />}
                      onClick={() => setPredefinedPeriod('quarter')}
                    >
                      3 Meses
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<DateRange />}
                      onClick={() => setPredefinedPeriod('year')}
                    >
                      1 Ano
                    </Button>
                  </Box>
                </Grid>
              </Grid>

              {/* Campo de Observações */}
              {reportType === 'patient' && (
                <Box sx={{ mt: 3 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Observações sobre o Relatório"
                    placeholder="Digite aqui suas observações, análises ou comentários sobre a evolução do paciente..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    helperText="Estas observações serão incluídas no relatório exportado (PDF/Word)"
                  />
                </Box>
              )}

              <Divider sx={{ my: 3 }} />

              {/* Botão Gerar */}
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  size="large"
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Assessment />}
                  onClick={handleGenerateReport}
                  disabled={loading}
                >
                  {loading ? 'Gerando...' : 'Gerar Relatório'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Informações */}
        <Grid item xs={12}>
          <Alert severity="info">
            <Typography variant="body2">
              <strong>Dica:</strong> Após gerar o relatório, você poderá exportá-lo em formato PDF ou Word.
            </Typography>
          </Alert>
        </Grid>
      </Grid>
    </Box>
  );
}