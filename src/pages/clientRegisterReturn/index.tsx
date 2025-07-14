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
} from "../../constants/inputSelectOptions";
import {
  ClientFormData,
  FormErrors,
  ClientDataUnified,
  mapClientToFormData,
  hasNomeSocial,
} from "../../types/clientRegisterReturn";
import { clientSchema } from "../../schemas/clientSchemas";
import { useLocation } from "react-router-dom";

import {
  boxContainer,
  boxFormContainer,
  typographySectionTitle,
  typographySubTitle,
  formControlLabelWrapper,
  formHelperText,
  gridMarginBottom10,
  dividerMarginY2,
  boxButtonContainer,
} from "./styles";

dayjs.locale("pt-br");

const ClientRegister: React.FC = () => {
  const location = useLocation();
  const clientToEdit = (location.state as { clientToEdit?: ClientDataUnified })
    ?.clientToEdit;

  const [activePage, setActivePage] = useState("cadastro");
  const [useSocialName, setUseSocialName] = useState(false);

  const getInitialFormValues = (
    client?: ClientDataUnified
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
  } => {
    if (!client) {
      return {
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
        banco: "",
        agencia: "",
        conta: "",
        parente: { Nome: "", Telefone: "", Parentesco: "" },
        nomeParente: "",
        telefoneParente: "",
        parentesco: "",
        sessao: { Data: "", Horario: "", Status: "", Frequencia: "" },
      };
    }

    const mappedData = mapClientToFormData(client);

    let birthValue: Dayjs | null = null;
    if (mappedData.birth) {
      if (typeof mappedData.birth === "string") {
        if (mappedData.birth.includes("-")) {
          birthValue = dayjs(mappedData.birth, "YYYY-MM-DD");
        } else if (mappedData.birth.includes("/")) {
          birthValue = dayjs(mappedData.birth, "DD/MM/YYYY");
        }

        if (birthValue && !birthValue.isValid()) {
          birthValue = null;
        }
      } else if (dayjs.isDayjs(mappedData.birth)) {
        birthValue = mappedData.birth;
      }
    }

    return {
      name: mappedData.name || "",
      nomeSocial: mappedData.nomeSocial || "",
      cpf: mappedData.cpf || "",
      rg: mappedData.rg || "",
      cellphone: mappedData.cellphone || "",
      birth: birthValue,
      age: mappedData.age || "",
      email: mappedData.email || "",
      gender: mappedData.gender || "",
      group: mappedData.group || "",
      naturalidade: mappedData.naturalidade || "",
      nacionalidade: mappedData.nacionalidade || "",

      profissao: mappedData.profissao || "",
      renda: mappedData.renda || "",
      pagamento: mappedData.pagamento || "",
      escolaridade: mappedData.escolaridade || "",

      endereco: mappedData.endereco || "",
      numero: mappedData.numero || "",
      complemento: mappedData.complemento || "",
      bairro: mappedData.bairro || "",
      cidade: mappedData.cidade || "",
      estado: mappedData.estado || "",
      cep: mappedData.cep || "",

      ondeNosConheceu: mappedData.ondeNosConheceu || "",
      encaminhadoPor: mappedData.encaminhadoPor || "",
      observacoes: mappedData.observacoes || "",
      tags: mappedData.tags || [],
      corIdentificacao: mappedData.corIdentificacao || "#415a44",

      dadosBancarios: {
        Banco: mappedData.dadosBancarios?.Banco || "",
        Agencia: mappedData.dadosBancarios?.Agencia || "",
        Conta: mappedData.dadosBancarios?.Conta || "",
      },
      banco: mappedData.banco || "",
      agencia: mappedData.agencia || "",
      conta: mappedData.conta || "",

      parente: {
        Nome: mappedData.parente?.Nome || "",
        Telefone: mappedData.parente?.Telefone || "",
        Parentesco: mappedData.parente?.Parentesco || "",
      },
      nomeParente: mappedData.nomeParente || "",
      telefoneParente: mappedData.telefoneParente || "",
      parentesco: mappedData.parentesco || "",

      sessao: {
        Data: mappedData.sessao?.Data || "",
        Horario: mappedData.sessao?.Horario || "",
        Status: mappedData.sessao?.Status || "",
        Frequencia: mappedData.sessao?.Frequencia || "",
      },
    } as any;
  };

  const [form, setForm] = useState(() => getInitialFormValues(clientToEdit));
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (clientToEdit) {
      if (hasNomeSocial(clientToEdit)) {
        setUseSocialName(true);
      }

      const newFormData = getInitialFormValues(clientToEdit);
      setForm(newFormData);
    }
  }, [clientToEdit]);

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
        ...(field === "Banco" && { banco: value }),
        ...(field === "Agencia" && { agencia: value }),
        ...(field === "Conta" && { conta: value }),
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
        ...(field === "Nome" && { nomeParente: value }),
        ...(field === "Telefone" && { telefoneParente: value }),
        ...(field === "Parentesco" && { parentesco: value }),
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
      setForm((prev: any) => ({
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
      setForm((prev: any) => ({
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
          <Typography variant="caption" color="error" sx={formHelperText}>
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
    <Box sx={boxContainer}>
      <SideBarRegister
        onSelect={setActivePage}
        activeSection={activePage}
        clientName={form.name || "Cliente"}
        clientImageUrl={undefined}
      />
      <Box sx={boxFormContainer}>
        {activePage === "cadastro" && (
          <>
            <Typography variant="h6" gutterBottom sx={typographySectionTitle}>
              1. INFORMAÇÕES PESSOAIS
            </Typography>

            <Box sx={formControlLabelWrapper}>
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

            <Grid container spacing={2} sx={gridMarginBottom10}>
              <Grid item xs={12} sm={useSocialName ? 6 : 12}>
                <TextField
                  label="Nome completo"
                  fullWidth
                  size="small"
                  value={form.name}
                  onChange={(e) => updateFormField("name", e.target.value)}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>

              {useSocialName && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nome social"
                    fullWidth
                    size="small"
                    value={form.nomeSocial}
                    onChange={(e) =>
                      updateFormField("nomeSocial", e.target.value)
                    }
                    error={!!errors.nomeSocial}
                    helperText={errors.nomeSocial}
                  />
                </Grid>
              )}

              <Grid item xs={12} sm={6}>
                {renderInputMask("999.999.999-99", "cpf", "CPF")}
              </Grid>

              <Grid item xs={12} sm={6}>
                {renderInputMask("99.999.999-9", "rg", "RG")}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Telefone celular"
                  fullWidth
                  size="small"
                  value={form.cellphone}
                  onChange={(e) => updateFormField("cellphone", e.target.value)}
                  error={!!errors.cellphone}
                  helperText={errors.cellphone}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="pt-br"
                >
                  <DatePicker
                    label="Data de nascimento"
                    value={form.birth}
                    onChange={handleDateChange}
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

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Idade"
                  fullWidth
                  size="small"
                  value={form.age}
                  InputProps={{ readOnly: true }}
                  error={!!errors.age}
                  helperText={errors.age}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="E-mail"
                  fullWidth
                  size="small"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateFormField("email", e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                {renderSelect("gender", "Gênero", selectOptions.gender)}
              </Grid>

              <Grid item xs={12} sm={6}>
                {renderSelect("group", "Grupo", selectOptions.grupo)}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Naturalidade"
                  fullWidth
                  size="small"
                  value={form.naturalidade}
                  onChange={(e) =>
                    updateFormField("naturalidade", e.target.value)
                  }
                  error={!!errors.naturalidade}
                  helperText={errors.naturalidade}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                {renderSelect(
                  "nacionalidade",
                  "Nacionalidade",
                  selectOptions.nacionalidade
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Profissão"
                  fullWidth
                  size="small"
                  value={form.profissao}
                  onChange={(e) => updateFormField("profissao", e.target.value)}
                  error={!!errors.profissao}
                  helperText={errors.profissao}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Renda"
                  fullWidth
                  size="small"
                  value={form.renda}
                  onChange={(e) => updateFormField("renda", e.target.value)}
                  error={!!errors.renda}
                  helperText={errors.renda}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                {renderSelect(
                  "pagamento",
                  "Forma de pagamento",
                  selectOptions.pagamento
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                {renderSelect(
                  "escolaridade",
                  "Escolaridade",
                  selectOptions.escolaridade
                )}
              </Grid>
            </Grid>

            <Divider sx={dividerMarginY2} />

            <Typography variant="h6" gutterBottom sx={typographySubTitle}>
              2. INFORMAÇÕES FINANCEIRAS
            </Typography>

            <Grid container spacing={2} sx={gridMarginBottom10}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Banco"
                  fullWidth
                  size="small"
                  value={form.dadosBancarios.Banco}
                  onChange={(e) =>
                    updateDadosBancariosField("Banco", e.target.value)
                  }
                  error={!!errors.banco}
                  helperText={errors.banco}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Agência"
                  fullWidth
                  size="small"
                  value={form.dadosBancarios.Agencia}
                  onChange={(e) =>
                    updateDadosBancariosField("Agencia", e.target.value)
                  }
                  error={!!errors.agencia}
                  helperText={errors.agencia}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Conta"
                  fullWidth
                  size="small"
                  value={form.dadosBancarios.Conta}
                  onChange={(e) =>
                    updateDadosBancariosField("Conta", e.target.value)
                  }
                  error={!!errors.conta}
                  helperText={errors.conta}
                />
              </Grid>
            </Grid>

            <Divider sx={dividerMarginY2} />

            <Typography variant="h6" gutterBottom sx={typographySubTitle}>
              3. ENDEREÇO
            </Typography>

            <Grid container spacing={2} sx={gridMarginBottom10}>
              <Grid item xs={12} sm={8}>
                <TextField
                  label="Endereço"
                  fullWidth
                  size="small"
                  value={form.endereco}
                  onChange={(e) => updateFormField("endereco", e.target.value)}
                  error={!!errors.endereco}
                  helperText={errors.endereco}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Número"
                  fullWidth
                  size="small"
                  value={form.numero}
                  onChange={(e) => updateFormField("numero", e.target.value)}
                  error={!!errors.numero}
                  helperText={errors.numero}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Complemento"
                  fullWidth
                  size="small"
                  value={form.complemento}
                  onChange={(e) =>
                    updateFormField("complemento", e.target.value)
                  }
                  error={!!errors.complemento}
                  helperText={errors.complemento}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Bairro"
                  fullWidth
                  size="small"
                  value={form.bairro}
                  onChange={(e) => updateFormField("bairro", e.target.value)}
                  error={!!errors.bairro}
                  helperText={errors.bairro}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Cidade"
                  fullWidth
                  size="small"
                  value={form.cidade}
                  onChange={(e) => updateFormField("cidade", e.target.value)}
                  error={!!errors.cidade}
                  helperText={errors.cidade}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
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
                      sx={formHelperText}
                    >
                      {errors.estado}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={3}>
                {renderInputMask("99999-999", "cep", "CEP")}
              </Grid>
            </Grid>

            <Divider sx={dividerMarginY2} />

            <Typography variant="h6" gutterBottom sx={typographySubTitle}>
              4. CONTATO DE EMERGÊNCIA
            </Typography>

            <Grid container spacing={2} sx={gridMarginBottom10}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nome do contato"
                  fullWidth
                  size="small"
                  value={form.parente.Nome}
                  onChange={(e) => updateParenteField("Nome", e.target.value)}
                  error={!!errors.nomeParente}
                  helperText={errors.nomeParente}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Telefone do contato"
                  fullWidth
                  size="small"
                  value={form.parente.Telefone}
                  onChange={(e) =>
                    updateParenteField("Telefone", e.target.value)
                  }
                  error={!!errors.telefoneParente}
                  helperText={errors.telefoneParente}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Parentesco"
                  fullWidth
                  size="small"
                  value={form.parente.Parentesco}
                  onChange={(e) =>
                    updateParenteField("Parentesco", e.target.value)
                  }
                  error={!!errors.parentesco}
                  helperText={errors.parentesco}
                />
              </Grid>
            </Grid>

            <Divider sx={dividerMarginY2} />

            <Typography variant="h6" gutterBottom sx={typographySubTitle}>
              5. INFORMAÇÕES ADICIONAIS
            </Typography>

            <Grid container spacing={2} sx={gridMarginBottom10}>
              <Grid item xs={12} sm={6}>
                {renderSelect(
                  "ondeNosConheceu",
                  "Onde nos conheceu",
                  selectOptions.ondeNosConheceu
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                {renderSelect(
                  "encaminhadoPor",
                  "Encaminhado por",
                  selectOptions.encaminhadoPor
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Observações"
                  fullWidth
                  multiline
                  minRows={3}
                  value={form.observacoes}
                  onChange={(e) =>
                    updateFormField("observacoes", e.target.value)
                  }
                  error={!!errors.observacoes}
                  helperText={errors.observacoes}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Tags (separadas por vírgula)"
                  fullWidth
                  value={(form.tags || []).join(", ")}
                  onChange={(e) => handleTagsChange(e.target.value)}
                />
              </Grid>
            </Grid>

            <Box sx={boxButtonContainer}>
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
