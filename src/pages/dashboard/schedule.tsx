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

const holidays = ["2025-06-12", "2025-06-20"];

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

const Agenda: React.FC = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [filter, setFilter] = useState("todos");
  const [view, setView] = useState<"mes" | "semana" | "dia">("mes");
  const [selectedSection, setSelectedSection] = useState("agendaGeneral");
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

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
        if (day >= 1 && day <= daysInMonth) {
          week.push(day);
        } else {
          week.push(null);
        }
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
            onClick={() => alert("Abrir modal para agendar sessão")}
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

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Button variant="outlined" onClick={prevMonth}>
            ◀ Voltar
          </Button>
          <Button variant="outlined" onClick={nextMonth} sx={{ ml: 1 }}>
            Avançar ▶
          </Button>
        </Box>

        <Typography variant="h6" fontWeight="bold">
          {months[currentMonth]} {currentYear}
        </Typography>

        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, val) => {
            if (val) {
              setView(val);
              if (val === "semana") setSelectedWeek(1);
              if (val === "dia") setSelectedDay(1);
            }
          }}
          size="small"
          color="primary"
        >
          <ToggleButton value="mes">Mês</ToggleButton>
          <ToggleButton value="semana">Semana</ToggleButton>
          <ToggleButton value="dia">Dia</ToggleButton>
        </ToggleButtonGroup>
      </Box>

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
                    height: 60,
                    border: "1px solid #eee",
                    boxSizing: "border-box",
                    bgcolor: holiday ? "#ffebee" : "background.paper",
                    color: holiday ? "error.main" : "text.primary",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    userSelect: "none",
                  }}
                >
                  {day}
                </Box>
              );
            })}
          </Box>
        </>
      )}

      {view === "semana" && (
        <>
          <Box mb={2} display="flex" alignItems="center" gap={2}>
            <Typography>Semana:</Typography>
            <Select
              size="small"
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(Number(e.target.value))}
            >
              {weeks.map((_, i) => (
                <MenuItem key={i} value={i + 1}>
                  {`Semana ${i + 1}`}
                </MenuItem>
              ))}
            </Select>
          </Box>

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
            {weeks[selectedWeek - 1].map((day, index) => {
              const holiday = day ? isHoliday(day) : false;
              return (
                <Box
                  key={index}
                  sx={{
                    height: 60,
                    border: "1px solid #eee",
                    boxSizing: "border-box",
                    bgcolor: holiday ? "#ffebee" : "background.paper",
                    color: holiday
                      ? "error.main"
                      : day
                      ? "text.primary"
                      : "text.disabled",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    userSelect: "none",
                  }}
                >
                  {day || ""}
                </Box>
              );
            })}
          </Box>
        </>
      )}

      {view === "dia" && (
        <Box
          sx={{
            height: 60,
            border: "1px solid #eee",
            boxSizing: "border-box",
            bgcolor: isHoliday(selectedDay) ? "#ffebee" : "background.paper",
            color: isHoliday(selectedDay) ? "error.main" : "text.primary",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            userSelect: "none",
            maxWidth: 100,
          }}
        >
          <Select
            value={selectedDay}
            onChange={(e) => setSelectedDay(Number(e.target.value))}
            size="small"
          >
            {generateDaysOfMonth().map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  );
};

export default Agenda;
