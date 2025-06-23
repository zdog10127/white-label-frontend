import React, { useState, useCallback, useMemo } from "react";
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

dayjs.locale("pt-br");

const clientSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres"),

  cpf: z
    .string()
    .min(1, "CPF é obrigatório")
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF deve estar no formato 999.999.999-99"
    )
    .refine((cpf) => {
      const digits = cpf.replace(/[^0-9]/g, "");
      return digits.length === 11;
    }, "CPF deve conter 11 dígitos"),

  rg: z
    .string()
    .min(1, "RG é obrigatório")
    .min(5, "RG deve ter pelo menos 5 caracteres"),

  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("E-mail deve ter um formato válido"),

  phone: z.string().optional(),

  cellphone: z
    .string()
    .min(1, "Celular é obrigatório")
    .regex(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "Celular deve estar no formato (99) 99999-9999"
    ),

  birth: z.string().min(1, "Data de nascimento é obrigatória"),

  age: z.string().min(1, "Idade é obrigatória"),

  gender: z.string().min(1, "Gênero é obrigatório"),

  group: z.string().min(1, "Grupo é obrigatório"),

  naturalidade: z.string().min(1, "Naturalidade é obrigatória"),

  nacionalidade: z.string().min(1, "Nacionalidade é obrigatória"),

  nomeSocial: z.string().optional(),

  observacoes: z.string().optional(),

  profissao: z.string().min(1, "Profissão é obrigatória"),

  renda: z
    .string()
    .min(1, "Renda mensal é obrigatória")
    .regex(/^\d+([.,]\d{2})?$/, "Renda deve ser um valor válido (ex: 1500,00)"),

  pagamento: z.string().min(1, "Forma de pagamento é obrigatória"),

  banco: z.string().min(1, "Banco é obrigatório"),

  agencia: z.string().min(1, "Agência é obrigatória"),

  conta: z.string().min(1, "Conta é obrigatória"),

  endereco: z.string().min(1, "Endereço é obrigatório"),

  numero: z.string().min(1, "Número é obrigatório"),

  complemento: z.string().optional(),

  bairro: z.string().min(1, "Bairro é obrigatório"),

  cidade: z.string().min(1, "Cidade é obrigatória"),

  estado: z.string().min(1, "Estado é obrigatório"),

  cep: z
    .string()
    .min(1, "CEP é obrigatório")
    .regex(/^\d{5}-\d{3}$/, "CEP deve estar no formato 99999-999"),

  escolaridade: z.string().min(1, "Escolaridade é obrigatória"),

  ondeNosConheceu: z.string().min(1, "Campo 'Onde nos conheceu' é obrigatório"),

  encaminhadoPor: z.string().min(1, "Campo 'Encaminhado por' é obrigatório"),

  nomeParente: z.string().min(1, "Nome do parente é obrigatório"),

  parentesco: z.string().min(1, "Parentesco é obrigatório"),

  telefoneParente: z
    .string()
    .min(1, "Telefone do parente é obrigatório")
    .regex(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "Telefone deve estar no formato (99) 99999-9999"
    ),

  tags: z.array(z.string()).optional(),

  corIdentificacao: z.string().min(1, "Cor de identificação é obrigatória"),
});

type ClientFormData = z.infer<typeof clientSchema>;

interface FormErrors {
  [key: string]: string;
}

const ClientRegister: React.FC = () => {
  const [activePage, setActivePage] = useState("cadastro");
  const [useSocialName, setUseSocialName] = useState(false);

  const [form, setForm] = useState<
    Omit<ClientFormData, "birth" | "age"> & {
      birth: Dayjs | null;
      age: string;
    }
  >({
    name: "",
    cpf: "",
    rg: "",
    phone: "",
    cellphone: "",
    birth: null,
    age: "",
    email: "",
    gender: "",
    group: "",
    naturalidade: "",
    observacoes: "",
    profissao: "",
    renda: "",
    pagamento: "",
    banco: "",
    agencia: "",
    conta: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    escolaridade: "",
    nomeParente: "",
    parentesco: "",
    telefoneParente: "",
    ondeNosConheceu: "",
    encaminhadoPor: "",
    tags: [],
    corIdentificacao: "#415a44",
    nacionalidade: "",
    nomeSocial: "",
  });

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
      const formData = {
        ...form,
        birth: form.birth ? form.birth.format("DD/MM/YYYY") : "",
      };
      console.log("Dados do formulário:", formData);
      alert("Cadastro enviado com sucesso!");
    } else {
      console.log("Erros de validação:", validationErrors);
      alert("Por favor, corrija os erros no formulário antes de continuar.");
    }
  }, [validateForm, form]);

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

  const handleDateChange = useCallback(
    (newValue: Dayjs | null) => {
      console.log("Data selecionada:", newValue);

      if (newValue && newValue.isValid()) {
        const formattedDate = newValue.format("DD/MM/YYYY");
        console.log("Data formatada:", formattedDate);

        let calculatedAge = "";
        try {
          const age = calculateAge(formattedDate);
          calculatedAge = age !== null ? age.toString() : "";
          console.log("Idade calculada:", calculatedAge);
        } catch (error) {
          console.warn("Erro ao calcular idade:", error);
        }

        setForm((prev) => ({
          ...prev,
          birth: newValue,
          age: calculatedAge,
        }));

        if (errors.birth || errors.age) {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.birth;
            delete newErrors.age;
            return newErrors;
          });
        }
      } else {
        setForm((prev) => ({
          ...prev,
          birth: null,
          age: "",
        }));
      }
    },
    [errors]
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

  const selectOptions = useMemo(
    () => ({
      nacionalidade: [
        { value: "", label: "--Selecione--" },
        { value: "brasileira", label: "Brasileira" },
        { value: "estrangeira", label: "Estrangeira" },
      ],
      grupo: [
        { value: "", label: "--Selecione--" },
        { value: "grupo1", label: "Grupo 1" },
        { value: "grupo2", label: "Grupo 2" },
      ],
      gender: [
        { value: "", label: "--Selecione--" },
        { value: "masculino", label: "Masculino" },
        { value: "feminino", label: "Feminino" },
        { value: "outro", label: "Outro" },
        { value: "prefiro-nao-informar", label: "Prefiro não informar" },
      ],
      pagamento: [
        { value: "", label: "--Selecione--" },
        { value: "pix", label: "PIX" },
        { value: "boleto", label: "Boleto" },
        { value: "cartao", label: "Cartão" },
        { value: "dinheiro", label: "Dinheiro" },
      ],
      escolaridade: [
        { value: "", label: "--Selecione--" },
        { value: "fundamental", label: "Fundamental" },
        { value: "medio", label: "Médio" },
        { value: "superior", label: "Superior" },
        { value: "pos-graduacao", label: "Pós-graduação" },
      ],
      ondeNosConheceu: [
        { value: "", label: "--Selecione--" },
        { value: "internet", label: "Internet" },
        { value: "amigo", label: "Amigo" },
        { value: "familia", label: "Família" },
        { value: "publicidade", label: "Publicidade" },
        { value: "outro", label: "Outro" },
      ],
      encaminhadoPor: [
        { value: "", label: "--Selecione--" },
        { value: "advogado", label: "Advogado" },
        { value: "cliente", label: "Cliente" },
        { value: "medico", label: "Médico" },
        { value: "outro", label: "Outro" },
      ],
    }),
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

  return (
    <Box display="flex">
      <SideBarRegister onSelect={setActivePage} activeSection={activePage} />

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

              <Grid item xs={12} md={4}>
                {renderSelect("group", "Grupo", selectOptions.grupo, true)}
              </Grid>

              <Grid item xs={12} md={4}>
                {renderSelect("gender", "Gênero", selectOptions.gender, true)}
              </Grid>

              <Grid item xs={12} md={4}>
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

              <Grid item xs={12} md={4}>
                {renderSelect(
                  "nacionalidade",
                  "Nacionalidade",
                  selectOptions.nacionalidade,
                  true
                )}
              </Grid>

              <Grid item xs={12} md={3}>
                <InputMask
                  mask="999.999.999-99"
                  value={form.cpf}
                  onChange={(e) => updateFormField("cpf", e.target.value)}
                >
                  {(inputProps: any) => (
                    <TextField
                      {...inputProps}
                      label="CPF *"
                      fullWidth
                      size="small"
                      error={!!errors.cpf}
                      helperText={errors.cpf}
                    />
                  )}
                </InputMask>
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
                <InputMask
                  mask="(99) 99999-9999"
                  value={form.cellphone}
                  onChange={(e) => updateFormField("cellphone", e.target.value)}
                >
                  {(inputProps: any) => (
                    <TextField
                      {...inputProps}
                      label="Celular *"
                      fullWidth
                      size="small"
                      error={!!errors.cellphone}
                      helperText={errors.cellphone}
                    />
                  )}
                </InputMask>
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

              <Grid item xs={12}>
                <TextField
                  size="small"
                  label="Observações"
                  fullWidth
                  multiline
                  rows={2}
                  value={form.observacoes}
                  onChange={(e) =>
                    updateFormField("observacoes", e.target.value)
                  }
                  error={!!errors.observacoes}
                  helperText={errors.observacoes}
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
                  value={form.banco}
                  onChange={(e) => updateFormField("banco", e.target.value)}
                  error={!!errors.banco}
                  helperText={errors.banco}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  size="small"
                  label="Agência *"
                  fullWidth
                  value={form.agencia}
                  onChange={(e) => updateFormField("agencia", e.target.value)}
                  error={!!errors.agencia}
                  helperText={errors.agencia}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  size="small"
                  label="Conta *"
                  fullWidth
                  value={form.conta}
                  onChange={(e) => updateFormField("conta", e.target.value)}
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
                  label="Número *"
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
                  label="Bairro *"
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
                  label="Cidade *"
                  fullWidth
                  value={form.cidade}
                  onChange={(e) => updateFormField("cidade", e.target.value)}
                  error={!!errors.cidade}
                  helperText={errors.cidade}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small" error={!!errors.estado}>
                  <InputLabel>Estado *</InputLabel>
                  <Select
                    value={form.estado}
                    label="Estado *"
                    onChange={(e) => updateFormField("estado", e.target.value)}
                  >
                    <MenuItem value="">--Selecione--</MenuItem>
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
                <InputMask
                  mask="99999-999"
                  value={form.cep}
                  onChange={(e) => updateFormField("cep", e.target.value)}
                >
                  {(inputProps: any) => (
                    <TextField
                      {...inputProps}
                      label="CEP *"
                      fullWidth
                      size="small"
                      error={!!errors.cep}
                      helperText={errors.cep}
                    />
                  )}
                </InputMask>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Typography
              variant="h6"
              gutterBottom
              sx={{ mb: 2, fontWeight: 600 }}
            >
              4. DADOS ADICIONAIS
            </Typography>

            <Grid container spacing={2} sx={{ mb: 5 }}>
              <Grid item xs={12} sm={6} md={4}>
                {renderSelect(
                  "escolaridade",
                  "Escolaridade",
                  selectOptions.escolaridade,
                  true
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                {renderSelect(
                  "ondeNosConheceu",
                  "Onde nos conheceu?",
                  selectOptions.ondeNosConheceu,
                  true
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                {renderSelect(
                  "encaminhadoPor",
                  "Encaminhado por",
                  selectOptions.encaminhadoPor,
                  true
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Nome de um parente *"
                  size="small"
                  fullWidth
                  value={form.nomeParente}
                  onChange={(e) =>
                    updateFormField("nomeParente", e.target.value)
                  }
                  error={!!errors.nomeParente}
                  helperText={errors.nomeParente}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Parentesco *"
                  size="small"
                  fullWidth
                  value={form.parentesco}
                  onChange={(e) =>
                    updateFormField("parentesco", e.target.value)
                  }
                  error={!!errors.parentesco}
                  helperText={errors.parentesco}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <InputMask
                  mask="(99) 99999-9999"
                  value={form.telefoneParente}
                  onChange={(e) =>
                    updateFormField("telefoneParente", e.target.value)
                  }
                >
                  {(inputProps: any) => (
                    <TextField
                      {...inputProps}
                      label="Telefone do parente *"
                      size="small"
                      fullWidth
                      error={!!errors.telefoneParente}
                      helperText={errors.telefoneParente}
                    />
                  )}
                </InputMask>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  label="Tags"
                  placeholder="-- Clique para escolher --"
                  size="small"
                  fullWidth
                  value={form.tags?.join(", ") || ""}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  error={!!errors.tags}
                  helperText={errors.tags}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Box display="flex" alignItems="center" gap={2} height="40px">
                  <Typography variant="body2" component="span">
                    Cor de Identificação *:
                  </Typography>
                  <input
                    type="color"
                    value={form.corIdentificacao}
                    onChange={(e) =>
                      updateFormField("corIdentificacao", e.target.value)
                    }
                    style={{
                      width: 36,
                      height: 36,
                      border: errors.corIdentificacao
                        ? "2px solid #d32f2f"
                        : "1px solid #ccc",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  />
                  {errors.corIdentificacao && (
                    <Typography variant="caption" color="error">
                      {errors.corIdentificacao}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Box mt={3} display="flex" justifyContent="center" gap={2}>
              <Button variant="outlined" color="primary" size="medium">
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={handleSubmit}
              >
                Salvar
              </Button>
            </Box>
          </>
        )}

        {activePage !== "cadastro" && (
          <Typography variant="h6" color="text.secondary">
            Página "{activePage}" ainda em construção...
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ClientRegister;
