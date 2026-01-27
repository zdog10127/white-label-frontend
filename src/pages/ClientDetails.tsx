import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Divider,
  Chip,
  Card,
  CardContent,
  Stack,
  Avatar,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  PersonOutline as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  LocalHospital as HospitalIcon,
  MedicalServices as MedicalIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import patientService, { Patient } from "../services/patientService";

const ClientDetails: React.FC = () => {
  // ============================================
  // STATE
  // ============================================
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // ============================================
  // CARREGAR PACIENTE
  // ============================================
  const loadPatient = async () => {
    if (!id) {
      setError("ID do paciente não fornecido");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('📋 Carregando detalhes do paciente:', id);
      const data = await patientService.getById(id);

      console.log('✅ Paciente carregado:', data);
      setPatient(data);
    } catch (error: any) {
      console.error('❌ Erro ao carregar paciente:', error);
      setError(error.message);
      toast.error('Erro ao carregar detalhes do paciente');
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // CARREGAR AO MONTAR
  // ============================================
  useEffect(() => {
    loadPatient();
  }, [id]);

  // ============================================
  // FORMATAR DATA
  // ============================================
  const formatDate = (dateString?: string): string => {
    if (!dateString) return '-';

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  };

  // ============================================
  // CALCULAR IDADE
  // ============================================
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

  // ============================================
  // RENDER - LOADING
  // ============================================
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  // ============================================
  // RENDER - ERRO
  // ============================================
  if (error || !patient) {
    return (
      <Box p={3}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || 'Paciente não encontrado'}
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/clientes')}
        >
          Voltar para Lista
        </Button>
      </Box>
    );
  }

  // ============================================
  // RENDER - DETALHES
  // ============================================
  return (
    <Box p={3}>
      {/* Cabeçalho */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/clientes')}
          >
            Voltar
          </Button>
          <Typography variant="h4" fontWeight="bold">
            Detalhes do Cliente
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/clientes/${id}/editar`)}
        >
          Editar
        </Button>
      </Box>

      {/* Card Principal - Informações Básicas */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box display="flex" alignItems="center" gap={3} mb={3}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
            <PersonIcon sx={{ fontSize: 50 }} />
          </Avatar>
          <Box flex={1}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {patient.name}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Chip
                label={patient.status || 'Em Análise'}
                color={patient.active ? 'success' : 'default'}
              />
              <Chip label={`${calculateAge(patient.birthDate)} anos`} variant="outlined" />
              <Chip label={patient.gender} variant="outlined" />
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          {/* CPF */}
          <Grid item xs={12} md={6}>
            <Typography variant="caption" color="text.secondary">
              CPF
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {patientService.formatCPF(patient.cpf)}
            </Typography>
          </Grid>

          {/* RG */}
          {patient.rg && (
            <Grid item xs={12} md={6}>
              <Typography variant="caption" color="text.secondary">
                RG
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {patient.rg}
              </Typography>
            </Grid>
          )}

          {/* Data de Nascimento */}
          <Grid item xs={12} md={6}>
            <Typography variant="caption" color="text.secondary">
              Data de Nascimento
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {formatDate(patient.birthDate)}
            </Typography>
          </Grid>

          {/* Estado Civil */}
          {patient.maritalStatus && (
            <Grid item xs={12} md={6}>
              <Typography variant="caption" color="text.secondary">
                Estado Civil
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {patient.maritalStatus}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>

      {/* Contato */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <PhoneIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">
              Contato
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="caption" color="text.secondary">
                Telefone Principal
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {patient.phone}
              </Typography>
            </Grid>

            {patient.secondaryPhone && (
              <Grid item xs={12} md={4}>
                <Typography variant="caption" color="text.secondary">
                  Telefone Secundário
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {patient.secondaryPhone}
                </Typography>
              </Grid>
            )}

            {patient.email && (
              <Grid item xs={12} md={4}>
                <Typography variant="caption" color="text.secondary">
                  E-mail
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {patient.email}
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* Endereço */}
      {patient.address && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <LocationIcon color="primary" />
              <Typography variant="h6" fontWeight="bold">
                Endereço
              </Typography>
            </Box>

            <Typography variant="body1">
              {patient.address.street}
              {patient.address.number && `, ${patient.address.number}`}
              {patient.address.complement && ` - ${patient.address.complement}`}
            </Typography>
            <Typography variant="body1">
              {patient.address.neighborhood}
              {patient.address.city && ` - ${patient.address.city}`}
              {patient.address.state && `/${patient.address.state}`}
            </Typography>
            {patient.address.zipCode && (
              <Typography variant="body1">
                CEP: {patient.address.zipCode}
              </Typography>
            )}
          </CardContent>
        </Card>
      )}

      {/* Informações de Câncer */}
      {patient.cancer && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <HospitalIcon color="primary" />
              <Typography variant="h6" fontWeight="bold">
                Informações sobre Câncer
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="caption" color="text.secondary">
                  Tipo de Câncer
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {patient.cancer.type}
                </Typography>
              </Grid>

              {patient.cancer.stage && (
                <Grid item xs={12} md={6}>
                  <Typography variant="caption" color="text.secondary">
                    Estágio
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {patient.cancer.stage}
                  </Typography>
                </Grid>
              )}

              {patient.cancer.detectionDate && (
                <Grid item xs={12} md={6}>
                  <Typography variant="caption" color="text.secondary">
                    Data de Detecção
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {formatDate(patient.cancer.detectionDate)}
                  </Typography>
                </Grid>
              )}

              {patient.cancer.treatmentLocation && (
                <Grid item xs={12} md={6}>
                  <Typography variant="caption" color="text.secondary">
                    Local de Tratamento
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {patient.cancer.treatmentLocation}
                  </Typography>
                </Grid>
              )}

              {patient.cancer.currentTreatment && (
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary">
                    Tratamento Atual
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {patient.cancer.currentTreatment}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Histórico Médico */}
      {patient.medicalHistory && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <MedicalIcon color="primary" />
              <Typography variant="h6" fontWeight="bold">
                Histórico Médico
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {patient.medicalHistory.diabetes && <Chip label="Diabetes" color="warning" size="small" />}
              {patient.medicalHistory.hypertension && <Chip label="Hipertensão" color="warning" size="small" />}
              {patient.medicalHistory.cholesterol && <Chip label="Colesterol" color="warning" size="small" />}
              {patient.medicalHistory.triglycerides && <Chip label="Triglicerídeos" color="warning" size="small" />}
              {patient.medicalHistory.kidneyProblems && <Chip label="Problemas Renais" color="warning" size="small" />}
              {patient.medicalHistory.anxiety && <Chip label="Ansiedade" color="warning" size="small" />}
              {patient.medicalHistory.heartAttack && <Chip label="Infarto" color="error" size="small" />}
            </Stack>

            {patient.medicalHistory.others && (
              <Box mt={2}>
                <Typography variant="caption" color="text.secondary">
                  Outros
                </Typography>
                <Typography variant="body1">
                  {patient.medicalHistory.others}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {/* Datas Importantes */}
      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <CalendarIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">
              Datas Importantes
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="caption" color="text.secondary">
                Data de Cadastro
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {formatDate(patient.registrationDate)}
              </Typography>
            </Grid>

            {patient.lastReviewDate && (
              <Grid item xs={12} md={4}>
                <Typography variant="caption" color="text.secondary">
                  Última Revisão
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {formatDate(patient.lastReviewDate)}
                </Typography>
              </Grid>
            )}

            {patient.nextReviewDate && (
              <Grid item xs={12} md={4}>
                <Typography variant="caption" color="text.secondary">
                  Próxima Revisão
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {formatDate(patient.nextReviewDate)}
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* Observações */}
      {patient.notes && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Observações
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
              {patient.notes}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ClientDetails;