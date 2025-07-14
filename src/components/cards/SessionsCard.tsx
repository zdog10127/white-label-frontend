import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CardBase from "./CardBase";
import EditSessionModal from "../mod/editSessionModal";
import ClientInfoModal from "../mod/clientModalInfo";
import { ClientType } from "../../types/clientModalInfo";

import clientDataJson from "../../components/data/clients.json";

export default function SessionsCard() {
  const [clients, setClients] = useState<ClientType[]>(clientDataJson);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientType | null>(null);

  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [infoClient, setInfoClient] = useState<ClientType | null>(null);

  const handleEdit = (client: ClientType) => {
    setSelectedClient(client);
    setEditModalOpen(true);
  };

  const handleDelete = (client: ClientType) => {
    if (
      window.confirm(
        `Deseja excluir a próxima sessão de ${client.NomeCompleto}?`
      )
    ) {
      const updatedClients = clients.map((c) =>
        c.CPF === client.CPF ? { ...c, Sessao: null } : c
      );
      setClients(updatedClients);
    }
  };

  const handleMoreOptions = (client: ClientType) => {
    setInfoClient(client);
    setInfoModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedClient(null);
  };

  const handleSaveSession = (updatedSession: any) => {
    if (!selectedClient) return;
    const updatedClients = clients.map((c) =>
      c.CPF === selectedClient.CPF ? { ...c, Sessao: updatedSession } : c
    );
    setClients(updatedClients);
    handleCloseEditModal();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pago":
        return "success.main";
      case "Pagar":
        return "warning.main";
      case "Liberado":
        return "info.main";
      case "Isento":
        return "secondary.main";
      default:
        return "text.primary";
    }
  };

  return (
    <>
      <CardBase
        title="Próximas sessões"
        avatar={<CalendarMonthIcon color="primary" />}
      >
        <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Situação</TableCell>
                <TableCell>Frequência</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.length > 0 ? (
                clients.map((client, index) => {
                  const session = client.Sessao;
                  if (!session) return null;

                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Avatar
                            src="https://via.placeholder.com/32"
                            alt={client.NomeCompleto}
                            sx={{ width: 32, height: 32 }}
                          />
                          <Typography variant="body2">
                            {client.NomeCompleto}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{session.Data}</TableCell>
                      <TableCell>{session.Horario}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "bold",
                            color: getStatusColor(session.Status),
                          }}
                        >
                          {session.Status}
                        </Typography>
                      </TableCell>
                      <TableCell>{session.Frequencia}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleEdit(client)}
                          >
                            <EditIcon fontSize="inherit" />
                          </IconButton>
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => handleDelete(client)}
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                          <IconButton
                            color="default"
                            size="small"
                            onClick={() => handleMoreOptions(client)}
                          >
                            <MoreHorizIcon fontSize="inherit" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="body2" color="text.secondary">
                      Nenhuma sessão encontrada.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </CardBase>

      <EditSessionModal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        session={selectedClient?.Sessao}
        onSave={handleSaveSession}
      />

      <ClientInfoModal
        open={infoModalOpen}
        client={infoClient}
        onClose={() => {
          setInfoModalOpen(false);
          setInfoClient(null);
        }}
      />
    </>
  );
}
