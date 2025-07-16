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
import SideBarRegister from "../../components/side-bar/sideBarRegister";
import { estadosBrasil } from "../../utils/estados";
import { calculateAge } from "../../utils/calculateAge";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
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
} from "../../constants/inputSelectOptions";
import { FormErrors } from "../../types/clientRegisterReturn";
import { clientSchema } from "../../schemas/clientSchemas";
import { NewClientFormData } from "../../types/clientRegister";
import {
  Container,
  ContentBox,
  Title,
  SectionTitle,
  SectionDivider,
  PersonalInfoSwitchWrapper,
  GridWithMarginBottom,
  ErrorText,
} from "./styles";

const NewClientRegister: React.FC = () => {
  const [activePage, setActivePage] = useState("cadastro");
  const [useSocialName, setUseSocialName] = useState(false);

  const initialFormValues: NewClientFormData = {
    name: "",
    nomeSocial: "",
    cpf: "",
    rg: "",
    cellphone: "",
    birth: null,
    age: "",
    email: "",
    gender: "",
    group: "",
    naturalidade: "",
    nacionalidade: "",
    profissao: "",
    renda: "",
    pagamento: "",
    escolaridade: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    ondeNosConheceu: "",
    encaminhadoPor: "",
    observacoes: "",
    tags: [],
    corIdentificacao: "#415a44",
    dadosBancarios: { Banco: "", Agencia: "", Conta: "" },
    parente: { Nome: "", Telefone: "", Parentesco: "" },
    sessao: { Data: "", Horario: "", Status: "", Frequencia: "" },
  };

  const [form, setForm] = useState<NewClientFormData>(initialFormValues);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (form.birth && form.birth.isValid()) {
      try {
        const formattedDate = form.birth.format("DD/MM/YYYY");
        const calculatedAge = calculateAge(formattedDate);
        if (calculatedAge !== null && calculatedAge.toString() !== form.age) {
          setForm((prev) => ({
            ...prev,
            age: calculatedAge.toString(),
          }));
        }
      } catch (error) {
        console.warn("Erro ao calcular idade:", error);
      }
    }
  }, [form.birth]);

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
      console.log("Dados do novo cliente:", form);
      alert("Cliente cadastrado com sucesso!");

      setForm(initialFormValues);
      setUseSocialName(false);
    } else {
      alert("Por favor, corrija os erros no formulário antes de continuar.");
    }
  }, [validateForm, form, initialFormValues]);

  const handleClearForm = useCallback(() => {
    setForm(initialFormValues);
    setUseSocialName(false);
    setErrors({});
  }, [initialFormValues]);

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
        {errors[field] && <ErrorText color="error">{errors[field]}</ErrorText>}
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

  const renderInputMaskParente = useCallback(
    (mask: string, field: string, label: string, placeholder?: string) => (
      <InputMask
        mask={mask}
        value={form.parente[field as keyof typeof form.parente] as string}
        onChange={(e) =>
          updateParenteField(field as keyof typeof form.parente, e.target.value)
        }
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
    [form.parente, updateParenteField, errors]
  );

  return (
    <Container>
      <SideBarRegister
        onSelect={setActivePage}
        activeSection={activePage}
        clientName="Novo Cliente"
        clientImageUrl={undefined}
      />
      <ContentBox>
        {activePage === "cadastro" && (
          <>
            <Title>CADASTRO DE NOVO CLIENTE</Title>

            <SectionTitle>1. INFORMAÇÕES PESSOAIS</SectionTitle>
            <PersonalInfoSwitchWrapper>
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
            </PersonalInfoSwitchWrapper>
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
                  value={form.sessao.Data}
                  onChange={(e) => updateSessaoField("Data", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  size="small"
                  label="Horário da Sessão"
                  fullWidth
                  value={form.sessao.Horario}
                  onChange={(e) => updateSessaoField("Horario", e.target.value)}
                />
              </Grid>
            </Grid>
            <SectionDivider />
            <SectionTitle>2. INFORMAÇÕES FINANCEIRAS</SectionTitle>
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
                  error={!!errors.Banco}
                  helperText={errors.Banco}
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
                  error={!!errors.Agencia}
                  helperText={errors.Agencia}
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
                  error={!!errors.Conta}
                  helperText={errors.Conta}
                />
              </Grid>
            </Grid>
            <SectionDivider />
            <SectionTitle>3. ENDEREÇO</SectionTitle>
            <Grid container spacing={2} sx={{ mb: 10 }}>
              <Grid item xs={12} md={8}>
                <TextField
                  size="small"
                  label="Endereço"
                  fullWidth
                  value={form.endereco}
                  onChange={(e) => updateFormField("endereco", e.target.value)}
                  error={!!errors.endereco}
                  helperText={errors.endereco}
                />
              </Grid>
              <Grid item xs={12} md={4}>
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
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={3}>
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
                    <ErrorText color="error">{errors.estado}</ErrorText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                {renderInputMask("99999-999", "cep", "CEP")}
              </Grid>
            </Grid>
            <SectionDivider />
            <SectionTitle>4. PARENTE / CONTATO DE EMERGÊNCIA</SectionTitle>
            <Grid container spacing={2} sx={{ mb: 10 }}>
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  label="Nome do parente"
                  fullWidth
                  value={form.parente.Nome}
                  onChange={(e) => updateParenteField("Nome", e.target.value)}
                  error={!!errors.Nome}
                  helperText={errors.Nome}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                {renderInputMaskParente(
                  "(99) 99999-9999",
                  "Telefone",
                  "Telefone do parente"
                )}
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  label="Parentesco"
                  fullWidth
                  value={form.parente.Parentesco}
                  onChange={(e) =>
                    updateParenteField("Parentesco", e.target.value)
                  }
                  error={!!errors.Parentesco}
                  helperText={errors.Parentesco}
                />
              </Grid>
            </Grid>
            <SectionDivider />
            <SectionTitle>5. INFORMAÇÕES ADICIONAIS</SectionTitle>
            <Grid container spacing={2} sx={{ mb: 10 }}>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  label="Observações"
                  multiline
                  rows={4}
                  fullWidth
                  value={form.observacoes}
                  onChange={(e) =>
                    updateFormField("observacoes", e.target.value)
                  }
                  error={!!errors.observacoes}
                  helperText={errors.observacoes}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  size="small"
                  label="Tags (separe por vírgulas)"
                  fullWidth
                  value={form.tags.join(", ")}
                  onChange={(e) => handleTagsChange(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  size="small"
                  label="Cor de identificação"
                  type="color"
                  fullWidth
                  value={form.corIdentificacao}
                  onChange={(e) =>
                    updateFormField("corIdentificacao", e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" onClick={handleClearForm}>
                Limpar
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Salvar
              </Button>
            </Box>
          </>
        )}
      </ContentBox>
    </Container>
  );
};

export default NewClientRegister;
