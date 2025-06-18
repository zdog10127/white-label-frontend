import React, { useState } from "react";
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

const ClientRegister: React.FC = () => {
  const [activePage, setActivePage] = useState("cadastro");
  const [useSocialName, setUseSocialName] = useState(false);

  const [form, setForm] = useState({
    name: "",
    cpf: "",
    rg: "",
    phone: "",
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
    tags: [] as string[],
    corIdentificacao: "#415a44",
    nomeResponsavel: "",
    cpfResponsavel: "",
    telefoneResponsavel: "",
    permitirEnvioCobranca: false,
  });

  const [errors, setErrors] = useState({
    name: false,
    cpf: false,
    group: false,
  });

  const handleSubmit = () => {
    const newErrors = {
      name: form.name.trim() === "",
      cpf: form.cpf.replace(/[^0-9]/g, "").length !== 11,
      group: form.group === "",
    };

    setErrors(newErrors);
    const hasError = Object.values(newErrors).some(Boolean);
    if (!hasError) alert("Cadastro enviado com sucesso!");
  };

  const handleToggleEnvioCobranca = () => {
    setForm((prev) => ({
      ...prev,
      permitirEnvioCobranca: !prev.permitirEnvioCobranca,
    }));
  };

  const handleTagsChange = (value: string) => {
    const tagsArray = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");
    setForm({ ...form, tags: tagsArray });
  };

  return (
    <Box display="flex">
      <SideBarRegister onSelect={setActivePage} activeSection={activePage} />

      <Box flex={1} p={2} ml="220px" maxWidth="1200px" mx="auto">
        {activePage === "cadastro" && (
          <>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ mb: 2, fontWeight: 600 }}
            >
              1. INFORMAÇÕES PESSOAIS
            </Typography>
            <Grid container spacing={1.5} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  size="small"
                  label="Nome *"
                  fullWidth
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  error={errors.name}
                  helperText={errors.name ? "Campo obrigatório" : ""}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={useSocialName}
                      onChange={(e) => setUseSocialName(e.target.checked)}
                      size="small"
                    />
                  }
                  label={
                    <Box display="flex" alignItems="center">
                      <Typography variant="body2">Usar nome social</Typography>
                      <Tooltip title="Você pode optar por usar um nome social">
                        <IconButton size="small" color="primary">
                          <InfoIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth size="small" error={errors.group}>
                  <InputLabel>Grupo *</InputLabel>
                  <Select
                    value={form.group}
                    label="Grupo *"
                    onChange={(e) =>
                      setForm({ ...form, group: e.target.value })
                    }
                  >
                    <MenuItem value="">--Selecione--</MenuItem>
                    <MenuItem value="grupo1">Grupo 1</MenuItem>
                    <MenuItem value="grupo2">Grupo 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  size="small"
                  label="Naturalidade"
                  fullWidth
                  value={form.naturalidade}
                  onChange={(e) =>
                    setForm({ ...form, naturalidade: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <InputMask
                  mask="99/99/9999"
                  value={form.birth}
                  onChange={(e) => setForm({ ...form, birth: e.target.value })}
                >
                  {(inputProps: any) => (
                    <TextField
                      {...inputProps}
                      label="Data de nascimento"
                      fullWidth
                      size="small"
                    />
                  )}
                </InputMask>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  size="small"
                  label="Idade"
                  fullWidth
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Gênero</InputLabel>
                  <Select
                    value={form.gender}
                    label="Gênero"
                    onChange={(e) =>
                      setForm({ ...form, gender: e.target.value })
                    }
                  >
                    <MenuItem value="">--Selecione--</MenuItem>
                    <MenuItem value="Masculino">Masculino</MenuItem>
                    <MenuItem value="Feminino">Feminino</MenuItem>
                    <MenuItem value="Outro">Outro</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Nacionalidade</InputLabel>
                  <Select
                    value={form.gender}
                    label="Nacionalidade"
                    onChange={(e) =>
                      setForm({ ...form, gender: e.target.value })
                    }
                  >
                    <MenuItem value="">--Selecione--</MenuItem>
                    <MenuItem value="brasileira">Brasileira</MenuItem>
                    <MenuItem value="estrangeira">Estrangeira</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  size="small"
                  label="E-mail"
                  fullWidth
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <InputMask
                  mask="+55 (99) 99999-9999"
                  value={form.cellphone}
                  onChange={(e) =>
                    setForm({ ...form, cellphone: e.target.value })
                  }
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

              <Grid item xs={12} sm={6} md={3}>
                <InputMask
                  mask="(99) 9999-9999"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                >
                  {(inputProps: any) => (
                    <TextField
                      {...inputProps}
                      label="Telefone"
                      fullWidth
                      size="small"
                    />
                  )}
                </InputMask>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <InputMask
                  mask="999.999.999-99"
                  value={form.cpf}
                  onChange={(e) => setForm({ ...form, cpf: e.target.value })}
                >
                  {(inputProps: any) => (
                    <TextField
                      {...inputProps}
                      label="CPF *"
                      fullWidth
                      size="small"
                      error={errors.cpf}
                      helperText={errors.cpf ? "CPF inválido" : ""}
                    />
                  )}
                </InputMask>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  size="small"
                  label="RG"
                  fullWidth
                  value={form.rg}
                  onChange={(e) => setForm({ ...form, rg: e.target.value })}
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
                    setForm({ ...form, observacoes: e.target.value })
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
            <Grid container spacing={1.5} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  size="small"
                  label="Profissão"
                  fullWidth
                  value={form.profissao}
                  onChange={(e) =>
                    setForm({ ...form, profissao: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  size="small"
                  label="Renda mensal"
                  fullWidth
                  value={form.renda}
                  onChange={(e) => setForm({ ...form, renda: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Forma de pagamento</InputLabel>
                  <Select
                    value={form.pagamento}
                    label="Forma de pagamento"
                    onChange={(e) =>
                      setForm({ ...form, pagamento: e.target.value })
                    }
                  >
                    <MenuItem value="">--Selecione--</MenuItem>
                    <MenuItem value="pix">PIX</MenuItem>
                    <MenuItem value="boleto">Boleto</MenuItem>
                    <MenuItem value="cartao">Cartão</MenuItem>
                    <MenuItem value="dinheiro">Dinheiro</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  size="small"
                  label="Banco"
                  fullWidth
                  value={form.banco}
                  onChange={(e) => setForm({ ...form, banco: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  size="small"
                  label="Agência"
                  fullWidth
                  value={form.agencia}
                  onChange={(e) =>
                    setForm({ ...form, agencia: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  size="small"
                  label="Conta"
                  fullWidth
                  value={form.conta}
                  onChange={(e) => setForm({ ...form, conta: e.target.value })}
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
            <Grid container spacing={1.5} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={5}>
                <TextField
                  size="small"
                  label="Endereço"
                  fullWidth
                  value={form.endereco}
                  onChange={(e) =>
                    setForm({ ...form, endereco: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6} md={1.5}>
                <TextField
                  size="small"
                  label="Número"
                  fullWidth
                  value={form.numero}
                  onChange={(e) => setForm({ ...form, numero: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={2.5}>
                <TextField
                  size="small"
                  label="Complemento"
                  fullWidth
                  value={form.complemento}
                  onChange={(e) =>
                    setForm({ ...form, complemento: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  size="small"
                  label="Bairro"
                  fullWidth
                  value={form.bairro}
                  onChange={(e) => setForm({ ...form, bairro: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  size="small"
                  label="Cidade"
                  fullWidth
                  value={form.cidade}
                  onChange={(e) => setForm({ ...form, cidade: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Estado</InputLabel>
                  <Select
                    value={form.estado}
                    label="Estado"
                    onChange={(e) =>
                      setForm({ ...form, estado: e.target.value })
                    }
                  >
                    <MenuItem value="">--Selecione--</MenuItem>
                    <MenuItem value="AC">Acre</MenuItem>
                    <MenuItem value="AL">Alagoas</MenuItem>
                    <MenuItem value="AP">Amapá</MenuItem>
                    <MenuItem value="AM">Amazonas</MenuItem>
                    <MenuItem value="BA">Bahia</MenuItem>
                    <MenuItem value="CE">Ceará</MenuItem>
                    <MenuItem value="DF">Distrito Federal</MenuItem>
                    <MenuItem value="ES">Espírito Santo</MenuItem>
                    <MenuItem value="GO">Goiás</MenuItem>
                    <MenuItem value="MA">Maranhão</MenuItem>
                    <MenuItem value="MT">Mato Grosso</MenuItem>
                    <MenuItem value="MS">Mato Grosso do Sul</MenuItem>
                    <MenuItem value="MG">Minas Gerais</MenuItem>
                    <MenuItem value="PA">Pará</MenuItem>
                    <MenuItem value="PB">Paraíba</MenuItem>
                    <MenuItem value="PR">Paraná</MenuItem>
                    <MenuItem value="PE">Pernambuco</MenuItem>
                    <MenuItem value="PI">Piauí</MenuItem>
                    <MenuItem value="RJ">Rio de Janeiro</MenuItem>
                    <MenuItem value="RN">Rio Grande do Norte</MenuItem>
                    <MenuItem value="RS">Rio Grande do Sul</MenuItem>
                    <MenuItem value="RO">Rondônia</MenuItem>
                    <MenuItem value="RR">Roraima</MenuItem>
                    <MenuItem value="SC">Santa Catarina</MenuItem>
                    <MenuItem value="SP">São Paulo</MenuItem>
                    <MenuItem value="SE">Sergipe</MenuItem>
                    <MenuItem value="TO">Tocantins</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <InputMask
                  mask="99999-999"
                  value={form.cep}
                  onChange={(e) => setForm({ ...form, cep: e.target.value })}
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

            <Grid container spacing={1.5} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Escolaridade</InputLabel>
                  <Select
                    value={form.escolaridade}
                    label="Escolaridade"
                    onChange={(e) =>
                      setForm({ ...form, escolaridade: e.target.value })
                    }
                  >
                    <MenuItem value="">--Selecione--</MenuItem>
                    <MenuItem value="fundamental">Fundamental</MenuItem>
                    <MenuItem value="medio">Médio</MenuItem>
                    <MenuItem value="superior">Superior</MenuItem>
                    <MenuItem value="pos-graduacao">Pós-graduação</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Onde nos conheceu?</InputLabel>
                  <Select
                    value={form.ondeNosConheceu}
                    label="Onde nos conheceu?"
                    onChange={(e) =>
                      setForm({ ...form, ondeNosConheceu: e.target.value })
                    }
                  >
                    <MenuItem value="">--Selecione--</MenuItem>
                    <MenuItem value="internet">Internet</MenuItem>
                    <MenuItem value="amigo">Amigo</MenuItem>
                    <MenuItem value="familia">Família</MenuItem>
                    <MenuItem value="publicidade">Publicidade</MenuItem>
                    <MenuItem value="outro">Outro</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Encaminhado por:</InputLabel>
                  <Select
                    value={form.encaminhadoPor}
                    label="Encaminhado por"
                    onChange={(e) =>
                      setForm({ ...form, encaminhadoPor: e.target.value })
                    }
                  >
                    <MenuItem value="">--Selecione--</MenuItem>
                    <MenuItem value="advogado">Advogado</MenuItem>
                    <MenuItem value="cliente">Cliente</MenuItem>
                    <MenuItem value="medico">Médico</MenuItem>
                    <MenuItem value="outro">Outro</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  label="Nome de um parente"
                  size="small"
                  fullWidth
                  value={form.nomeParente}
                  onChange={(e) =>
                    setForm({ ...form, nomeParente: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={3} md={2}>
                <TextField
                  label="Parentesco"
                  size="small"
                  fullWidth
                  value={form.parentesco}
                  onChange={(e) =>
                    setForm({ ...form, parentesco: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={3} md={2}>
                <InputMask
                  mask="(99) 99999-9999"
                  value={form.telefoneParente}
                  onChange={(e) =>
                    setForm({ ...form, telefoneParente: e.target.value })
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

              <Grid item xs={12} sm={6} md={5}>
                <TextField
                  label="Tags"
                  placeholder="-- Clique para escolher --"
                  size="small"
                  fullWidth
                  value={form.tags.join(", ")}
                  onChange={(e) => handleTagsChange(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Box display="flex" alignItems="center" gap={1} height="40px">
                  <Typography variant="body2" component="span">
                    Cor de Identificação:
                  </Typography>
                  <input
                    type="color"
                    value={form.corIdentificacao}
                    onChange={(e) =>
                      setForm({ ...form, corIdentificacao: e.target.value })
                    }
                    style={{
                      width: 30,
                      height: 30,
                      border: "1px solid #ccc",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Typography
              variant="h6"
              gutterBottom
              sx={{ mb: 2, fontWeight: 600 }}
            >
              5. RESPONSÁVEL
            </Typography>

            <Grid container spacing={1.5} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={8} md={6}>
                <TextField
                  label="Nome do responsável"
                  size="small"
                  fullWidth
                  value={form.nomeResponsavel}
                  onChange={(e) =>
                    setForm({ ...form, nomeResponsavel: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <InputMask
                  mask="999.999.999-99"
                  value={form.cpfResponsavel}
                  onChange={(e) =>
                    setForm({ ...form, cpfResponsavel: e.target.value })
                  }
                >
                  {(inputProps: any) => (
                    <TextField
                      {...inputProps}
                      label="CPF"
                      size="small"
                      fullWidth
                    />
                  )}
                </InputMask>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <InputMask
                  mask="(99) 99999-9999"
                  value={form.telefoneResponsavel}
                  onChange={(e) =>
                    setForm({ ...form, telefoneResponsavel: e.target.value })
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

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.permitirEnvioCobranca}
                      onChange={handleToggleEnvioCobranca}
                      color="primary"
                      size="small"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      Permitir o envio das cobranças no nome do responsável? (O
                      sistema usará o Nome e o CPF do responsável nas cobranças)
                    </Typography>
                  }
                />
              </Grid>
            </Grid>

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
