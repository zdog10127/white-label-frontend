import React, { useState, FormEvent, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Alert,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import patientService, { Patient } from "../services/patientService";
import UnsavedChangesDialog from "../components/UnsavedChangesDialog";
import "dayjs/locale/pt-br";
import { useUnsavedChangesWarning } from "../hooks/higherOrderComponent";

dayjs.locale("pt-br");

const ClientRegister: React.FC = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [rg, setRg] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
  const [gender, setGender] = useState<string>("Masculino");
  const [maritalStatus, setMaritalStatus] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [secondaryPhone, setSecondaryPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [complement, setComplement] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [cancerType, setCancerType] = useState<string>("");
  const [cancerStage, setCancerStage] = useState<string>("");
  const [treatmentLocation, setTreatmentLocation] = useState<string>("");
  const [currentTreatment, setCurrentTreatment] = useState<string>("");
  const [detectionDate, setDetectionDate] = useState<Dayjs | null>(null);
  const [treatmentStartDate, setTreatmentStartDate] = useState<Dayjs | null>(null);
  const [diabetes, setDiabetes] = useState<boolean>(false);
  const [hypertension, setHypertension] = useState<boolean>(false);
  const [cholesterol, setCholesterol] = useState<boolean>(false);
  const [triglycerides, setTriglycerides] = useState<boolean>(false);
  const [kidneyProblems, setKidneyProblems] = useState<boolean>(false);
  const [anxiety, setAnxiety] = useState<boolean>(false);
  const [heartAttack, setHeartAttack] = useState<boolean>(false);
  const [otherConditions, setOtherConditions] = useState<string>("");
  const [susCard, setSusCard] = useState<string>("");
  const [hospitalCard, setHospitalCard] = useState<string>("");
  const [treatmentYear, setTreatmentYear] = useState<string>("");
  const [fiveYears, setFiveYears] = useState<boolean>(false);
  const [deathDate, setDeathDate] = useState<Dayjs | null>(null);
  const [authorizeImage, setAuthorizeImage] = useState<boolean>(false);
  const [docIdentity, setDocIdentity] = useState<boolean>(false);
  const [docCPF, setDocCPF] = useState<boolean>(false);
  const [docMarriage, setDocMarriage] = useState<boolean>(false);
  const [docMedicalReport, setDocMedicalReport] = useState<boolean>(false);
  const [docRecentExams, setDocRecentExams] = useState<boolean>(false);
  const [docAddressProof, setDocAddressProof] = useState<boolean>(false);
  const [docIncomeProof, setDocIncomeProof] = useState<boolean>(false);
  const [docHospitalCard, setDocHospitalCard] = useState<boolean>(false);
  const [docSUSCard, setDocSUSCard] = useState<boolean>(false);
  const [docBiopsyResult, setDocBiopsyResult] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [active, setActive] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  const {
    showPrompt,
    handleConfirmNavigation,
    handleCancelNavigation,
    navigateWithPrompt,
    message,
  } = useUnsavedChangesWarning(hasChanges);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hasAnyData = 
      name.trim() !== "" ||
      cpf.trim() !== "" ||
      rg.trim() !== "" ||
      phone.trim() !== "" ||
      email.trim() !== "";
    
    setHasChanges(hasAnyData);
  }, [name, cpf, rg, phone, email]);

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

    if (!neighborhood.trim()) {
      setError("Bairro é obrigatório");
      return false;
    }

    if (!cancerType.trim()) {
      setError("Tipo de câncer é obrigatório");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const patientData: Patient = {
        name: name.trim(),
        cpf: cpf.replace(/\D/g, ""),
        rg: rg.trim() || undefined,
        birthDate: birthDate!.format("YYYY-MM-DD"),
        gender,
        maritalStatus: maritalStatus || undefined,
        phone: phone.replace(/\D/g, ""),
        secondaryPhone: secondaryPhone ? secondaryPhone.replace(/\D/g, "") : "",
        email: email.trim() || undefined,

        address: {
          street: street.trim(),
          number: number.trim() || undefined,
          complement: complement.trim() || undefined,
          neighborhood: neighborhood.trim(),
          city: city.trim() || "Araxá",
          state: state.trim() || "MG",
          zipCode: zipCode.replace(/\D/g, "") || undefined,
        },

        cancer: {
          type: cancerType.trim(),
          stage: cancerStage.trim() || undefined,
          treatmentLocation: treatmentLocation.trim() || "Hospital de Araxá",
          currentTreatment: currentTreatment.trim() || undefined,
          detectionDate: detectionDate ? detectionDate.format("YYYY-MM-DD") : undefined,
          treatmentStartDate: treatmentStartDate ? treatmentStartDate.format("YYYY-MM-DD") : undefined,
          hasBiopsyResult: docBiopsyResult,
        },

        medicalHistory: {
          diabetes,
          hypertension,
          cholesterol,
          triglycerides,
          kidneyProblems,
          anxiety,
          heartAttack,
          others: otherConditions.trim() || "",
        },

        susCard: susCard.trim(),
        hospitalCard: hospitalCard.trim(),

        treatmentYear: treatmentYear ? parseInt(treatmentYear) : undefined,
        fiveYears,
        deathDate: deathDate ? deathDate.format("YYYY-MM-DD") : undefined,
        authorizeImage,

        documents: {
          identity: docIdentity,
          cpfDoc: docCPF,
          marriageCertificate: docMarriage,
          medicalReport: docMedicalReport,
          recentExams: docRecentExams,
          addressProof: docAddressProof,
          incomeProof: docIncomeProof,
          hospitalCardDoc: docHospitalCard,
          susCardDoc: docSUSCard,
          biopsyResultDoc: docBiopsyResult,
        },

        notes: notes.trim() || "",
        status,
        active,
      };

      const result = await patientService.create(patientData);

      toast.success("Paciente cadastrado com sucesso!");

      setHasChanges(false);

      setTimeout(() => {
        navigate(`/clientes/${result.id}`);
      }, 1000);

    } catch (error: any) {
      console.error("❌ Erro ao cadastrar:", error);
      setError(error.message || "Erro ao cadastrar paciente");
      toast.error(error.message || "Erro ao cadastrar paciente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box p={3}>
        <Box mb={3}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Cadastro de Paciente
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sistema AMPARA - Preencha todos os campos obrigatórios (*)
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" fontWeight="bold">
                    1. Dados Pessoais
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        required
                        label="Nome Completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <InputMask
                        mask="999.999.999-99"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        disabled={loading}
                      >
                        {(inputProps: any) => (
                          <TextField
                            {...inputProps}
                            fullWidth
                            required
                            label="CPF"
                          />
                        )}
                      </InputMask>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        label="RG"
                        value={rg}
                        onChange={(e) => setRg(e.target.value)}
                        disabled={loading}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <DatePicker
                        label="Data de Nascimento *"
                        value={birthDate}
                        onChange={(date) => setBirthDate(date)}
                        disabled={loading}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <FormControl fullWidth required>
                        <InputLabel>Gênero</InputLabel>
                        <Select
                          value={gender}
                          label="Gênero"
                          onChange={(e) => setGender(e.target.value)}
                          disabled={loading}
                        >
                          <MenuItem value="Masculino">Masculino</MenuItem>
                          <MenuItem value="Feminino">Feminino</MenuItem>
                          <MenuItem value="Outro">Outro</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <FormControl fullWidth>
                        <InputLabel>Estado Civil</InputLabel>
                        <Select
                          value={maritalStatus}
                          label="Estado Civil"
                          onChange={(e) => setMaritalStatus(e.target.value)}
                          disabled={loading}
                        >
                          <MenuItem value="">Não informado</MenuItem>
                          <MenuItem value="Solteiro(a)">Solteiro(a)</MenuItem>
                          <MenuItem value="Casado(a)">Casado(a)</MenuItem>
                          <MenuItem value="Divorciado(a)">Divorciado(a)</MenuItem>
                          <MenuItem value="Viúvo(a)">Viúvo(a)</MenuItem>
                          <MenuItem value="União Estável">União Estável</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <InputMask
                        mask="(99) 99999-9999"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={loading}
                      >
                        {(inputProps: any) => (
                          <TextField
                            {...inputProps}
                            fullWidth
                            required
                            label="Telefone Principal"
                          />
                        )}
                      </InputMask>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <InputMask
                        mask="(99) 99999-9999"
                        value={secondaryPhone}
                        onChange={(e) => setSecondaryPhone(e.target.value)}
                        disabled={loading}
                      >
                        {(inputProps: any) => (
                          <TextField
                            {...inputProps}
                            fullWidth
                            label="Telefone Secundário"
                          />
                        )}
                      </InputMask>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        type="email"
                        label="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12}>
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" fontWeight="bold">
                    2. Endereço
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Rua/Avenida"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        disabled={loading}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        fullWidth
                        label="Número"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        disabled={loading}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Complemento"
                        value={complement}
                        onChange={(e) => setComplement(e.target.value)}
                        disabled={loading}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        required
                        label="Bairro"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        disabled={loading}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Cidade"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        disabled={loading}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        fullWidth
                        label="Estado"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        disabled={loading}
                        inputProps={{ maxLength: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <InputMask
                        mask="99999-999"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        disabled={loading}
                      >
                        {(inputProps: any) => (
                          <TextField {...inputProps} fullWidth label="CEP" />
                        )}
                      </InputMask>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12}>
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" fontWeight="bold">
                    3. Informações de Câncer
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        required
                        label="Tipo de Câncer"
                        value={cancerType}
                        onChange={(e) => setCancerType(e.target.value)}
                        disabled={loading}
                        placeholder="Ex: Mama, Próstata, Pulmão..."
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        label="Estágio"
                        value={cancerStage}
                        onChange={(e) => setCancerStage(e.target.value)}
                        disabled={loading}
                        placeholder="Ex: I, II, III, IV"
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <DatePicker
                        label="Data de Detecção"
                        value={detectionDate}
                        onChange={(date) => setDetectionDate(date)}
                        disabled={loading}
                        slotProps={{
                          textField: { fullWidth: true },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Local de Tratamento"
                        value={treatmentLocation}
                        onChange={(e) => setTreatmentLocation(e.target.value)}
                        disabled={loading}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <DatePicker
                        label="Início do Tratamento"
                        value={treatmentStartDate}
                        onChange={(date) => setTreatmentStartDate(date)}
                        disabled={loading}
                        slotProps={{
                          textField: { fullWidth: true },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        label="Ano do Tratamento"
                        type="number"
                        value={treatmentYear}
                        onChange={(e) => setTreatmentYear(e.target.value)}
                        disabled={loading}
                        placeholder="Ex: 2024"
                        inputProps={{ min: 1900, max: 2100 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Tratamento Atual"
                        value={currentTreatment}
                        onChange={(e) => setCurrentTreatment(e.target.value)}
                        disabled={loading}
                        placeholder="Ex: Quimioterapia, Radioterapia..."
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12}>
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" fontWeight="bold">
                    4. Cartões e Informações AMPARA
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Cartão SUS"
                        value={susCard}
                        onChange={(e) => setSusCard(e.target.value)}
                        disabled={loading}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Cartão do Hospital"
                        value={hospitalCard}
                        onChange={(e) => setHospitalCard(e.target.value)}
                        disabled={loading}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Informações Adicionais
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={fiveYears}
                            onChange={(e) => setFiveYears(e.target.checked)}
                            disabled={loading}
                          />
                        }
                        label="Já completou 5 anos de tratamento"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={authorizeImage}
                            onChange={(e) => setAuthorizeImage(e.target.checked)}
                            disabled={loading}
                          />
                        }
                        label="Autoriza uso de imagem"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <DatePicker
                        label="Data de Óbito (se aplicável)"
                        value={deathDate}
                        onChange={(date) => setDeathDate(date)}
                        disabled={loading}
                        slotProps={{
                          textField: { fullWidth: true },
                        }}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" fontWeight="bold">
                    5. Histórico Médico
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormLabel component="legend">
                    Marque as condições que se aplicam:
                  </FormLabel>
                  <FormGroup>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6} md={3}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={diabetes}
                              onChange={(e) => setDiabetes(e.target.checked)}
                              disabled={loading}
                            />
                          }
                          label="Diabetes"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={hypertension}
                              onChange={(e) => setHypertension(e.target.checked)}
                              disabled={loading}
                            />
                          }
                          label="Hipertensão"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={cholesterol}
                              onChange={(e) => setCholesterol(e.target.checked)}
                              disabled={loading}
                            />
                          }
                          label="Colesterol Alto"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={triglycerides}
                              onChange={(e) => setTriglycerides(e.target.checked)}
                              disabled={loading}
                            />
                          }
                          label="Triglicerídeos Alto"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={kidneyProblems}
                              onChange={(e) => setKidneyProblems(e.target.checked)}
                              disabled={loading}
                            />
                          }
                          label="Problemas Renais"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={anxiety}
                              onChange={(e) => setAnxiety(e.target.checked)}
                              disabled={loading}
                            />
                          }
                          label="Ansiedade"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={heartAttack}
                              onChange={(e) => setHeartAttack(e.target.checked)}
                              disabled={loading}
                            />
                          }
                          label="Infarto"
                        />
                      </Grid>
                    </Grid>
                    <Box mt={2}>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        label="Outras Condições"
                        value={otherConditions}
                        onChange={(e) => setOtherConditions(e.target.value)}
                        disabled={loading}
                        placeholder="Descreva outras condições médicas..."
                      />
                    </Box>
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" fontWeight="bold">
                    6. Documentos Entregues
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormLabel component="legend">
                    Marque os documentos que foram entregues:
                  </FormLabel>
                  <FormGroup>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={docIdentity}
                              onChange={(e) => setDocIdentity(e.target.checked)}
                              disabled={loading}
                            />
                          }
                          label="RG (Identidade)"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={docCPF}
                              onChange={(e) => setDocCPF(e.target.checked)}
                              disabled={loading}
                            />
                          }
                          label="CPF"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={docMarriage}
                              onChange={(e) => setDocMarriage(e.target.checked)}
                              disabled={loading}
                            />
                          }
                          label="Certidão de Casamento"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={docMedicalReport}
                              onChange={(e) => setDocMedicalReport(e.target.checked)}
                              disabled={loading}
                            />
                          }
                          label="Laudo Médico"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={docRecentExams}
                              onChange={(e) => setDocRecentExams(e.target.checked)}
                              disabled={loading}
                            />
                          }
                          label="Exames Recentes"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={docAddressProof}
                              onChange={(e) => setDocAddressProof(e.target.checked)}
                              disabled={loading}
                            />
                          }
                          label="Comprovante de Residência"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={docIncomeProof}
                              onChange={(e) => setDocIncomeProof(e.target.checked)}
                              disabled={loading}
                            />
                          }
                          label="Comprovante de Renda"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={docHospitalCard}
                              onChange={(e) => setDocHospitalCard(e.target.checked)}
                              disabled={loading}
                            />
                          }
                          label="Cartão do Hospital"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={docSUSCard}
                              onChange={(e) => setDocSUSCard(e.target.checked)}
                              disabled={loading}
                            />
                          }
                          label="Cartão SUS"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={docBiopsyResult}
                              onChange={(e) => setDocBiopsyResult(e.target.checked)}
                              disabled={loading}
                            />
                          }
                          label="Resultado de Biópsia"
                        />
                      </Grid>
                    </Grid>
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" fontWeight="bold">
                    7. Observações e Status
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Observações"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        disabled={loading}
                        placeholder="Informações adicionais sobre o paciente..."
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={status}
                          label="Status"
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
                    <Grid item xs={12} md={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={active}
                            onChange={(e) => setActive(e.target.checked)}
                            disabled={loading}
                          />
                        }
                        label="Paciente Ativo"
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Alert severity="error" onClose={() => setError(null)}>
                  {error}
                </Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <Box display="flex" gap={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<CancelIcon />}
                  onClick={() => navigateWithPrompt("/clientes")}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                  disabled={loading}
                >
                  {loading ? "Salvando..." : "Salvar Paciente"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <UnsavedChangesDialog
        open={showPrompt}
        onConfirm={handleConfirmNavigation}
        onCancel={handleCancelNavigation}
        message={message}
      />
    </LocalizationProvider>
  );
};

export default ClientRegister;