import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import InputMask from "react-input-mask";
import SideBarRegister from "../components/side-bar/sideBarRegister";
import { estadosBrasil } from "../utils/estados";
import { calculateAge } from "../utils/calculateAge";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import { z } from "zod";
import {
  GRUPO_OPTIONS,
  GENDER_OPTIONS,
  PAGAMENTO_OPTIONS,
  ESCOLARIDADE_OPTIONS,
  NACIONALIDADE_OPTIONS,
  ONDE_NOS_CONHECEU_OPTIONS,
  ENCAMINHADO_POR_OPTIONS,
} from "../constants/inputSelectOptions";
import { ClientFormData, FormErrors } from "../types/clientRegister";
import { clientSchema } from "../schemas/clientSchemas";
import { useLocation } from "react-router-dom";

dayjs.locale("pt-br");

const ClientRegister: React.FC = () => {
  const location = useLocation();
  const clientToEdit = (location.state as { clientToEdit?: any })?.clientToEdit;

  const [activePage, setActivePage] = useState("cadastro");
  const [useSocialName, setUseSocialName] = useState(false);

  const getInitialFormValues = (
    client?: any
  ): Omit<ClientFormData, "birth" | "age"> & {
    birth: Dayjs | null;
    age: string;
    sessao: {
      Data: string;
      Horario: string;
      Status?: string;
      Frequencia?: string;
    };
    dadosBancarios: {
      Banco: string;
      Agencia?: string;
      Conta?: string;
    };
    parente: {
      Nome?: string;
      Telefone?: string;
      Parentesco?: string;
    };
  } => ({
    name: client?.name || "",
    cpf: client?.cpf || "",
    rg: client?.rg || "",
    cellphone: client?.cellphone || "",
    birth: client?.birth ? dayjs(client.birth, "DD/MM/YYYY") : null,
    age: client?.age || "",
    email: client?.email || "",
    gender: client?.gender || "",
    group: client?.group || "",
    naturalidade: client?.naturalidade || "",
    observacoes: client?.observacoes || "",
    profissao: client?.profissao || "",
    renda: client?.renda || "",
    pagamento: client?.pagamento || "",
    banco: client?.banco || "",
    agencia: client?.agencia || "",
    conta: client?.conta || "",
    endereco: client?.endereco || "",
    numero: client?.numero || "",
    complemento: client?.complemento || "",
    bairro: client?.bairro || "",
    cidade: client?.cidade || "",
    estado: client?.estado || "",
    cep: client?.cep || "",
    escolaridade: client?.escolaridade || "",
    nomeParente: client?.nomeParente || "",
    parentesco: client?.parentesco || "",
    telefoneParente: client?.telefoneParente || "",
    ondeNosConheceu: client?.ondeNosConheceu || "",
    encaminhadoPor: client?.encaminhadoPor || "",
    tags: client?.tags || [],
    corIdentificacao: client?.corIdentificacao || "#415a44",
    nacionalidade: client?.nacionalidade || "",
    nomeSocial: client?.nomeSocial || "",

    sessao: {
      Data: client?.sessao?.Data || "",
      Horario: client?.sessao?.Horario || "",
      Status: client?.sessao?.Status || "",
      Frequencia: client?.sessao?.Frequencia || "",
    },
    dadosBancarios: {
      Banco: client?.dadosBancarios?.Banco || client?.banco || "",
      Agencia: client?.dadosBancarios?.Agencia || client?.agencia || "",
      Conta: client?.dadosBancarios?.Conta || client?.conta || "",
    },
    parente: {
      Nome: client?.parente?.Nome || client?.nomeParente || "",
      Telefone: client?.parente?.Telefone || client?.telefoneParente || "",
      Parentesco: client?.parente?.Parentesco || client?.parentesco || "",
    },
  });

  const [form, setForm] = useState(() => getInitialFormValues(clientToEdit));

  const [errors, setErrors] = useState<FormErrors>({});

  const updateFormField = useCallback(
    (field: string, value: any) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const updateSessaoField = useCallback(
    (field: keyof typeof form.sessao, value: string) => {
      setForm((prev) => ({
        ...prev,
        sessao: {
          ...prev.sessao,
          [field]: value,
        },
      }));
    },
    []
  );

  const updateDadosBancariosField = useCallback(
    (field: keyof typeof form.dadosBancarios, value: string) => {
      setForm((prev) => ({
        ...prev,
        dadosBancarios: {
          ...prev.dadosBancarios,
          [field]: value,
        },
      }));
    },
    []
  );

  const updateParenteField = useCallback(
    (field: keyof typeof form.parente, value: string) => {
      setForm((prev) => ({
        ...prev,
        parente: {
          ...prev.parente,
          [field]: value,
        },
      }));
    },
    []
  );

  const validateForm = useCallback(() => {
    const formData = {
      ...form,
      birth: form.birth ? form.birth.format("DD/MM/YYYY") : "",
    };
    try {
      clientSchema.parse(formData);
      return {};
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: FormErrors = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        return fieldErrors;
      }
      return {};
    }
  }, [form]);

  const handleSubmit = useCallback(() => {
    const validationErrors = validateForm();
    setErrors(validationErrors);
    const hasError = Object.keys(validationErrors).length > 0;
    if (!hasError) {
      if (clientToEdit) {
        alert("Cliente atualizado com sucesso!");
      } else {
        alert("Cadastro enviado com sucesso!");
      }
    } else {
      alert("Por favor, corrija os erros no formulário antes de continuar.");
    }
  }, [validateForm, clientToEdit]);

  const handleTagsChange = useCallback(
    (value: string) => {
      const tagsArray = value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
      updateFormField("tags", tagsArray);
    },
    [updateFormField]
  );

  const handleDateChange = useCallback((newValue: Dayjs | null) => {
    if (newValue && newValue.isValid()) {
      const formattedDate = newValue.format("DD/MM/YYYY");
      let calculatedAge = "";
      try {
        const age = calculateAge(formattedDate);
        calculatedAge = age !== null ? age.toString() : "";
      } catch (error) {}
      setForm((prev) => ({
        ...prev,
        birth: newValue,
        age: calculatedAge,
      }));
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.birth;
        delete newErrors.age;
        return newErrors;
      });
    } else {
      setForm((prev) => ({
        ...prev,
        birth: null,
        age: "",
      }));
    }
  }, []);

  const selectOptions = useMemo(
    () => ({
      nacionalidade: NACIONALIDADE_OPTIONS,
      grupo: GRUPO_OPTIONS,
      gender: GENDER_OPTIONS,
      pagamento: PAGAMENTO_OPTIONS,
      escolaridade: ESCOLARIDADE_OPTIONS,
      ondeNosConheceu: ONDE_NOS_CONHECEU_OPTIONS,
      encaminhadoPor: ENCAMINHADO_POR_OPTIONS,
    }),
    []
  );

  const memoizedEstados = useMemo(
    () =>
      estadosBrasil.map((estado) => (
        <MenuItem key={estado.sigla} value={estado.sigla}>
          {estado.nome}
        </MenuItem>
      )),
    []
  );

  const renderSelect = useCallback(
    (
      field: string,
      label: string,
      options: Array<{ value: string; label: string }>,
      required: boolean = false
    ) => (
      <FormControl fullWidth size="small" error={!!errors[field]}>
        <InputLabel>
          {label} {required && "*"}
        </InputLabel>
        <Select
          value={form[field as keyof typeof form] as string}
          label={`${label} ${required ? "*" : ""}`}
          onChange={(e) => updateFormField(field, e.target.value)}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {errors[field] && (
          <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
            {errors[field]}
          </Typography>
        )}
      </FormControl>
    ),
    [form, updateFormField, errors]
  );

  const renderInputMask = useCallback(
    (mask: string, field: string, label: string, placeholder?: string) => (
      <InputMask
        mask={mask}
        value={form[field as keyof typeof form] as string}
        onChange={(e) => updateFormField(field, e.target.value)}
      >
        {(inputProps: any) => (
          <TextField
            {...inputProps}
            label={label}
            fullWidth
            size="small"
            placeholder={placeholder}
            error={!!errors[field]}
            helperText={errors[field]}
          />
        )}
      </InputMask>
    ),
    [form, updateFormField, errors]
  );

  return (
    <Box display="flex">
      <SideBarRegister
        onSelect={setActivePage}
        activeSection={activePage}
        clientName={form.name || "Cliente"}
        clientImageUrl={clientToEdit?.fotoUrl}
      />
      <Box flex={1} p={5} ml="220px" maxWidth="700px" mx="auto">
        {activePage === "cadastro" && (
          <>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ mb: 4, fontWeight: 600 }}
            >
              1. INFORMAÇÕES PESSOAIS
            </Typography>
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={useSocialName}
                    onChange={(e) => setUseSocialName(e.target.checked)}
                    size="small"
                  />
                }
                label={
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="body2">Usar nome social</Typography>
                    <Tooltip title="Você pode optar por usar um nome social">
                      <IconButton size="small" color="primary">
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                }
                labelPlacement="end"
              />
            </Box>
            <Grid container spacing={2} sx={{ mb: 10 }}>
              {useSocialName && (
                <Grid item xs={12} md={4}>
                  <TextField
                    size="small"
                    label="Nome Social"
                    fullWidth
                    value={form.nomeSocial}
                    onChange={(e) =>
                      updateFormField("nomeSocial", e.target.value)
                    }
                    error={!!errors.nomeSocial}
                    helperText={errors.nomeSocial}
                    autoFocus
                  />
                </Grid>
              )}
              <Grid item xs={12} md={useSocialName ? 8 : 12}>
                <TextField
                  size="small"
                  label="Nome *"
                  fullWidth
                  value={form.name}
                  onChange={(e) => updateFormField("name", e.target.value)}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  size="small"
                  label="E-mail *"
                  fullWidth
                  type="email"
                  value={form.email}
                  onChange={(e) => updateFormField("email", e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="pt-br"
                >
                  <DatePicker
                    label="Data de nascimento *"
                    value={form.birth}
                    onChange={handleDateChange}
                    format="DD/MM/YYYY"
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        error: !!errors.birth,
                        helperText: errors.birth,
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={3}>
                {renderSelect("group", "Grupo", selectOptions.grupo, true)}
              </Grid>
              <Grid item xs={12} md={3}>
                {renderSelect("gender", "Gênero", selectOptions.gender, true)}
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  size="small"
                  label="Naturalidade *"
                  fullWidth
                  value={form.naturalidade}
                  onChange={(e) =>
                    updateFormField("naturalidade", e.target.value)
                  }
                  error={!!errors.naturalidade}
                  helperText={errors.naturalidade}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  size="small"
                  label="Idade *"
                  fullWidth
                  value={form.age}
                  disabled
                  error={!!errors.age}
                  helperText={errors.age}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                {renderSelect(
                  "nacionalidade",
                  "Nacionalidade",
                  selectOptions.nacionalidade,
                  true
                )}
              </Grid>
              <Grid item xs={12} md={3}>
                {renderInputMask("999.999.999-99", "cpf", "CPF *")}
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  size="small"
                  label="RG *"
                  fullWidth
                  value={form.rg}
                  onChange={(e) => updateFormField("rg", e.target.value)}
                  error={!!errors.rg}
                  helperText={errors.rg}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                {renderInputMask("(99) 99999-9999", "cellphone", "Celular *")}
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  size="small"
                  label="Data da Sessão"
                  fullWidth
                  value={form.sessao?.Data || ""}
                  onChange={(e) => updateSessaoField("Data", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  size="small"
                  label="Horário da Sessão"
                  fullWidth
                  value={form.sessao?.Horario || ""}
                  onChange={(e) => updateSessaoField("Horario", e.target.value)}
                />
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant="h6"
              gutterBottom
              sx={{ mb: 2, fontWeight: 600 }}
            >
              2. INFORMAÇÕES FINANCEIRAS
            </Typography>
            <Grid container spacing={2} sx={{ mb: 10 }}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  size="small"
                  label="Profissão *"
                  fullWidth
                  value={form.profissao}
                  onChange={(e) => updateFormField("profissao", e.target.value)}
                  error={!!errors.profissao}
                  helperText={errors.profissao}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  size="small"
                  label="Renda mensal *"
                  fullWidth
                  placeholder="Ex: 1500,00"
                  value={form.renda}
                  onChange={(e) => updateFormField("renda", e.target.value)}
                  error={!!errors.renda}
                  helperText={errors.renda}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                {renderSelect(
                  "pagamento",
                  "Forma de pagamento",
                  selectOptions.pagamento,
                  true
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  size="small"
                  label="Banco *"
                  fullWidth
                  value={form.dadosBancarios.Banco}
                  onChange={(e) =>
                    updateDadosBancariosField("Banco", e.target.value)
                  }
                  error={!!errors.banco}
                  helperText={errors.banco}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  size="small"
                  label="Agência *"
                  fullWidth
                  value={form.dadosBancarios.Agencia}
                  onChange={(e) =>
                    updateDadosBancariosField("Agencia", e.target.value)
                  }
                  error={!!errors.agencia}
                  helperText={errors.agencia}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  size="small"
                  label="Conta *"
                  fullWidth
                  value={form.dadosBancarios.Conta}
                  onChange={(e) =>
                    updateDadosBancariosField("Conta", e.target.value)
                  }
                  error={!!errors.conta}
                  helperText={errors.conta}
                />
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant="h6"
              gutterBottom
              sx={{ mb: 2, fontWeight: 600 }}
            >
              3. ENDEREÇO
            </Typography>
            <Grid container spacing={2} sx={{ mb: 10 }}>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  size="small"
                  label="Endereço *"
                  fullWidth
                  value={form.endereco}
                  onChange={(e) => updateFormField("endereco", e.target.value)}
                  error={!!errors.endereco}
                  helperText={errors.endereco}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  size="small"
                  label="Número"
                  fullWidth
                  value={form.numero}
                  onChange={(e) => updateFormField("numero", e.target.value)}
                  error={!!errors.numero}
                  helperText={errors.numero}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  size="small"
                  label="Complemento"
                  fullWidth
                  value={form.complemento}
                  onChange={(e) =>
                    updateFormField("complemento", e.target.value)
                  }
                  error={!!errors.complemento}
                  helperText={errors.complemento}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  size="small"
                  label="Bairro"
                  fullWidth
                  value={form.bairro}
                  onChange={(e) => updateFormField("bairro", e.target.value)}
                  error={!!errors.bairro}
                  helperText={errors.bairro}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  size="small"
                  label="Cidade"
                  fullWidth
                  value={form.cidade}
                  onChange={(e) => updateFormField("cidade", e.target.value)}
                  error={!!errors.cidade}
                  helperText={errors.cidade}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small" error={!!errors.estado}>
                  <InputLabel>Estado</InputLabel>
                  <Select
                    value={form.estado}
                    label="Estado"
                    onChange={(e) => updateFormField("estado", e.target.value)}
                  >
                    {memoizedEstados}
                  </Select>
                  {errors.estado && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ mt: 0.5, ml: 1.5 }}
                    >
                      {errors.estado}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                {renderInputMask("99999-999", "cep", "CEP")}
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant="h6"
              gutterBottom
              sx={{ mb: 2, fontWeight: 600 }}
            >
              4. CONTATO DE EMERGÊNCIA
            </Typography>
            <Grid container spacing={2} sx={{ mb: 10 }}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  size="small"
                  label="Nome do parente"
                  fullWidth
                  value={form.parente.Nome || ""}
                  onChange={(e) => updateParenteField("Nome", e.target.value)}
                  error={!!errors.nomeParente}
                  helperText={errors.nomeParente}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  size="small"
                  label="Parentesco"
                  fullWidth
                  value={form.parente.Parentesco || ""}
                  onChange={(e) =>
                    updateParenteField("Parentesco", e.target.value)
                  }
                  error={!!errors.parentesco}
                  helperText={errors.parentesco}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                {renderInputMask(
                  "(99) 99999-9999",
                  "telefoneParente",
                  "Telefone do parente"
                )}
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant="h6"
              gutterBottom
              sx={{ mb: 2, fontWeight: 600 }}
            >
              5. INFORMAÇÕES ADICIONAIS
            </Typography>
            <Grid container spacing={2} sx={{ mb: 10 }}>
              <Grid item xs={12} sm={6} md={6}>
                {renderSelect(
                  "ondeNosConheceu",
                  "Onde nos conheceu",
                  selectOptions.ondeNosConheceu
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                {renderSelect(
                  "encaminhadoPor",
                  "Encaminhado por",
                  selectOptions.encaminhadoPor
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  label="Tags (separadas por vírgula)"
                  fullWidth
                  value={form.tags?.join(", ") ?? ""}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  error={!!errors.tags}
                  helperText={errors.tags}
                />
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="flex-end" mt={4}>
              <Button variant="contained" onClick={handleSubmit}>
                {clientToEdit ? "Atualizar" : "Cadastrar"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ClientRegister;
