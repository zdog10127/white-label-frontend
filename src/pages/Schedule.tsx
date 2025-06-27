import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from "@mui/material";
import ScheduleModal from "../components/modal-Schedule/sheduleModal";
import rawClientsData from "../components/data/clients.json";
import { getBrazilianHolidays } from "../utils/holidays";

interface ClientType {
  id: string;
  name: string;
}

interface AgendamentoType {
  id: string;
  cpf: string;
  data: string;
  titulo: string;
  name: string;
  startTime: string;
  endTime: string;
}

const clients: ClientType[] = rawClientsData.map((client, index) => ({
  id: String(index + 1),
  name: client.NomeCompleto,
}));

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const weekDaysFull = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

const Schedule: React.FC = () => {
  const theme = useTheme();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const holidays = getBrazilianHolidays(currentYear);
  const [view, setView] = useState<"mes" | "semana" | "dia">("mes");
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [openDialog, setOpenDialog] = useState(false);
  const [agendamentos, setAgendamentos] = useState<AgendamentoType[]>([]);

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedWeek(1);
    setSelectedDay(1);
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedWeek(1);
    setSelectedDay(1);
  };

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const getFirstWeekdayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const getCalendarMatrix = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstWeekday = getFirstWeekdayOfMonth(currentYear, currentMonth);
    const weeks: (number | null)[][] = [];
    let currentDay = 1 - firstWeekday;

    while (currentDay <= daysInMonth) {
      const week: (number | null)[] = [];
      for (let i = 0; i < 7; i++) {
        if (currentDay > 0 && currentDay <= daysInMonth) {
          week.push(currentDay);
        } else {
          week.push(null);
        }
        currentDay++;
      }
      weeks.push(week);
    }
    return weeks;
  };

  const weeks = getCalendarMatrix();

  const isHoliday = (day: number) => {
    const dateStr = `${currentYear}-${(currentMonth + 1)
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    return holidays.includes(dateStr);
  };

  const agendamentosDoDia = (day: number) => {
    const dateStr = `${currentYear}-${(currentMonth + 1)
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    return agendamentos.filter((a) => a.data === dateStr);
  };

  const agendamentosDiaSelecionado = () => {
    const dateStr = `${currentYear}-${(currentMonth + 1)
      .toString()
      .padStart(2, "0")}-${selectedDay.toString().padStart(2, "0")}`;
    return agendamentos.filter((a) => a.data === dateStr);
  };

  const nextWeek = () => {
    if (selectedWeek < weeks.length) {
      setSelectedWeek(selectedWeek + 1);
    } else {
      nextMonth();
      setSelectedWeek(1);
    }
  };

  const prevWeek = () => {
    if (selectedWeek > 1) {
      setSelectedWeek(selectedWeek - 1);
    } else {
      prevMonth();
      const prevWeeks = getCalendarMatrix();
      setSelectedWeek(prevWeeks.length);
    }
  };

  const getWeekDays = () => {
    if (weeks[selectedWeek - 1]) {
      return weeks[selectedWeek - 1].map((day, index) => ({
        dayNumber: day,
        dayName: weekDaysFull[index],
        isHoliday: day ? isHoliday(day) : false,
        agendamentos: day ? agendamentosDoDia(day) : [],
      }));
    }
    return [];
  };

  const renderMonthView = () => (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Button variant="outlined" onClick={prevMonth}>
          {"<"}
        </Button>
        <Typography variant="h6">
          {months[currentMonth]} {currentYear}
        </Typography>
        <Button variant="outlined" onClick={nextMonth}>
          {">"}
        </Button>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(7, 1fr)"
        textAlign="center"
        mb={1}
      >
        {weekDays.map((day) => (
          <Typography key={day} fontWeight="bold">
            {day}
          </Typography>
        ))}
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
        {weeks.map((week, i) =>
          week.map((day, j) => {
            if (!day)
              return <Box key={`empty-${i}-${j}`} sx={{ height: 100 }} />;
            const holiday = isHoliday(day);
            const ags = agendamentosDoDia(day);
            const isToday =
              day === today.getDate() &&
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear();

            return (
              <Box
                key={day}
                onClick={() => {
                  setSelectedDay(day);
                  setView("dia");
                }}
                sx={{
                  cursor: "pointer",
                  borderRadius: 1,
                  p: 1,
                  height: 100,
                  backgroundColor: isToday
                    ? theme.palette.primary.main
                    : holiday
                    ? theme.palette.error.light
                    : ags.length > 0
                    ? theme.palette.info.light
                    : theme.palette.background.default,
                  color: isToday
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary,
                  border: `1px solid ${theme.palette.divider}`,
                  overflow: "hidden",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    color: theme.palette.text.primary,
                  },
                }}
              >
                <Typography fontWeight="bold" fontSize={14}>
                  {day}
                </Typography>
                {ags.map((ag) => (
                  <Typography
                    key={ag.id}
                    fontSize={10}
                    noWrap
                    sx={{
                      color: isToday
                        ? theme.palette.primary.contrastText
                        : theme.palette.text.secondary,
                    }}
                  >
                    {ag.name.split(" ")[0]} - {ag.startTime}
                  </Typography>
                ))}
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );

  const renderWeekView = () => {
    const weekDays = getWeekDays();

    return (
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Button variant="outlined" onClick={prevWeek} sx={{ minWidth: 160 }}>
            {"< Semana Anterior"}
          </Button>
          <Box textAlign="center">
            <Typography variant="h5" fontWeight="bold" color="primary">
              {`Semana ${selectedWeek}`}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {`${months[currentMonth]} ${currentYear}`}
            </Typography>
          </Box>
          <Button variant="outlined" onClick={nextWeek} sx={{ minWidth: 160 }}>
            {"Próxima Semana >"}
          </Button>
        </Box>

        <TableContainer
          component={Paper}
          elevation={3}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            maxHeight: "70vh",
          }}
        >
          <Table size="medium" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    width: "15%",
                    minWidth: 120,
                  }}
                >
                  Dia da Semana
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    width: "15%",
                    minWidth: 120,
                  }}
                >
                  Data
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    width: "70%",
                  }}
                >
                  Agendamentos
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {weekDays.map((day, index) => {
                const isToday =
                  day.dayNumber === today.getDate() &&
                  currentMonth === today.getMonth() &&
                  currentYear === today.getFullYear();

                return (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: isToday
                        ? "action.selected"
                        : day.isHoliday
                        ? "error.light"
                        : index % 2 === 0
                        ? "action.hover"
                        : "background.paper",
                      cursor: day.dayNumber ? "pointer" : "default",
                      height: 80,
                      "&:hover": {
                        backgroundColor: day.dayNumber
                          ? isToday
                            ? "action.selected"
                            : "action.focus"
                          : "inherit",
                        transform: day.dayNumber ? "scale(1.001)" : "none",
                        transition: "all 0.2s ease-in-out",
                      },
                      border: isToday ? 2 : 0,
                      borderColor: isToday ? "primary.main" : "transparent",
                      borderStyle: "solid",
                    }}
                    onClick={() => {
                      if (day.dayNumber) {
                        setSelectedDay(day.dayNumber);
                        setView("dia");
                      }
                    }}
                  >
                    <TableCell sx={{ verticalAlign: "top", py: 2 }}>
                      <Typography
                        variant="body1"
                        fontWeight={
                          isToday ? "bold" : day.isHoliday ? "bold" : "normal"
                        }
                        color={
                          isToday
                            ? "primary"
                            : day.isHoliday
                            ? "error"
                            : "text.primary"
                        }
                        sx={{ fontSize: "0.95rem" }}
                      >
                        {day.dayName}
                      </Typography>
                      {isToday && (
                        <Typography
                          variant="caption"
                          color="primary"
                          fontWeight="bold"
                        >
                          (Hoje)
                        </Typography>
                      )}
                      {day.isHoliday && (
                        <Typography variant="caption" color="error">
                          (Feriado)
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ verticalAlign: "top", py: 2 }}>
                      <Typography
                        variant="body1"
                        fontWeight={isToday ? "bold" : "normal"}
                        color={isToday ? "primary" : "text.primary"}
                        sx={{ fontSize: "0.95rem" }}
                      >
                        {day.dayNumber
                          ? `${day.dayNumber.toString().padStart(2, "0")}/${(
                              currentMonth + 1
                            )
                              .toString()
                              .padStart(2, "0")}/${currentYear}`
                          : ""}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ verticalAlign: "top", py: 2 }}>
                      {day.agendamentos.length === 0 ? (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          sx={{
                            height: "40px",
                            backgroundColor: "action.hover",
                            borderRadius: 1,
                            border: 1,
                            borderColor: "divider",
                            borderStyle: "dashed",
                          }}
                        >
                          <Typography
                            color="text.secondary"
                            fontStyle="italic"
                            variant="body2"
                          >
                            Nenhum agendamento
                          </Typography>
                          {day.dayNumber && (
                            <Button
                              size="small"
                              variant="text"
                              sx={{ ml: 1, fontSize: "0.7rem" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDay(day.dayNumber!);
                                setOpenDialog(true);
                              }}
                            >
                              + Agendar
                            </Button>
                          )}
                        </Box>
                      ) : (
                        <Box>
                          {day.agendamentos.map((ag, agIndex) => (
                            <Box
                              key={ag.id}
                              sx={{
                                mb:
                                  agIndex < day.agendamentos.length - 1
                                    ? 1.5
                                    : 0,
                                p: 1.5,
                                backgroundColor: "success.light",
                                borderRadius: 1,
                                border: 1,
                                borderColor: "success.main",
                                boxShadow: 1,
                                "&:hover": {
                                  backgroundColor: "success.dark",
                                  transform: "translateX(2px)",
                                  transition: "all 0.2s ease-in-out",
                                },
                              }}
                            >
                              <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="text.primary"
                                sx={{ fontSize: "0.9rem" }}
                              >
                                {ag.titulo}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                  display: "block",
                                  mt: 0.5,
                                  fontSize: "0.8rem",
                                }}
                              >
                                👤 {ag.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                  display: "block",
                                  fontSize: "0.8rem",
                                  fontWeight: "medium",
                                }}
                              >
                                🕒 {ag.startTime} às {ag.endTime}
                              </Typography>
                            </Box>
                          ))}
                          {day.dayNumber && (
                            <Button
                              size="small"
                              variant="outlined"
                              color="primary"
                              sx={{
                                mt: 1,
                                fontSize: "0.7rem",
                                minHeight: 28,
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDay(day.dayNumber!);
                                setOpenDialog(true);
                              }}
                            >
                              + Novo Agendamento
                            </Button>
                          )}
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1000,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: 50,
              minWidth: 56,
              height: 56,
              fontSize: "1.2rem",
              boxShadow: 3,
              "&:hover": {
                boxShadow: 6,
                transform: "scale(1.05)",
              },
            }}
            onClick={() => setOpenDialog(true)}
          >
            +
          </Button>
        </Box>
      </Box>
    );
  };

  const renderDayView = () => {
    const agendamentosDoDiaSelecionado = agendamentosDiaSelecionado();

    return (
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Button variant="outlined" onClick={() => setView("mes")}>
            {"< Voltar ao mês"}
          </Button>
          <Typography variant="h6">
            {`Agenda do dia ${selectedDay} de ${months[currentMonth]} de ${currentYear}`}
          </Typography>
          <Box width={100} />
        </Box>

        {agendamentosDoDiaSelecionado.length === 0 ? (
          <Typography>Nenhum agendamento para este dia.</Typography>
        ) : (
          agendamentosDoDiaSelecionado.map((ag) => (
            <Box
              key={ag.id}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                p: 2,
                mb: 1,
                backgroundColor: theme.palette.info.light,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {ag.titulo}
              </Typography>
              <Typography>
                Cliente: {ag.name} - CPF: {ag.cpf}
              </Typography>
              <Typography>
                Horário: {ag.startTime} - {ag.endTime}
              </Typography>
            </Box>
          ))
        )}
      </Box>
    );
  };

  return (
    <Box p={3}>
      <ScheduleModal
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        clients={clients}
        onSave={(novaSessao) => {
          setAgendamentos((prev) => [...prev, novaSessao]);
          setOpenDialog(false);
        }}
      />

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenDialog(true)}
        >
          Agendar Sessão
        </Button>
      </Box>

      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(_, newView) => {
          if (newView) setView(newView);
        }}
        sx={{ mb: 3 }}
      >
        <ToggleButton value="mes">Mês</ToggleButton>
        <ToggleButton value="semana">Semana</ToggleButton>
        <ToggleButton value="dia">Dia</ToggleButton>
      </ToggleButtonGroup>

      {view === "mes" && renderMonthView()}
      {view === "semana" && renderWeekView()}
      {view === "dia" && renderDayView()}
    </Box>
  );
};

export default Schedule;
