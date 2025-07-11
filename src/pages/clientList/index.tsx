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
import clientsDataRaw from "../../components/data/clients.json";
import {
  adaptClient,
  ClientWithExtras,
  RawClient,
} from "../../utils/adaptClient";
import DeleteClientModal from "../../components/mod/deleteClientModal";

import {
  Container,
  HeaderTitle,
  ButtonsStack,
  FiltersBox,
  StyledFormControl,
  StyledTextField,
  ActionsButton,
  ActionsButtonDelete,
} from "./styles";

const ClientList: React.FC = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<ClientWithExtras[]>([]);
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "Todos" | "Ativo" | "Inativo" | "Lista de Espera"
  >("Todos");
  const [showOnlyGroups, setShowOnlyGroups] = useState(false);
  const [page, setPage] = useState(0);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const adaptedClients: ClientWithExtras[] = (
      clientsDataRaw as RawClient[]
    ).map((raw, index) => adaptClient(raw, index));
    setClients(adaptedClients);
  }, []);

  const handleAddClient = () => {
    navigate("/cadastro-usuario");
  };

  const handleEdit = (client: ClientWithExtras) => {
    navigate("/cadastro-usuario", {
      state: { clientToEdit: client },
    });
  };

  const handleDelete = (id: number) => {
    setSelectedClientId(id);
    setOpenDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedClientId !== null) {
      setClients((prev) => prev.filter((c) => c.id !== selectedClientId));
      setOpenDeleteModal(false);
      setSelectedClientId(null);
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

  const clientToDelete = clients.find((c) => c.id === selectedClientId);

  return (
    <Container>
      <HeaderTitle variant="h5" gutterBottom>
        Listagem de Clientes
      </HeaderTitle>

      <ButtonsStack direction="row" spacing={2} mb={2} flexWrap="wrap">
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
      </ButtonsStack>

      <FiltersBox
        display="flex"
        gap={2}
        flexWrap="wrap"
        mb={2}
        alignItems="center"
      >
        <StyledFormControl size="small">
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
        </StyledFormControl>

        <StyledTextField
          label="Pesquisar cliente"
          variant="outlined"
          size="small"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          disabled={showOnlyGroups}
        />
      </FiltersBox>

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
                    <ActionsButton
                      variant="outlined"
                      size="small"
                      color="primary"
                      onClick={() => handleEdit(client)}
                    >
                      Editar
                    </ActionsButton>
                    <ActionsButtonDelete
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleDelete(client.id)}
                    >
                      Excluir
                    </ActionsButtonDelete>
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

      <DeleteClientModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={confirmDelete}
        clientName={clientToDelete?.name}
      />
    </Container>
  );
};

export default ClientList;
