import React, { useState, useEffect, FormEvent } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import InputMask from "react-input-mask";
import { useNavigate, useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import { toast } from "react-toastify";
import patientService, { Patient } from "../services/patientService";

dayjs.locale("pt-br");

const ClientEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // ============================================
  // STATE
  // ============================================
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Campos obrigatórios
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [susCard, setSusCard] = useState("");
  const [hospitalCard, setHospitalCard] = useState("");

  // Campos opcionais
  const [rg, setRg] = useState("");
  const [email, setEmail] = useState("");
  const [secondaryPhone, setSecondaryPhone] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");

  // Endereço
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("Araxá");
  const [state, setState] = useState("MG");
  const [zipCode, setZipCode] = useState("");

  // Informações de Câncer
  const [cancerType, setCancerType] = useState("");
  const [cancerStage, setCancerStage] = useState("");
  const [treatmentLocation, setTreatmentLocation] =
    useState("Hospital de Araxá");
  const [currentTreatment, setCurrentTreatment] = useState("");

  // Observações
  const [notes, setNotes] = useState("");

  const [status, setStatus] = useState("Under Review");

  const [hasDiabetes, setHasDiabetes] = useState(false);
  const [hasHypertension, setHasHypertension] = useState(false);
  const [hasCholesterol, setHasCholesterol] = useState(false);
  const [hasTriglycerides, setHasTriglycerides] = useState(false);
  const [hasKidneyProblems, setHasKidneyProblems] = useState(false);
  const [hasAnxiety, setHasAnxiety] = useState(false);
  const [hasHeartAttack, setHasHeartAttack] = useState(false);
  const [medicalHistoryOthers, setMedicalHistoryOthers] = useState("");

  // ============================================
  // CARREGAR DADOS DO PACIENTE
  // ============================================
  useEffect(() => {
    const loadPatient = async () => {
      if (!id) {
        setError("ID do paciente não fornecido");
        setLoadingData(false);
        return;
      }

      try {
        setLoadingData(true);
        console.log("📋 Carregando dados do paciente para edição:", id);

        const patient = await patientService.getById(id);
        console.log("✅ Dados carregados:", patient);

        // Preencher campos obrigatórios
        setName(patient.name || "");
        setCpf(patient.cpf || "");
        setBirthDate(patient.birthDate ? dayjs(patient.birthDate) : null);
        setGender(patient.gender || "");
        setPhone(patient.phone || "");
        setSusCard(patient.susCard || "");
        setHospitalCard(patient.hospitalCard || "");

        // Preencher campos opcionais
        setRg(patient.rg || "");
        setEmail(patient.email || "");
        setSecondaryPhone(patient.secondaryPhone || "");
        setMaritalStatus(patient.maritalStatus || "");

        // Preencher endereço
        if (patient.address) {
          setStreet(patient.address.street || "");
          setNumber(patient.address.number || "");
          setComplement(patient.address.complement || "");
          setNeighborhood(patient.address.neighborhood || "");
          setCity(patient.address.city || "Araxá");
          setState(patient.address.state || "MG");
          setZipCode(patient.address.zipCode || "");
        }

        // Preencher informações de câncer
        if (patient.cancer) {
          setCancerType(patient.cancer.type || "");
          setCancerStage(patient.cancer.stage || "");
          setTreatmentLocation(
            patient.cancer.treatmentLocation || "Hospital de Araxá",
          );
          setCurrentTreatment(patient.cancer.currentTreatment || "");
        }

        // Observações
        setNotes(patient.notes || "");
        setStatus(patient.status || "Under Review");

        // Histórico médico
        if (patient.medicalHistory) {
          setHasDiabetes(patient.medicalHistory.diabetes || false);
          setHasHypertension(patient.medicalHistory.hypertension || false);
          setHasCholesterol(patient.medicalHistory.cholesterol || false);
          setHasTriglycerides(patient.medicalHistory.triglycerides || false);
          setHasKidneyProblems(patient.medicalHistory.kidneyProblems || false);
          setHasAnxiety(patient.medicalHistory.anxiety || false);
          setHasHeartAttack(patient.medicalHistory.heartAttack || false);
          setMedicalHistoryOthers(patient.medicalHistory.others || "");
        }
      } catch (error: any) {
        console.error("❌ Erro ao carregar paciente:", error);
        setError(error.message);
        toast.error("Erro ao carregar dados do paciente");
      } finally {
        setLoadingData(false);
      }
    };

    loadPatient();
  }, [id]);

  // ============================================
  // VALIDAÇÃO
  // ============================================
  const validateForm = (): boolean => {
    if (!name.trim()) {
      setError("Nome é obrigatório");
      return false;
    }

    if (!cpf.trim() || cpf.replace(/\D/g, "").length !== 11) {
      setError("CPF inválido");
      return false;
    }

    if (!birthDate) {
      setError("Data de nascimento é obrigatória");
      return false;
    }

    if (!gender) {
      setError("Gênero é obrigatório");
      return false;
    }

    if (!phone.trim()) {
      setError("Telefone é obrigatório");
      return false;
    }

    if (!susCard.trim()) {
      setError("Cartão SUS é obrigatório");
      return false;
    }

    if (!hospitalCard.trim()) {
      setError("Cartão do Hospital é obrigatório");
      return false;
    }

    setError(null);
    return true;
  };

  // ============================================
  // SUBMIT - ATUALIZAR PACIENTE
  // ============================================
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !id) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Montar objeto com dados atualizados
      const updatedData: Partial<Patient> = {
        name: name.trim(),
        cpf: cpf.replace(/\D/g, ""),
        rg: rg.trim() || undefined,
        birthDate: birthDate!.format("YYYY-MM-DD"),
        gender,
        maritalStatus: maritalStatus || undefined,
        phone: phone.replace(/\D/g, ""),
        secondaryPhone: secondaryPhone
          ? secondaryPhone.replace(/\D/g, "")
          : undefined,
        email: email.trim() || undefined,
        susCard: susCard.trim(),
        hospitalCard: hospitalCard.trim(),

        // Endereço
        address: street.trim()
          ? {
              street: street.trim(),
              number: number.trim() || undefined,
              complement: complement.trim() || undefined,
              neighborhood: neighborhood.trim(),
              city: city.trim() || "Araxá",
              state: state || "MG",
              zipCode: zipCode.replace(/\D/g, "") || undefined,
            }
          : undefined,

        // Câncer
        cancer: cancerType.trim()
          ? {
              type: cancerType.trim(),
              stage: cancerStage.trim() || undefined,
              treatmentLocation:
                treatmentLocation.trim() || "Hospital de Araxá",
              currentTreatment: currentTreatment.trim() || undefined,
            }
          : undefined,

        // Observações
        notes: notes.trim() || undefined,

        status: status,

        // Histórico Médico (sempre enviar, mesmo que vazio)
        medicalHistory: {
          diabetes: hasDiabetes,
          hypertension: hasHypertension,
          cholesterol: hasCholesterol,
          triglycerides: hasTriglycerides,
          kidneyProblems: hasKidneyProblems,
          anxiety: hasAnxiety,
          heartAttack: hasHeartAttack,
          others: medicalHistoryOthers.trim() || undefined,
        },
      };

      console.log("✏️ Atualizando paciente:", updatedData);

      // Chamar API
      await patientService.update(id, updatedData);

      console.log("✅ Paciente atualizado com sucesso");
      toast.success("Paciente atualizado com sucesso!");

      // Redirecionar para detalhes
      setTimeout(() => {
        navigate(`/clientes/${id}`);
      }, 1000);
    } catch (error: any) {
      console.error("❌ Erro ao atualizar paciente:", error);
      setError(error.message || "Erro ao atualizar paciente");
      toast.error("Erro ao atualizar paciente");
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // RENDER - LOADING INICIAL
  // ============================================
  if (loadingData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // ============================================
  // RENDER - ERRO
  // ============================================
  if (error && !name) {
    return (
      <Box p={3}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/clientes")}
        >
          Voltar para Lista
        </Button>
      </Box>
    );
  }

  // ============================================
  // RENDER - FORMULÁRIO
  // ============================================
  return (
    <Box p={3}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 900, mx: "auto" }}>
        {/* Cabeçalho */}
        <Box display="flex" alignItems="center" gap={2} mb={4}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(`/clientes/${id}`)}
            disabled={loading}
          >
            Voltar
          </Button>
          <Typography variant="h4" fontWeight="bold">
            Editar Cliente
          </Typography>
        </Box>

        {/* Erro Global */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {/* INFORMAÇÕES PESSOAIS */}
          <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
            1. Informações Pessoais
          </Typography>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={8}>
              <TextField
                label="Nome Completo *"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="pt-br"
              >
                <DatePicker
                  label="Data de Nascimento *"
                  value={birthDate}
                  onChange={(newValue) => setBirthDate(newValue)}
                  format="DD/MM/YYYY"
                  disabled={loading}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={4}>
              <InputMask
                mask="999.999.999-99"
                value={patientService.formatCPF(cpf)}
                onChange={(e) => setCpf(e.target.value)}
                disabled={loading}
              >
                {(inputProps: any) => (
                  <TextField {...inputProps} label="CPF *" fullWidth />
                )}
              </InputMask>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="RG"
                fullWidth
                value={rg}
                onChange={(e) => setRg(e.target.value)}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth disabled={loading}>
                <InputLabel>Gênero *</InputLabel>
                <Select
                  value={gender}
                  label="Gênero *"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <MenuItem value="Masculino">Masculino</MenuItem>
                  <MenuItem value="Feminino">Feminino</MenuItem>
                  <MenuItem value="Outro">Outro</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth disabled={loading}>
                <InputLabel>Estado Civil</InputLabel>
                <Select
                  value={maritalStatus}
                  label="Estado Civil"
                  onChange={(e) => setMaritalStatus(e.target.value)}
                >
                  <MenuItem value="">--Selecione--</MenuItem>
                  <MenuItem value="Solteiro(a)">Solteiro(a)</MenuItem>
                  <MenuItem value="Casado(a)">Casado(a)</MenuItem>
                  <MenuItem value="Divorciado(a)">Divorciado(a)</MenuItem>
                  <MenuItem value="Viúvo(a)">Viúvo(a)</MenuItem>
                  <MenuItem value="União Estável">União Estável</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <InputMask
                mask="(99) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
              >
                {(inputProps: any) => (
                  <TextField
                    {...inputProps}
                    label="Telefone Principal *"
                    fullWidth
                  />
                )}
              </InputMask>
            </Grid>

            <Grid item xs={12} md={4}>
              <InputMask
                mask="(99) 99999-9999"
                value={secondaryPhone}
                onChange={(e) => setSecondaryPhone(e.target.value)}
                disabled={loading}
              >
                {(inputProps: any) => (
                  <TextField
                    {...inputProps}
                    label="Telefone Secundário"
                    fullWidth
                  />
                )}
              </InputMask>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="E-mail"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* ENDEREÇO */}
          <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
            2. Endereço
          </Typography>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={8}>
              <TextField
                label="Rua/Avenida"
                fullWidth
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Número"
                fullWidth
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Complemento"
                fullWidth
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Bairro"
                fullWidth
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Cidade"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="Estado"
                fullWidth
                value={state}
                onChange={(e) => setState(e.target.value)}
                disabled={loading}
                inputProps={{ maxLength: 2 }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <InputMask
                mask="99999-999"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                disabled={loading}
              >
                {(inputProps: any) => (
                  <TextField {...inputProps} label="CEP" fullWidth />
                )}
              </InputMask>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* INFORMAÇÕES DE CÂNCER */}
          <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
            3. Informações sobre Câncer
          </Typography>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Tipo de Câncer"
                fullWidth
                value={cancerType}
                onChange={(e) => setCancerType(e.target.value)}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Estágio"
                fullWidth
                value={cancerStage}
                onChange={(e) => setCancerStage(e.target.value)}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Local de Tratamento"
                fullWidth
                value={treatmentLocation}
                onChange={(e) => setTreatmentLocation(e.target.value)}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Tratamento Atual"
                fullWidth
                value={currentTreatment}
                onChange={(e) => setCurrentTreatment(e.target.value)}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Cartão SUS *"
                fullWidth
                value={susCard}
                onChange={(e) => setSusCard(e.target.value)}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Cartão do Hospital *"
                fullWidth
                value={hospitalCard}
                onChange={(e) => setHospitalCard(e.target.value)}
                disabled={loading}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* OBSERVAÇÕES */}
          <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
            4. Observações
          </Typography>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12}>
              <TextField
                label="Observações Gerais"
                fullWidth
                multiline
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={loading}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* HISTÓRICO MÉDICO */}
          <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
            5. Histórico Médico
          </Typography>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Status *</InputLabel>
                <Select
                  value={status}
                  label="Status *"
                  onChange={(e) => setStatus(e.target.value)}
                  disabled={loading}
                >
                  <MenuItem value="Under Review">Em Análise</MenuItem>
                  <MenuItem value="Active">Ativo</MenuItem>
                  <MenuItem value="Inactive">Inativo</MenuItem>
                  <MenuItem value="Completed">Concluído</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Condições Médicas:
              </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Diabetes</InputLabel>
                <Select
                  value={hasDiabetes ? "Sim" : "Não"}
                  label="Diabetes"
                  onChange={(e) => setHasDiabetes(e.target.value === "Sim")}
                  disabled={loading}
                >
                  <MenuItem value="Não">Não</MenuItem>
                  <MenuItem value="Sim">Sim</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Hipertensão</InputLabel>
                <Select
                  value={hasHypertension ? "Sim" : "Não"}
                  label="Hipertensão"
                  onChange={(e) => setHasHypertension(e.target.value === "Sim")}
                  disabled={loading}
                >
                  <MenuItem value="Não">Não</MenuItem>
                  <MenuItem value="Sim">Sim</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Colesterol</InputLabel>
                <Select
                  value={hasCholesterol ? "Sim" : "Não"}
                  label="Colesterol"
                  onChange={(e) => setHasCholesterol(e.target.value === "Sim")}
                  disabled={loading}
                >
                  <MenuItem value="Não">Não</MenuItem>
                  <MenuItem value="Sim">Sim</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Triglicerídeos</InputLabel>
                <Select
                  value={hasTriglycerides ? "Sim" : "Não"}
                  label="Triglicerídeos"
                  onChange={(e) =>
                    setHasTriglycerides(e.target.value === "Sim")
                  }
                  disabled={loading}
                >
                  <MenuItem value="Não">Não</MenuItem>
                  <MenuItem value="Sim">Sim</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Problemas Renais</InputLabel>
                <Select
                  value={hasKidneyProblems ? "Sim" : "Não"}
                  label="Problemas Renais"
                  onChange={(e) =>
                    setHasKidneyProblems(e.target.value === "Sim")
                  }
                  disabled={loading}
                >
                  <MenuItem value="Não">Não</MenuItem>
                  <MenuItem value="Sim">Sim</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Ansiedade</InputLabel>
                <Select
                  value={hasAnxiety ? "Sim" : "Não"}
                  label="Ansiedade"
                  onChange={(e) => setHasAnxiety(e.target.value === "Sim")}
                  disabled={loading}
                >
                  <MenuItem value="Não">Não</MenuItem>
                  <MenuItem value="Sim">Sim</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Infarto</InputLabel>
                <Select
                  value={hasHeartAttack ? "Sim" : "Não"}
                  label="Infarto"
                  onChange={(e) => setHasHeartAttack(e.target.value === "Sim")}
                  disabled={loading}
                >
                  <MenuItem value="Não">Não</MenuItem>
                  <MenuItem value="Sim">Sim</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Outras Condições Médicas"
                fullWidth
                multiline
                rows={2}
                value={medicalHistoryOthers}
                onChange={(e) => setMedicalHistoryOthers(e.target.value)}
                disabled={loading}
                placeholder="Descreva outras condições médicas relevantes..."
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Botões */}
          <Box display="flex" justifyContent="center" gap={2} mt={4}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate(`/clientes/${id}`)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              startIcon={<SaveIcon />}
            >
              {loading ? <CircularProgress size={24} /> : "Salvar Alterações"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default ClientEdit;
