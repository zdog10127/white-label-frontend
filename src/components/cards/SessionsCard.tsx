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
import clientData from "../data/clients.json";

const handleEdit = (client: any) => {
  alert(`Editar cliente: ${client.NomeCompleto}`);
};

const handleDelete = (client: any) => {
  const confirmDelete = window.confirm(
    `Tem certeza que deseja excluir ${client.NomeCompleto}?`
  );
  if (confirmDelete) {
    alert(`${client.NomeCompleto} excluído!`);
  }
};

const handleMoreOptions = (client: any) => {
  alert(`Mais opções para: ${client.NomeCompleto}`);
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

export default function SessionsCard() {
  return (
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
            {clientData.length > 0 ? (
              clientData.map((client: any, index: number) => {
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
  );
}
