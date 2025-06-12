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

const formatDate = (year: number, month: number, day: number) => {
  return `${year}-${(month + 1).toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
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
  const [agendamentos, setAgendamentos] = useState<Record<string, string[]>>({
    "2025-09-12": ["Reunião com fornecedor"],
  });

  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);
  const handleOptionClick = (option: string) => {
    alert(`Selecionou: ${option}`);
    handleMenuClose();
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear((y) => y + 1);
    setSelectedWeek(1);
    setSelectedDay(1);
  };

  const prevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) setCurrentYear((y) => y - 1);
    setSelectedWeek(1);
    setSelectedDay(1);
  };

  const generateDaysOfMonth = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const isHoliday = (day: number) => {
    const dateStr = formatDate(currentYear, currentMonth, day);
    return holidays.includes(dateStr);
  };

  const getWeeksOfMonth = () => {
    const weeks: (number | null)[][] = [];
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayWeek = new Date(currentYear, currentMonth, 1).getDay() || 7;
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

  const handleAgendarSessao = () => {
    const dateStr = formatDate(currentYear, currentMonth, selectedDay);
    const novaDescricao = prompt("Digite o nome da sessão:") || "Nova Sessão";
    setAgendamentos((prev) => ({
      ...prev,
      [dateStr]: [...(prev[dateStr] || []), novaDescricao],
    }));
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

        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAgendarSessao}
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
          onChange={(_, val) => val && setView(val)}
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
              <Typography key={day} align="center" fontWeight="bold">
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
              const dateStr = formatDate(currentYear, currentMonth, day);
              const eventos = agendamentos[dateStr] || [];
              const holiday = isHoliday(day);
              return (
                <Box
                  key={day}
                  sx={{
                    height: 80,
                    border: "1px solid #eee",
                    boxSizing: "border-box",
                    bgcolor: holiday ? "#ffebee" : "background.paper",
                    color: holiday ? "error.main" : "text.primary",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    p: 1,
                    fontSize: 12,
                  }}
                >
                  <strong>{day}</strong>
                  {eventos.map((evento, idx) => (
                    <Typography
                      key={idx}
                      variant="caption"
                      sx={{
                        mt: 0.5,
                        backgroundColor: "#e3f2fd",
                        borderRadius: 1,
                        px: 0.5,
                        width: "100%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {evento}
                    </Typography>
                  ))}
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
                <MenuItem key={i} value={i + 1}>{`Semana ${i + 1}`}</MenuItem>
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
              <Typography key={day} align="center" fontWeight="bold">
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
              const dateStr = day
                ? formatDate(currentYear, currentMonth, day)
                : "";
              const eventos = agendamentos[dateStr] || [];
              const holiday = day ? isHoliday(day) : false;
              return (
                <Box
                  key={index}
                  sx={{
                    height: 80,
                    border: "1px solid #eee",
                    boxSizing: "border-box",
                    bgcolor: holiday ? "#ffebee" : "background.paper",
                    color: holiday
                      ? "error.main"
                      : day
                      ? "text.primary"
                      : "text.disabled",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    p: 1,
                    fontSize: 12,
                  }}
                >
                  <strong>{day || ""}</strong>
                  {eventos.map((evento, idx) => (
                    <Typography
                      key={idx}
                      variant="caption"
                      sx={{
                        mt: 0.5,
                        backgroundColor: "#e3f2fd",
                        borderRadius: 1,
                        px: 0.5,
                        width: "100%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {evento}
                    </Typography>
                  ))}
                </Box>
              );
            })}
          </Box>
        </>
      )}

      {view === "dia" && (
        <Box>
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
          <Box mt={2}>
            <Typography variant="h6">
              Agendamentos para o dia {selectedDay}
            </Typography>
            {(
              agendamentos[
                formatDate(currentYear, currentMonth, selectedDay)
              ] || []
            ).map((evento, idx) => (
              <Typography key={idx} variant="body2" sx={{ mt: 1 }}>
                • {evento}
              </Typography>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Agenda;
