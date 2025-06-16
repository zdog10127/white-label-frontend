import React, { useState, MouseEvent } from "react";
import {
  Box,
  Button,
  Select,
  MenuItem,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Menu,
  MenuItem as MenuItemDropdown,
} from "@mui/material";
import ScheduleModal from "../components/modal-Schedule/sheduleModal";
import rawClientsData from "../components/data/clients.json";
import { getBrazilianHolidays } from "../utils/holidays";

interface ClientType {
  id: string;
  name: string;
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

const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const extraOptions = ["Exportar agenda", "Configurações", "Ajuda"];

const sectionLabels = {
  agendaGeneral: "Agenda Geral",
  sessionsByDay: "Sessões por Dia",
  roomAgenda: "Agenda de Salas",
  bookingRequests: "Solicitações de Agendamento",
};

const Schedule: React.FC = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const holidays = getBrazilianHolidays(currentYear);
  const [filter, setFilter] = useState("todos");
  const [view, setView] = useState<"mes" | "semana" | "dia">("mes");
  const [selectedSection, setSelectedSection] = useState("agendaGeneral");
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState(false);

  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleOptionClick = (option: string) => {
    alert(`Selecionou: ${option}`);
    handleMenuClose();
  };

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

  const generateDaysOfMonth = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const isHoliday = (day: number) => {
    const dateStr = `${currentYear}-${(currentMonth + 1)
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    return holidays.includes(dateStr);
  };

  const getFirstDayOfWeek = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 7 : day;
  };

  const getWeeksOfMonth = () => {
    const weeks: (number | null)[][] = [];
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayWeek = getFirstDayOfWeek(currentYear, currentMonth);
    let startDay = 1 - (firstDayWeek - 1);
    while (startDay <= daysInMonth) {
      const week: (number | null)[] = [];
      for (let i = 0; i < 7; i++) {
        const day = startDay + i;
        week.push(day >= 1 && day <= daysInMonth ? day : null);
      }
      weeks.push(week);
      startDay += 7;
    }
    return weeks;
  };

  const weeks = getWeeksOfMonth();

  return (
    <Box p={3}>
      <Box
        display="flex"
        gap={2}
        mb={3}
        sx={{ borderBottom: "2px solid", borderColor: "divider", pb: 1 }}
      >
        {Object.entries(sectionLabels).map(([id, label]) => (
          <Button
            key={id}
            variant={selectedSection === id ? "contained" : "outlined"}
            onClick={() => setSelectedSection(id)}
          >
            {label}
          </Button>
        ))}
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        flexWrap="wrap"
        gap={2}
      >
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Button onClick={prevMonth}>&lt;</Button>
          <Typography fontWeight="bold">
            {months[currentMonth]} {currentYear}
          </Typography>
          <Button onClick={nextMonth}>&gt;</Button>

          {view === "semana" && (
            <Select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(Number(e.target.value))}
              size="small"
            >
              {weeks.map((_, idx) => (
                <MenuItem key={idx} value={idx + 1}>
                  Semana {idx + 1}
                </MenuItem>
              ))}
            </Select>
          )}

          {view === "dia" && (
            <Select
              value={selectedDay}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
              size="small"
            >
              {generateDaysOfMonth().map((day) => (
                <MenuItem key={day} value={day}>
                  Dia {day}
                </MenuItem>
              ))}
            </Select>
          )}
        </Box>

        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(e, newView) => newView && setView(newView)}
          size="small"
        >
          <ToggleButton value="dia">Dia</ToggleButton>
          <ToggleButton value="semana">Semana</ToggleButton>
          <ToggleButton value="mes">Mês</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        gap={2}
        mb={3}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          p: 2,
          backgroundColor: "background.paper",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            size="small"
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="confirmados">Confirmados</MenuItem>
            <MenuItem value="pendentes">Pendentes</MenuItem>
            <MenuItem value="cancelados">Cancelados</MenuItem>
          </Select>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}
          >
            Agendar Sessão
          </Button>

          <Button
            variant="outlined"
            onClick={handleMenuClick}
            aria-controls={openMenu ? "options-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
          >
            Opções ▾
          </Button>
          <Menu
            id="options-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
          >
            {extraOptions.map((option, idx) => (
              <MenuItemDropdown
                key={idx}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </MenuItemDropdown>
            ))}
          </Menu>
        </Box>
      </Box>

      <ScheduleModal
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        clients={clients}
      />

      {view === "mes" && (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              borderBottom: "1px solid #ccc",
              pb: 1,
              mb: 1,
            }}
          >
            {weekDays.map((day) => (
              <Typography
                key={day}
                align="center"
                fontWeight="bold"
                sx={{ userSelect: "none" }}
              >
                {day}
              </Typography>
            ))}
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 0,
            }}
          >
            {generateDaysOfMonth().map((day) => {
              const holiday = isHoliday(day);
              return (
                <Box
                  key={day}
                  sx={{
                    height: 160,
                    border: "1px solid #eee",
                    boxSizing: "border-box",
                    bgcolor: holiday ? "#ffebee" : "background.paper",
                    color: holiday ? "error.main" : "text.primary",
                    p: 1,
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    {day}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Schedule;
