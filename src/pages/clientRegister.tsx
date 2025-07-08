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
import {
  GRUPO_OPTIONS,
  GENDER_OPTIONS,
  PAGAMENTO_OPTIONS,
  ESCOLARIDADE_OPTIONS,
  NACIONALIDADE_OPTIONS,
  ONDE_NOS_CONHECEU_OPTIONS,
  ENCAMINHADO_POR_OPTIONS,
} from "../constants/inputSelectOptions";
import { clientSchema } from "../schemas/clientSchemas";
import { useLocation } from "react-router-dom";
import { ClientFormData } from "../types/clientRegister";

dayjs.locale("pt-br");

const initialFormState: ClientFormData = {
  name: "",
  cpf: "",
  rg: "",
  cellphone: "",
  birth: "",
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
};

const ClientRegister: React.FC = () => {
  const location = useLocation();
  const clientToEdit = (location.state as { client?: any })?.client;
  const [activePage, setActivePage] = useState("cadastro");
  const [useSocialName, setUseSocialName] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mapClientToForm = useCallback((client: any) => {
    return {
      name: client.NomeCompleto || "",
      cpf: client.CPF || "",
      rg: client.RG || "",
      cellphone: client.Telefone || "",
      birth: client.DataNascimento || "",
      age: client.Idade || "",
      email: client.Email || "",
      gender: client.Genero || "",
      group: client.Grupo || "",
      naturalidade: client.Naturalidade || "",
      observacoes: client.Observacoes || "",
      profissao: client.Profissao || "",
      renda: client.Renda || "",
      pagamento: client.Pagamento || "",
      banco: client.DadosBancarios?.Banco || "",
      agencia: client.DadosBancarios?.Agencia || "",
      conta: client.DadosBancarios?.Conta || "",
      endereco: client.Endereco || "",
      numero: client.Numero || "",
      complemento: client.Complemento || "",
      bairro: client.Bairro || "",
      cidade: client.Cidade || "",
      estado: client.Estado || "",
      cep: client.CEP || "",
      escolaridade: client.Escolaridade || "",
      nomeParente: client.Parente?.Nome || "",
      parentesco: client.Parente?.Parentesco || "",
      telefoneParente: client.Parente?.Telefone || "",
      ondeNosConheceu: client.OndeNosConheceu || "",
      encaminhadoPor: client.EncaminhadoPor || "",
      tags: client.Tags || [],
      corIdentificacao: client.CorIdentificacao || "#415a44",
      nacionalidade: client.Nacionalidade || "",
      nomeSocial: client.NomeSocial || "",
    };
  }, []);

  const [form, setForm] = useState<ClientFormData>(() => {
    if (clientToEdit) {
      const mappedForm = mapClientToForm(clientToEdit);

      if (clientToEdit.DataNascimento) {
        const birthDate = dayjs(clientToEdit.DataNascimento);
        if (birthDate.isValid()) {
          return {
            ...mappedForm,
            birth: birthDate.format("DD/MM/YYYY"),
            age: calculateAge(birthDate.format("DD/MM/YYYY"))?.toString() || "",
          };
        }
      }

      return mappedForm;
    }

    return initialFormState;
  });

  const updateFormField = useCallback(
    <K extends keyof ClientFormData>(field: K, value: ClientFormData[K]) => {
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
    try {
      clientSchema.parse(form);
      return {};
    } catch (e) {
      if (e instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        e.errors.forEach((err) => {
          if (err.path.length > 0) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        return newErrors;
      }
      return {};
    }
  }, [form]);

  const handleSubmit = useCallback(() => {
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert(
        clientToEdit
          ? "Cliente atualizado com sucesso!"
          : "Cliente cadastrado com sucesso!"
      );
    } else {
      alert("Corrija os erros no formulário antes de continuar.");
    }
  }, [form, clientToEdit, validateForm]);

  const handleTagsChange = useCallback(
    (value: string) => {
      const tagsArray = value
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);
      updateFormField("tags", tagsArray);
    },
    [updateFormField]
  );

  const handleDateChange = useCallback((newDate: Dayjs | null) => {
    if (newDate && newDate.isValid()) {
      const formatted = newDate.format("DD/MM/YYYY");
      let age = "";
      try {
        age = calculateAge(formatted)?.toString() || "";
      } catch {
        age = "";
      }
      setForm((prev) => ({ ...prev, birth: formatted, age }));
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.birth;
        delete copy.age;
        return copy;
      });
    } else {
      setForm((prev) => ({ ...prev, birth: "", age: "" }));
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

  const renderSelect = useCallback(
    (
      field: keyof ClientFormData,
      label: string,
      options: Array<{ value: string; label: string }>,
      required: boolean = false
    ) => (
      <FormControl fullWidth size="small" error={!!errors[field]}>
        <InputLabel>
          {label} {required ? "*" : ""}
        </InputLabel>
        <Select
          value={form[field] || ""}
          label={`${label} ${required ? "*" : ""}`}
          onChange={(e) => updateFormField(field, e.target.value)}
        >
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
        {errors[field] && (
          <Typography variant="caption" color="error" sx={{ ml: 1, mt: 0.5 }}>
            {errors[field]}
          </Typography>
        )}
      </FormControl>
    ),
    [form, updateFormField, errors]
  );

  const renderInputMask = useCallback(
    (
      mask: string,
      field: keyof ClientFormData,
      label: string,
      placeholder?: string
    ) => (
      <InputMask
        mask={mask}
        value={form[field] || ""}
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

  const estadosOptions = useMemo(
    () =>
      estadosBrasil.map(({ sigla, nome }) => (
        <MenuItem key={sigla} value={sigla}>
          {nome}
        </MenuItem>
      )),
    []
  );

  const birthValue = useMemo(() => {
    if (form.birth) {
      const date = dayjs(form.birth, "DD/MM/YYYY");
      return date.isValid() ? date : null;
    }
    return null;
  }, [form.birth]);

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
                    value={birthValue}
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

              <Grid item xs={12}>
                <TextField
                  size="small"
                  label="Tags (separadas por vírgula)"
                  fullWidth
                  value={form.tags?.join(", ") ?? ""}
                  onChange={(e) => handleTagsChange(e.target.value)}
                />
              </Grid>
            </Grid>

            <Box sx={{ textAlign: "right", mt: 4 }}>
              <Button variant="contained" onClick={handleSubmit}>
                {clientToEdit ? "Atualizar Cliente" : "Cadastrar Cliente"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ClientRegister;
