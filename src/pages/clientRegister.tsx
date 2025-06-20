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

dayjs.locale("pt-br");

const ClientRegister: React.FC = () => {
  const [activePage, setActivePage] = useState("cadastro");
  const [useSocialName, setUseSocialName] = useState(false);

  const [form, setForm] = useState({
    name: "",
    cpf: "",
    rg: "",
    phone: "",
    cellphone: "",
    birth: null as Dayjs | null,
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
    tags: [] as string[],
    corIdentificacao: "#415a44",
    nacionalidade: "",
    nomeSocial: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    cpf: false,
    group: false,
  });

  const updateFormField = useCallback((field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const validateForm = useCallback(() => {
    return {
      name: form.name.trim() === "",
      cpf: form.cpf.replace(/[^0-9]/g, "").length !== 11,
      group: form.group === "",
    };
  }, [form.name, form.cpf, form.group]);

  const handleSubmit = useCallback(() => {
    const newErrors = validateForm();
    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (!hasError) {
      const formData = {
        ...form,
        birth: form.birth ? form.birth.format("DD/MM/YYYY") : "",
      };
      console.log("Dados do formulário:", formData);
      alert("Cadastro enviado com sucesso!");
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

  const handleDateChange = useCallback((newValue: Dayjs | null) => {
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
    } else {
      setForm((prev) => ({
        ...prev,
        birth: null,
        age: "",
      }));
    }
  }, []);

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
      error?: boolean
    ) => (
      <FormControl fullWidth size="small" error={error}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={form[field as keyof typeof form] as string}
          label={label}
          onChange={(e) => updateFormField(field, e.target.value)}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    ),
    [form, updateFormField]
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
                  helperText={errors.name ? "Campo obrigatório" : ""}
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField
                  size="small"
                  label="E-mail"
                  fullWidth
                  value={form.email}
                  onChange={(e) => updateFormField("email", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="pt-br"
                >
                  <DatePicker
                    label="Data de nascimento"
                    value={form.birth}
                    onChange={handleDateChange}
                    format="DD/MM/YYYY"
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={4}>
                {renderSelect(
                  "group",
                  "Grupo *",
                  selectOptions.grupo,
                  errors.group
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  label="Naturalidade"
                  fullWidth
                  value={form.naturalidade}
                  onChange={(e) =>
                    updateFormField("naturalidade", e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={12} md={4}>
                {renderSelect(
                  "nacionalidade",
                  "Nacionalidade",
                  selectOptions.nacionalidade
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
                      helperText={errors.cpf ? "CPF inválido" : ""}
                    />
                  )}
                </InputMask>
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  size="small"
                  label="RG"
                  fullWidth
                  value={form.rg}
                  onChange={(e) => updateFormField("rg", e.target.value)}
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
                      label="Celular"
                      fullWidth
                      size="small"
                    />
                  )}
                </InputMask>
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  size="small"
                  label="Idade"
                  fullWidth
                  value={form.age}
                  disabled
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
                  label="Profissão"
                  fullWidth
                  value={form.profissao}
                  onChange={(e) => updateFormField("profissao", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  size="small"
                  label="Renda mensal"
                  fullWidth
                  value={form.renda}
                  onChange={(e) => updateFormField("renda", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                {renderSelect(
                  "pagamento",
                  "Forma de pagamento",
                  selectOptions.pagamento
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  size="small"
                  label="Banco"
                  fullWidth
                  value={form.banco}
                  onChange={(e) => updateFormField("banco", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  size="small"
                  label="Agência"
                  fullWidth
                  value={form.agencia}
                  onChange={(e) => updateFormField("agencia", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  size="small"
                  label="Conta"
                  fullWidth
                  value={form.conta}
                  onChange={(e) => updateFormField("conta", e.target.value)}
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
                  label="Endereço"
                  fullWidth
                  value={form.endereco}
                  onChange={(e) => updateFormField("endereco", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  size="small"
                  label="Número"
                  fullWidth
                  value={form.numero}
                  onChange={(e) => updateFormField("numero", e.target.value)}
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
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  size="small"
                  label="Bairro"
                  fullWidth
                  value={form.bairro}
                  onChange={(e) => updateFormField("bairro", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  size="small"
                  label="Cidade"
                  fullWidth
                  value={form.cidade}
                  onChange={(e) => updateFormField("cidade", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Estado</InputLabel>
                  <Select
                    value={form.estado}
                    label="Estado"
                    onChange={(e) => updateFormField("estado", e.target.value)}
                  >
                    <MenuItem value="">--Selecione--</MenuItem>
                    {memoizedEstados}
                  </Select>
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
                      label="CEP"
                      fullWidth
                      size="small"
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
                  selectOptions.escolaridade
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                {renderSelect(
                  "ondeNosConheceu",
                  "Onde nos conheceu?",
                  selectOptions.ondeNosConheceu
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                {renderSelect(
                  "encaminhadoPor",
                  "Encaminhado por",
                  selectOptions.encaminhadoPor
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Nome de um parente"
                  size="small"
                  fullWidth
                  value={form.nomeParente}
                  onChange={(e) =>
                    updateFormField("nomeParente", e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Parentesco"
                  size="small"
                  fullWidth
                  value={form.parentesco}
                  onChange={(e) =>
                    updateFormField("parentesco", e.target.value)
                  }
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
                      label="Telefone"
                      size="small"
                      fullWidth
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
                  value={form.tags.join(", ")}
                  onChange={(e) => handleTagsChange(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Box display="flex" alignItems="center" gap={2} height="40px">
                  <Typography variant="body2" component="span">
                    Cor de Identificação:
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
                      border: "1px solid #ccc",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  />
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
