import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper, Divider } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import ScheduleModal from "../../components/mod/modal-Schedule";
import clients from "../../components/data/clients.json";

import {
  PageContainer,
  CalendarPaper,
  SessionsPaper,
  HeaderBox,
  ButtonsBox,
  EmptyStateBox,
  EmptyIcon,
  SessionPaper,
} from "./styles";

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
    <PageContainer>
      <Divider sx={{ my: 2 }} />

      <Box display="flex" gap={4}>
        <CalendarPaper>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
            />
          </LocalizationProvider>
        </CalendarPaper>

        <Box flex={1}>
          <SessionsPaper>
            <HeaderBox>
              <Typography variant="h6">
                Sessões do dia {selectedDate?.format("DD/MM/YYYY")}
              </Typography>
              <ButtonsBox>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
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
              </ButtonsBox>
            </HeaderBox>

            {!sessoesDoDia.length ? (
              <EmptyStateBox>
                <EmptyIcon color="text.secondary">📅</EmptyIcon>
                <Typography variant="subtitle1" fontWeight="bold">
                  Você ainda não cadastrou nenhuma sessão para esse dia.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Para adicionar um novo agendamento, clique em "Agendar sessão"
                  acima.
                </Typography>
              </EmptyStateBox>
            ) : (
              <Box mt={4}>
                {sessoesDoDia.map((sessao) => (
                  <SessionPaper key={sessao.id}>
                    <Typography fontWeight="bold">{sessao.titulo}</Typography>
                    <Typography variant="body2">{sessao.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {dayjs(sessao.data).format("DD/MM/YYYY")}
                    </Typography>
                  </SessionPaper>
                ))}
              </Box>
            )}
          </SessionsPaper>
        </Box>
      </Box>

      <ScheduleModal
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        clients={mappedClients}
        onSave={handleAddSessao}
      />
    </PageContainer>
  );
};

export default DataGridPage;
