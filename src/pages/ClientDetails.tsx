import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Avatar,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Home as HomeIcon,
  LocalHospital as LocalHospitalIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  CalendarToday as CalendarIcon,
  Image as ImageIcon,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import patientService, { Patient } from "../services/patientService";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { PatientDetailsSkeleton } from "../components/LoadingSkeletons";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

const ClientDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      navigate("/clientes");
      return;
    }
    loadPatient();
  }, [id]);

  const loadPatient = async () => {
    try {
      setLoading(true);
      const data = await patientService.getById(id!);
      setPatient(data);
    } catch (error: any) {
      console.error("Erro ao carregar paciente:", error);
      setError(error.message || "Erro ao carregar dados do paciente");
      toast.error(error.message || "Erro ao carregar dados do paciente");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await patientService.delete(id!);
      toast.success("Paciente excluído com sucesso!");
      navigate("/clientes");
    } catch (error: any) {
      console.error("Erro ao excluir:", error);
      toast.error(error.message || "Erro ao excluir paciente");
    } finally {
      setDeleting(false);
      setDeleteModalOpen(false);
    }
  };

  const calculateAge = (birthDate: string): number => {
    return dayjs().diff(dayjs(birthDate), "year");
  };

  const formatDate = (date?: string): string => {
    return date ? dayjs(date).format("DD/MM/YYYY") : "Não informado";
  };

  const getStatusColor = (
    status?: string,
  ): "success" | "warning" | "error" | "default" => {
    switch (status) {
      case "Active":
        return "success";
      case "Under Review":
        return "warning";
      case "Inactive":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status?: string): string => {
    switch (status) {
      case "Active":
        return "Ativo";
      case "Under Review":
        return "Em Análise";
      case "Inactive":
        return "Inativo";
      case "Completed":
        return "Concluído";
      default:
        return status || "Desconhecido";
    }
  };

  const countDeliveredDocuments = (): { delivered: number; total: number } => {
    if (!patient?.documents) return { delivered: 0, total: 10 };

    const docs = patient.documents;
    const total = 10;
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

    return { delivered, total };
  };

  if (loading) {
    return <PatientDetailsSkeleton />;
  }

  if (error || !patient) {
    return (
      <Box p={3}>
        <Alert severity="error" onClose={() => navigate("/clientes")}>
          {error || "Paciente não encontrado"}
        </Alert>
      </Box>
    );
  }

  const docStats = countDeliveredDocuments();

  return (
    <Box p={3}>
      <Box
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton onClick={() => navigate("/clientes")} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography variant="h4" fontWeight="bold">
              {patient.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              CPF: {patientService.formatCPF(patient.cpf)} •{" "}
              {calculateAge(patient.birthDate)} anos
            </Typography>
          </Box>
        </Box>
        <Box display="flex" gap={1}>
          <Tooltip title="Editar">
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => navigate(`/clientes/${id}/editar`)}
            >
              Editar
            </Button>
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setDeleteModalOpen(true)}
            >
              Excluir
            </Button>
          </Tooltip>
        </Box>
      </Box>
      <Box mb={3} display="flex" gap={1} flexWrap="wrap">
        <Chip
          label={getStatusLabel(patient.status)}
          color={getStatusColor(patient.status)}
          variant="filled"
        />
        <Chip
          label={patient.active ? "Ativo" : "Inativo"}
          color={patient.active ? "success" : "default"}
          variant="outlined"
        />
        {patient.fiveYears && (
          <Chip
            label="Completou 5 anos"
            color="info"
            icon={<CheckCircleIcon />}
          />
        )}
        {patient.authorizeImage && (
          <Chip
            label="Autoriza imagem"
            color="secondary"
            icon={<ImageIcon />}
          />
        )}
        <Chip
          label={`Documentos: ${docStats.delivered}/${docStats.total}`}
          color="info"
          icon={<DescriptionIcon />}
        />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <PersonIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Dados Pessoais
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="Nome Completo"
                    secondary={patient.name}
                    primaryTypographyProps={{
                      variant: "body2",
                      color: "text.secondary",
                    }}
                    secondaryTypographyProps={{
                      variant: "body1",
                      fontWeight: "medium",
                    }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="CPF"
                    secondary={patientService.formatCPF(patient.cpf)}
                    primaryTypographyProps={{
                      variant: "body2",
                      color: "text.secondary",
                    }}
                    secondaryTypographyProps={{
                      variant: "body1",
                      fontWeight: "medium",
                    }}
                  />
                </ListItem>
                {patient.rg && (
                  <ListItem>
                    <ListItemText
                      primary="RG"
                      secondary={patient.rg}
                      primaryTypographyProps={{
                        variant: "body2",
                        color: "text.secondary",
                      }}
                      secondaryTypographyProps={{
                        variant: "body1",
                        fontWeight: "medium",
                      }}
                    />
                  </ListItem>
                )}
                <ListItem>
                  <ListItemText
                    primary="Data de Nascimento"
                    secondary={`${formatDate(patient.birthDate)} (${calculateAge(patient.birthDate)} anos)`}
                    primaryTypographyProps={{
                      variant: "body2",
                      color: "text.secondary",
                    }}
                    secondaryTypographyProps={{
                      variant: "body1",
                      fontWeight: "medium",
                    }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Gênero"
                    secondary={patient.gender}
                    primaryTypographyProps={{
                      variant: "body2",
                      color: "text.secondary",
                    }}
                    secondaryTypographyProps={{
                      variant: "body1",
                      fontWeight: "medium",
                    }}
                  />
                </ListItem>
                {patient.maritalStatus && (
                  <ListItem>
                    <ListItemText
                      primary="Estado Civil"
                      secondary={patient.maritalStatus}
                      primaryTypographyProps={{
                        variant: "body2",
                        color: "text.secondary",
                      }}
                      secondaryTypographyProps={{
                        variant: "body1",
                        fontWeight: "medium",
                      }}
                    />
                  </ListItem>
                )}
                <ListItem>
                  <ListItemText
                    primary="Data de Cadastro"
                    secondary={formatDate(patient.registrationDate)}
                    primaryTypographyProps={{
                      variant: "body2",
                      color: "text.secondary",
                    }}
                    secondaryTypographyProps={{
                      variant: "body1",
                      fontWeight: "medium",
                    }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <PhoneIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Contato
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Telefone Principal"
                    secondary={patient.phone}
                    primaryTypographyProps={{
                      variant: "body2",
                      color: "text.secondary",
                    }}
                    secondaryTypographyProps={{
                      variant: "body1",
                      fontWeight: "medium",
                    }}
                  />
                </ListItem>
                {patient.secondaryPhone && (
                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Telefone Secundário"
                      secondary={patient.secondaryPhone}
                      primaryTypographyProps={{
                        variant: "body2",
                        color: "text.secondary",
                      }}
                      secondaryTypographyProps={{
                        variant: "body1",
                        fontWeight: "medium",
                      }}
                    />
                  </ListItem>
                )}
                {patient.email && (
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="E-mail"
                      secondary={patient.email}
                      primaryTypographyProps={{
                        variant: "body2",
                        color: "text.secondary",
                      }}
                      secondaryTypographyProps={{
                        variant: "body1",
                        fontWeight: "medium",
                      }}
                    />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <HomeIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Endereço
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {patient.address ? (
                <Typography variant="body1">
                  {patient.address.street && `${patient.address.street}, `}
                  {patient.address.number && `${patient.address.number}`}
                  {patient.address.complement &&
                    ` - ${patient.address.complement}`}
                  <br />
                  {patient.address.neighborhood}
                  <br />
                  {patient.address.city || "Araxá"} -{" "}
                  {patient.address.state || "MG"}
                  {patient.address.zipCode &&
                    ` • CEP: ${patient.address.zipCode}`}
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Endereço não informado
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <LocalHospitalIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Informações de Câncer
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {patient.cancer ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">
                      Tipo de Câncer
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {patient.cancer.type}
                    </Typography>
                  </Grid>
                  {patient.cancer.stage && (
                    <Grid item xs={12} sm={6} md={3}>
                      <Typography variant="body2" color="text.secondary">
                        Estágio
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {patient.cancer.stage}
                      </Typography>
                    </Grid>
                  )}
                  {patient.cancer.detectionDate && (
                    <Grid item xs={12} sm={6} md={3}>
                      <Typography variant="body2" color="text.secondary">
                        Data de Detecção
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {formatDate(patient.cancer.detectionDate)}
                      </Typography>
                    </Grid>
                  )}
                  {patient.treatmentYear && (
                    <Grid item xs={12} sm={6} md={3}>
                      <Typography variant="body2" color="text.secondary">
                        Ano do Tratamento
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {patient.treatmentYear}
                      </Typography>
                    </Grid>
                  )}
                  {patient.cancer.treatmentLocation && (
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography variant="body2" color="text.secondary">
                        Local de Tratamento
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {patient.cancer.treatmentLocation}
                      </Typography>
                    </Grid>
                  )}
                  {patient.cancer.treatmentStartDate && (
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography variant="body2" color="text.secondary">
                        Início do Tratamento
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {formatDate(patient.cancer.treatmentStartDate)}
                      </Typography>
                    </Grid>
                  )}
                  {patient.cancer.currentTreatment && (
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography variant="body2" color="text.secondary">
                        Tratamento Atual
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {patient.cancer.currentTreatment}
                      </Typography>
                    </Grid>
                  )}
                  {patient.deathDate && (
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography variant="body2" color="text.secondary">
                        Data de Óbito
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight="medium"
                        color="error"
                      >
                        {formatDate(patient.deathDate)}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Informações não disponíveis
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
                  Cartões
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="Cartão SUS"
                    secondary={patient.susCard || "Não informado"}
                    primaryTypographyProps={{
                      variant: "body2",
                      color: "text.secondary",
                    }}
                    secondaryTypographyProps={{
                      variant: "body1",
                      fontWeight: "medium",
                    }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Cartão do Hospital"
                    secondary={patient.hospitalCard || "Não informado"}
                    primaryTypographyProps={{
                      variant: "body2",
                      color: "text.secondary",
                    }}
                    secondaryTypographyProps={{
                      variant: "body1",
                      fontWeight: "medium",
                    }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <LocalHospitalIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Histórico Médico
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {patient.medicalHistory ? (
                <Box>
                  <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                    {patient.medicalHistory.diabetes && (
                      <Chip label="Diabetes" size="small" color="warning" />
                    )}
                    {patient.medicalHistory.hypertension && (
                      <Chip label="Hipertensão" size="small" color="warning" />
                    )}
                    {patient.medicalHistory.cholesterol && (
                      <Chip
                        label="Colesterol Alto"
                        size="small"
                        color="warning"
                      />
                    )}
                    {patient.medicalHistory.triglycerides && (
                      <Chip
                        label="Triglicerídeos Alto"
                        size="small"
                        color="warning"
                      />
                    )}
                    {patient.medicalHistory.kidneyProblems && (
                      <Chip
                        label="Problemas Renais"
                        size="small"
                        color="warning"
                      />
                    )}
                    {patient.medicalHistory.anxiety && (
                      <Chip label="Ansiedade" size="small" color="warning" />
                    )}
                    {patient.medicalHistory.heartAttack && (
                      <Chip label="Infarto" size="small" color="error" />
                    )}
                  </Box>
                  {patient.medicalHistory.others && (
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Outras Condições:
                      </Typography>
                      <Typography variant="body1">
                        {patient.medicalHistory.others}
                      </Typography>
                    </Box>
                  )}
                  {!patient.medicalHistory.diabetes &&
                    !patient.medicalHistory.hypertension &&
                    !patient.medicalHistory.cholesterol &&
                    !patient.medicalHistory.triglycerides &&
                    !patient.medicalHistory.kidneyProblems &&
                    !patient.medicalHistory.anxiety &&
                    !patient.medicalHistory.heartAttack &&
                    !patient.medicalHistory.others && (
                      <Typography variant="body2" color="text.secondary">
                        Nenhuma condição registrada
                      </Typography>
                    )}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Histórico não disponível
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <DescriptionIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Documentos Entregues ({docStats.delivered}/{docStats.total})
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {patient.documents ? (
                <Grid container spacing={1}>
                  <Grid item xs={6} sm={4} md={3}>
                    <Chip
                      label="RG"
                      icon={
                        patient.documents.identity ? (
                          <CheckCircleIcon />
                        ) : (
                          <CancelIcon />
                        )
                      }
                      color={patient.documents.identity ? "success" : "default"}
                      variant={
                        patient.documents.identity ? "filled" : "outlined"
                      }
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <Chip
                      label="CPF"
                      icon={
                        patient.documents.cpfDoc ? (
                          <CheckCircleIcon />
                        ) : (
                          <CancelIcon />
                        )
                      }
                      color={patient.documents.cpfDoc ? "success" : "default"}
                      variant={patient.documents.cpfDoc ? "filled" : "outlined"}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <Chip
                      label="Certidão Casamento"
                      icon={
                        patient.documents.marriageCertificate ? (
                          <CheckCircleIcon />
                        ) : (
                          <CancelIcon />
                        )
                      }
                      color={
                        patient.documents.marriageCertificate
                          ? "success"
                          : "default"
                      }
                      variant={
                        patient.documents.marriageCertificate
                          ? "filled"
                          : "outlined"
                      }
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <Chip
                      label="Laudo Médico"
                      icon={
                        patient.documents.medicalReport ? (
                          <CheckCircleIcon />
                        ) : (
                          <CancelIcon />
                        )
                      }
                      color={
                        patient.documents.medicalReport ? "success" : "default"
                      }
                      variant={
                        patient.documents.medicalReport ? "filled" : "outlined"
                      }
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <Chip
                      label="Exames Recentes"
                      icon={
                        patient.documents.recentExams ? (
                          <CheckCircleIcon />
                        ) : (
                          <CancelIcon />
                        )
                      }
                      color={
                        patient.documents.recentExams ? "success" : "default"
                      }
                      variant={
                        patient.documents.recentExams ? "filled" : "outlined"
                      }
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <Chip
                      label="Comprov. Residência"
                      icon={
                        patient.documents.addressProof ? (
                          <CheckCircleIcon />
                        ) : (
                          <CancelIcon />
                        )
                      }
                      color={
                        patient.documents.addressProof ? "success" : "default"
                      }
                      variant={
                        patient.documents.addressProof ? "filled" : "outlined"
                      }
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <Chip
                      label="Comprov. Renda"
                      icon={
                        patient.documents.incomeProof ? (
                          <CheckCircleIcon />
                        ) : (
                          <CancelIcon />
                        )
                      }
                      color={
                        patient.documents.incomeProof ? "success" : "default"
                      }
                      variant={
                        patient.documents.incomeProof ? "filled" : "outlined"
                      }
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <Chip
                      label="Cartão Hospital"
                      icon={
                        patient.documents.hospitalCardDoc ? (
                          <CheckCircleIcon />
                        ) : (
                          <CancelIcon />
                        )
                      }
                      color={
                        patient.documents.hospitalCardDoc
                          ? "success"
                          : "default"
                      }
                      variant={
                        patient.documents.hospitalCardDoc
                          ? "filled"
                          : "outlined"
                      }
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <Chip
                      label="Cartão SUS"
                      icon={
                        patient.documents.susCardDoc ? (
                          <CheckCircleIcon />
                        ) : (
                          <CancelIcon />
                        )
                      }
                      color={
                        patient.documents.susCardDoc ? "success" : "default"
                      }
                      variant={
                        patient.documents.susCardDoc ? "filled" : "outlined"
                      }
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <Chip
                      label="Biópsia"
                      icon={
                        patient.documents.biopsyResultDoc ? (
                          <CheckCircleIcon />
                        ) : (
                          <CancelIcon />
                        )
                      }
                      color={
                        patient.documents.biopsyResultDoc
                          ? "success"
                          : "default"
                      }
                      variant={
                        patient.documents.biopsyResultDoc
                          ? "filled"
                          : "outlined"
                      }
                      size="small"
                    />
                  </Grid>
                </Grid>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Nenhum documento registrado
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        {patient.notes && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <DescriptionIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Observações
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
                  {patient.notes}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
      <ConfirmDeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        patientName={patient.name}
        loading={deleting}
      />
    </Box>
  );
};

export default ClientDetails;