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
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import clientsDataRaw from "../../components/data/clients.json";
import {
  adaptClient,
  ClientWithExtras,
  RawClient,
} from "../../utils/adaptClient";
import DeleteClientModal from "../../components/mod/deleteClient-Modal";

import {
  Container,
  HeaderTitle,
  ButtonsStack,
  FiltersBox,
  StyledFormControl,
  StyledTextField,
  ActionsButton,
  ActionsButtonDelete,
  StatusAtivo,
  StatusInativo,
  StatusListaEspera,
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
    navigate("/clientes/novo");
  };

  const handleEdit = (client: ClientWithExtras) => {
    console.log("🔧 Navigating to edit with client:", client);
    navigate("/clientes/editar", {
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

  const handleExportExcel = () => {
    const exportData = filteredClients.map((client) => ({
      Nome: client.name,
      Status: client.status,
      Grupo: client.group || "-",
      "Data de Cadastro": client.registrationDate,
      "E-mail": client.email || "-",
      Telefone: client.cellphone || "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clientes");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, "clientes.xlsx");
  };

  const clientToDelete = clients.find((c) => c.id === selectedClientId);

  const renderStatus = (status: string) => {
    switch (status) {
      case "Ativo":
        return <StatusAtivo>{status}</StatusAtivo>;
      case "Inativo":
        return <StatusInativo>{status}</StatusInativo>;
      case "Lista de Espera":
        return <StatusListaEspera>{status}</StatusListaEspera>;
      default:
        return <Typography>{status}</Typography>;
    }
  };

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

        <Button variant="outlined" color="success" onClick={handleExportExcel}>
          Exportar Excel
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
              <TableCell>Nome</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Grupo</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{renderStatus(client.status)}</TableCell>
                <TableCell>{client.group || "-"}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <ActionsButton onClick={() => handleEdit(client)}>
                      Editar
                    </ActionsButton>
                    <ActionsButtonDelete
                      onClick={() => handleDelete(client.id)}
                    >
                      Excluir
                    </ActionsButtonDelete>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredClients.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Proxima Pagina"
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
