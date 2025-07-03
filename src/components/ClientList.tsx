import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Chip,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TablePagination,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import clientsDataRaw from "./data/clients.json";


type Sessao = {
  Data: string;
  Horario: string;
  Status: string;
  Frequencia: string;
};

type RawClient = {
  NomeCompleto: string;
  CPF: string;
  RG?: string;
  Telefone?: string;
  Email?: string;
  DataNascimento?: string;
  Genero?: string;
  Endereco?: string;
  Plano?: string;
  Convenio?: string;
  Sessao?: Sessao;
};

type ClientWithExtras = {
  id: number;
  status: "Ativo" | "Inativo" | "Lista de Espera";
  registrationDate: string;
  group: string | null;

  name: string;
  cpf: string;
  rg?: string;
  email?: string;
  cellphone?: string;
  birth?: string;
  gender?: string;
  endereco?: string;
  plano?: string;
  convenio?: string;

  sessao?: Sessao;
};

const ClientList: React.FC = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<ClientWithExtras[]>([]);
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "Todos" | "Ativo" | "Inativo" | "Lista de Espera"
  >("Todos");
  const [showOnlyGroups, setShowOnlyGroups] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const adaptedClients: ClientWithExtras[] = (clientsDataRaw as RawClient[]).map(
      (raw, index) => ({
        id: index + 1,
        status:
          index % 3 === 0
            ? "Ativo"
            : index % 3 === 1
              ? "Inativo"
              : "Lista de Espera",
        registrationDate: new Date().toISOString().split("T")[0],
        group: index % 2 === 0 ? "Grupo A" : null,

        name: raw.NomeCompleto,
        cpf: raw.CPF,
        rg: raw.RG ?? "",
        email: raw.Email ?? "",
        cellphone: raw.Telefone ?? "",
        birth: raw.DataNascimento ?? "",
        gender: raw.Genero ?? "",
        endereco: raw.Endereco ?? "",
        plano: raw.Plano ?? "",
        convenio: raw.Convenio ?? "",

        sessao: raw.Sessao,
      })
    );
    setClients(adaptedClients);
  }, []);


  const handleAddClient = () => {
    navigate("/cadastro-usuario");
  };

  const handleEdit = (client: ClientWithExtras) => {
    navigate("/cadastro-usuario", { state: { client } });
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      setClients((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleStatusFilterChange = (
    event: SelectChangeEvent<"Todos" | "Ativo" | "Inativo" | "Lista de Espera">
  ) => {
    setStatusFilter(event.target.value as typeof statusFilter);
    setPage(0);
    setShowOnlyGroups(false);
  };

  const handleToggleGroups = () => {
    setShowOnlyGroups((prev) => {
      const newValue = !prev;
      if (newValue) {
        setStatusFilter("Todos");
        setNameFilter("");
        setPage(0);
      }
      return newValue;
    });
  };

  const filteredClients = clients.filter((client) => {
    const nome = client.name || "";
    const matchesName = nome.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesStatus =
      statusFilter === "Todos" || client.status === statusFilter;

    if (showOnlyGroups) return client.group !== null && matchesName;

    return matchesStatus && matchesName;
  });

  const paginatedClients = filteredClients.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Listagem de Clientes
      </Typography>

      <Stack direction="row" spacing={2} mb={2} flexWrap="wrap">
        <Button variant="contained" color="primary" onClick={handleAddClient}>
          Adicionar Cliente
        </Button>

        <Button
          variant={
            statusFilter === "Lista de Espera" && !showOnlyGroups
              ? "contained"
              : "outlined"
          }
          onClick={() => {
            setStatusFilter("Lista de Espera");
            setShowOnlyGroups(false);
            setPage(0);
          }}
        >
          Lista de Espera
        </Button>

        <Button
          variant={showOnlyGroups ? "contained" : "outlined"}
          onClick={handleToggleGroups}
        >
          Grupos
        </Button>
      </Stack>

      <Box display="flex" gap={2} flexWrap="wrap" mb={2} alignItems="center">
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={handleStatusFilterChange}
            disabled={showOnlyGroups}
          >
            <MenuItem value="Todos">Todos</MenuItem>
            <MenuItem value="Ativo">Ativo</MenuItem>
            <MenuItem value="Inativo">Inativo</MenuItem>
            <MenuItem value="Lista de Espera">Lista de Espera</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Pesquisar cliente"
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1, minWidth: 250 }}
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          disabled={showOnlyGroups}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome do cliente</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Grupo</TableCell>
              <TableCell>Data do cadastro</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Nenhum cliente encontrado.
                </TableCell>
              </TableRow>
            ) : (
              paginatedClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={client.status}
                      color={
                        client.status === "Ativo"
                          ? "success"
                          : client.status === "Inativo"
                            ? "default"
                            : "warning"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{client.group || "-"}</TableCell>
                  <TableCell>{client.registrationDate}</TableCell>
                  <TableCell>{client.email || "-"}</TableCell>
                  <TableCell>{client.cellphone || "-"}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      sx={{ mr: 1 }}
                      onClick={() => handleEdit(client)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleDelete(client.id)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredClients.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Linhas por página"
      />
    </Box>
  );
};

export default ClientList;
