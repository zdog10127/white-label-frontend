// Schedule.tsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import ScheduleModal from "../../components/mod/modal-Schedule/sheduleModal";
import rawClientsData from "../../components/data/clients.json";
import { getBrazilianHolidays } from "../../utils/holidays";
import { ClientType, AgendamentoType } from "../../types/schedule";
import * as S from "./styles";

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
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [view, setView] = useState<"mes" | "semana" | "dia">("mes");
  const [openDialog, setOpenDialog] = useState(false);
  const [agendamentos, setAgendamentos] = useState<AgendamentoType[]>([]);
  const holidays = getBrazilianHolidays(currentYear);

  const nextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
    setSelectedWeek(1);
    setSelectedDay(1);
  };

  const prevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
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
        week.push(
          currentDay > 0 && currentDay <= daysInMonth ? currentDay : null
        );
        currentDay++;
      }
      weeks.push(week);
    }
    return weeks;
  };

  const weeks = getCalendarMatrix();

  const isHoliday = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    return holidays.includes(dateStr);
  };

  const agendamentosDoDia = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    return agendamentos.filter((a) => a.data === dateStr);
  };

  const agendamentosDiaSelecionado = () => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(selectedDay).padStart(2, "0")}`;
    return agendamentos.filter((a) => a.data === dateStr);
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
    <S.MonthContainer>
      <S.MonthHeader>
        <Button variant="outlined" onClick={prevMonth}>
          {"<"}
        </Button>
        <Typography variant="h6">
          {months[currentMonth]} {currentYear}
        </Typography>
        <Button variant="outlined" onClick={nextMonth}>
          {">"}
        </Button>
      </S.MonthHeader>

      <S.WeekdayHeader>
        {weekDays.map((day) => (
          <Typography key={day} fontWeight="bold">
            {day}
          </Typography>
        ))}
      </S.WeekdayHeader>

      <S.WeekGrid>
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
              <S.DayBox
                key={day}
                isToday={isToday}
                isHoliday={holiday}
                hasAgendamento={ags.length > 0}
                onClick={() => {
                  setSelectedDay(day);
                  setView("dia");
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
              </S.DayBox>
            );
          })
        )}
      </S.WeekGrid>
    </S.MonthContainer>
  );

  const renderWeekView = () => (
    <S.WeekContainer>
      <Typography variant="h6" mb={2}>
        Semana {selectedWeek} - {months[currentMonth]} {currentYear}
      </Typography>

      <S.WeekNavigation>
        <Button
          onClick={() => setSelectedWeek((prev) => Math.max(1, prev - 1))}
        >
          Anterior
        </Button>
        <Button onClick={() => setSelectedWeek((prev) => prev + 1)}>
          Próxima
        </Button>
      </S.WeekNavigation>

      <S.WeekGrid>
        {getWeekDays().map((day, idx) =>
          day.dayNumber ? (
            <S.DayBox
              key={idx}
              isToday={day.dayNumber === today.getDate()}
              isHoliday={day.isHoliday}
              hasAgendamento={day.agendamentos.length > 0}
              onClick={() => {
                setSelectedDay(day.dayNumber!);
                setView("dia");
              }}
            >
              <Typography fontWeight="bold" fontSize={14}>
                {day.dayName} - {day.dayNumber}
              </Typography>
              {day.agendamentos.map((ag) => (
                <Typography key={ag.id} fontSize={12}>
                  {ag.name.split(" ")[0]} - {ag.startTime}
                </Typography>
              ))}
            </S.DayBox>
          ) : (
            <Box key={idx} sx={{ height: 100 }} />
          )
        )}
      </S.WeekGrid>
    </S.WeekContainer>
  );

  const renderDayView = () => {
    const agendamentosHoje = agendamentosDiaSelecionado();
    return (
      <S.DayContainer>
        <Typography variant="h6" mb={2}>
          {selectedDay} de {months[currentMonth]} de {currentYear}
        </Typography>
        {agendamentosHoje.length === 0 ? (
          <Typography>Nenhuma sessão agendada.</Typography>
        ) : (
          agendamentosHoje.map((ag) => (
            <Box
              key={ag.id}
              mb={1}
              p={1}
              border="1px solid #ccc"
              borderRadius={2}
            >
              <Typography fontWeight="bold">{ag.name}</Typography>
              <Typography fontSize={14}>
                Horário: {ag.startTime} - Frequência: {ag.frequencia}
              </Typography>
              <Typography fontSize={14}>Status: {ag.status}</Typography>
            </Box>
          ))
        )}
      </S.DayContainer>
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
        <Button variant="contained" onClick={() => setOpenDialog(true)}>
          Agendar Sessão
        </Button>
      </Box>

      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(_, newView) => newView && setView(newView)}
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
