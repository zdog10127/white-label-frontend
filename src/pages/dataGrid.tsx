import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper, Divider } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import ScheduleModal from "../components/modal-Schedule/sheduleModal";
import clients from "../components/data/clients.json";

const DataGridPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [openDialog, setOpenDialog] = useState(false);

  const [sessoes, setSessoes] = useState<
    { id: string; cpf: string; data: string; titulo: string; name: string }[]
  >([]);

  useEffect(() => {
    const stored = localStorage.getItem("sessoes");
    if (stored) {
      setSessoes(JSON.parse(stored));
    }
  }, []);

  const mappedClients = clients.map((client) => ({
    id: client.CPF,
    name: client.NomeCompleto,
  }));

  const sessoesDoDia = sessoes.filter(
    (s) => selectedDate && dayjs(s.data).isSame(selectedDate, "day")
  );

  const handleAddSessao = (novaSessao: {
    id: string;
    cpf: string;
    data: string;
    titulo: string;
    name: string;
  }) => {
    const novas = [...sessoes, novaSessao];
    setSessoes(novas);
    localStorage.setItem("sessoes", JSON.stringify(novas));
    setOpenDialog(false);
  };

  return (
    <Box p={3}>
      <Divider sx={{ my: 2 }} />

      <Box display="flex" gap={4}>
        <Paper sx={{ p: 2, minWidth: 280 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
            />
          </LocalizationProvider>
        </Paper>

        <Box flex={1}>
          <Paper sx={{ p: 3 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">
                Sessões do dia {selectedDate?.format("DD/MM/YYYY")}
              </Typography>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  sx={{ mr: 1 }}
                  onClick={() => setOpenDialog(true)}
                >
                  Agendar sessão
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={() => {
                    const stored = localStorage.getItem("sessoes");
                    if (stored) setSessoes(JSON.parse(stored));
                  }}
                >
                  Atualizar
                </Button>
              </Box>
            </Box>

            {!sessoesDoDia.length ? (
              <Box textAlign="center" mt={6}>
                <Typography
                  variant="h1"
                  fontSize={60}
                  color="text.secondary"
                  sx={{ opacity: 0.3 }}
                >
                  📅
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  Você ainda não cadastrou nenhuma sessão para esse dia.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Para adicionar um novo agendamento, clique em "Agendar sessão"
                  acima.
                </Typography>
              </Box>
            ) : (
              <Box mt={4}>
                {sessoesDoDia.map((sessao) => (
                  <Paper key={sessao.id} sx={{ p: 2, mb: 20 }}>
                    <Typography fontWeight="bold">{sessao.titulo}</Typography>
                    <Typography variant="body2">{sessao.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {dayjs(sessao.data).format("DD/MM/YYYY")}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            )}
          </Paper>
        </Box>
      </Box>

      <ScheduleModal
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        clients={mappedClients}
        onSave={handleAddSessao}
      />
    </Box>
  );
};

export default DataGridPage;
