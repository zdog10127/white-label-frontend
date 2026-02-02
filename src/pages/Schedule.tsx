import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  CircularProgress,
  Menu,
  MenuItem,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
  Badge,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  Add,
  Today,
  MoreVert,
  CheckCircle,
  Cancel,
  Delete,
  Edit,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import appointmentService, { Appointment } from "../services/appointmentService";
import AppointmentModal from "../components/AppointmentModal";

// Meses em português
const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

// Dias da semana em português
const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

// Feriados nacionais do Brasil (2024-2026)
const getBrazilianHolidays = (year: number): string[] => {
  const holidays: string[] = [
    `${year}-01-01`, // Ano Novo
    `${year}-04-21`, // Tiradentes
    `${year}-05-01`, // Dia do Trabalho
    `${year}-09-07`, // Independência
    `${year}-10-12`, // Nossa Senhora Aparecida
    `${year}-11-02`, // Finados
    `${year}-11-15`, // Proclamação da República
    `${year}-12-25`, // Natal
  ];

  // Carnaval (47 dias antes da Páscoa)
  // Sexta-feira Santa (2 dias antes da Páscoa)
  // Corpus Christi (60 dias após a Páscoa)
  const easter = getEasterDate(year);
  const carnival = new Date(easter);
  carnival.setDate(carnival.getDate() - 47);
  
  const goodFriday = new Date(easter);
  goodFriday.setDate(goodFriday.getDate() - 2);
  
  const corpusChristi = new Date(easter);
  corpusChristi.setDate(corpusChristi.getDate() + 60);

  holidays.push(formatDate(carnival));
  holidays.push(formatDate(goodFriday));
  holidays.push(formatDate(corpusChristi));

  return holidays;
};

// Calcular data da Páscoa (Algoritmo de Meeus)
const getEasterDate = (year: number): Date => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
};

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function Schedule() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [appointmentMenuAnchor, setAppointmentMenuAnchor] = useState<null | HTMLElement>(null);
  const [menuAppointment, setMenuAppointment] = useState<Appointment | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const holidays = getBrazilianHolidays(currentYear);

  useEffect(() => {
    loadAppointments();
  }, [currentMonth, currentYear]);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const startDate = new Date(currentYear, currentMonth, 1);
      const endDate = new Date(currentYear, currentMonth + 1, 0);
      
      const startDateStr = formatDate(startDate);
      const endDateStr = formatDate(endDate);
      
      const data = await appointmentService.getByDateRange(startDateStr, endDateStr);
      setAppointments(data);
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
      toast.error("Erro ao carregar agendamentos");
    } finally {
      setLoading(false);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
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

  const getAppointmentsForDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return appointments.filter((a) => a.date === dateStr);
  };

  const isHoliday = (day: number): boolean => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return holidays.includes(dateStr);
  };

  const handleCreateAppointment = (day?: number) => {
    if (day) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      setSelectedDate(dateStr);
    } else {
      setSelectedDate("");
    }
    setSelectedAppointment(null);
    setOpenModal(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setOpenModal(true);
    handleCloseMenu();
  };

  const handleSaveAppointment = () => {
    loadAppointments();
    setOpenModal(false);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, appointment: Appointment) => {
    event.stopPropagation();
    setAppointmentMenuAnchor(event.currentTarget);
    setMenuAppointment(appointment);
  };

  const handleCloseMenu = () => {
    setAppointmentMenuAnchor(null);
    setMenuAppointment(null);
  };

  const handleConfirmAppointment = async () => {
    if (!menuAppointment) return;
    
    try {
      await appointmentService.update(menuAppointment.id!, { status: "Confirmado" });
      toast.success("Agendamento confirmado!");
      loadAppointments();
      handleCloseMenu();
    } catch (error) {
      toast.error("Erro ao confirmar agendamento");
    }
  };

  const handleOpenCancelDialog = () => {
    setCancelDialogOpen(true);
    handleCloseMenu();
  };

  const handleCancelAppointment = async () => {
    if (!menuAppointment || !cancelReason.trim()) {
      toast.error("Digite o motivo do cancelamento");
      return;
    }

    try {
      await appointmentService.cancel(menuAppointment.id!, cancelReason);
      toast.success("Agendamento cancelado!");
      setCancelDialogOpen(false);
      setCancelReason("");
      setMenuAppointment(null);
      loadAppointments();
    } catch (error) {
      toast.error("Erro ao cancelar agendamento");
    }
  };

  const handleDeleteAppointment = async () => {
    if (!menuAppointment) return;
    
    if (!window.confirm("Tem certeza que deseja excluir este agendamento?")) {
      return;
    }

    try {
      await appointmentService.delete(menuAppointment.id!);
      toast.success("Agendamento excluído!");
      loadAppointments();
      handleCloseMenu();
    } catch (error) {
      toast.error("Erro ao excluir agendamento");
    }
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const weeks = getCalendarMatrix();

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          📅 Agenda
        </Typography>
        <Box display="flex" gap={2}>
          <Button variant="outlined" startIcon={<Today />} onClick={goToToday}>
            Hoje
          </Button>
          <Button variant="contained" startIcon={<Add />} onClick={() => handleCreateAppointment()}>
            Novo Agendamento
          </Button>
        </Box>
      </Box>

      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <IconButton onClick={prevMonth} size="large">
              <ChevronLeft />
            </IconButton>
            <Typography variant="h5" fontWeight="bold">
              {months[currentMonth]} {currentYear}
            </Typography>
            <IconButton onClick={nextMonth} size="large">
              <ChevronRight />
            </IconButton>
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" py={8}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1} mb={1}>
                {weekDays.map((day) => (
                  <Box key={day} textAlign="center">
                    <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
                      {day}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
                {weeks.map((week, weekIndex) =>
                  week.map((day, dayIndex) => {
                    if (!day) {
                      return <Box key={`empty-${weekIndex}-${dayIndex}`} sx={{ minHeight: 100 }} />;
                    }

                    const dayAppointments = getAppointmentsForDay(day);
                    const isDayToday = isToday(day);
                    const isDayHoliday = isHoliday(day);

                    return (
                      <Tooltip
                        key={`${weekIndex}-${dayIndex}`}
                        title={isDayHoliday ? "Feriado" : ""}
                      >
                        <Box
                          onClick={() => handleCreateAppointment(day)}
                          sx={{
                            minHeight: 100,
                            p: 1,
                            border: 1,
                            borderColor: isDayToday ? "primary.main" : isDayHoliday ? "error.main" : "divider",
                            borderWidth: isDayToday ? 2 : 1,
                            borderRadius: 1,
                            cursor: "pointer",
                            bgcolor: isDayToday 
                              ? "primary.light" 
                              : isDayHoliday 
                              ? "error.light" 
                              : "background.paper",
                            "&:hover": {
                              bgcolor: isDayToday ? "primary.main" : isDayHoliday ? "error.main" : "action.hover",
                            },
                          }}
                        >
                          <Badge badgeContent={dayAppointments.length} color="primary">
                            <Typography
                              variant="body2"
                              fontWeight={isDayToday ? "bold" : "normal"}
                              color={isDayToday || isDayHoliday ? "primary.contrastText" : "text.primary"}
                            >
                              {day}
                            </Typography>
                          </Badge>

                          <Box mt={0.5}>
                            {dayAppointments.slice(0, 2).map((appointment) => (
                              <Tooltip 
                                key={appointment.id}
                                title={`${appointment.startTime} - ${appointment.endTime} | ${appointment.patientName} | ${appointment.professionalName}`}
                              >
                                <Chip
                                  size="small"
                                  label={`${appointment.startTime} ${appointment.patientName?.split(" ")[0]}`}
                                  color={appointmentService.getStatusColor(appointment.status)}
                                  sx={{
                                    fontSize: "0.65rem",
                                    height: 20,
                                    mb: 0.5,
                                    width: "100%",
                                    "& .MuiChip-label": {
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                    },
                                  }}
                                  onClick={(e) => handleOpenMenu(e, appointment)}
                                />
                              </Tooltip>
                            ))}
                            {dayAppointments.length > 2 && (
                              <Typography variant="caption" color="text.secondary">
                                +{dayAppointments.length - 2} mais
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Tooltip>
                    );
                  })
                )}
              </Box>
            </>
          )}
        </CardContent>
      </Card>

      <AppointmentModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveAppointment}
        appointment={selectedAppointment}
        preSelectedDate={selectedDate}
      />

      <Menu
        anchorEl={appointmentMenuAnchor}
        open={Boolean(appointmentMenuAnchor)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => menuAppointment && handleEditAppointment(menuAppointment)}>
          <Edit fontSize="small" sx={{ mr: 1 }} />
          Editar
        </MenuItem>
        {menuAppointment?.status === "Agendado" && (
          <MenuItem onClick={handleConfirmAppointment}>
            <CheckCircle fontSize="small" sx={{ mr: 1 }} />
            Confirmar
          </MenuItem>
        )}
        {menuAppointment?.status !== "Cancelado" && (
          <MenuItem onClick={handleOpenCancelDialog}>
            <Cancel fontSize="small" sx={{ mr: 1 }} />
            Cancelar
          </MenuItem>
        )}
        <MenuItem onClick={handleDeleteAppointment}>
          <Delete fontSize="small" sx={{ mr: 1 }} />
          Excluir
        </MenuItem>
      </Menu>

      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Cancelar Agendamento</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <TextField
              fullWidth
              label="Motivo do cancelamento *"
              multiline
              rows={3}
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Digite o motivo do cancelamento..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>
            Voltar
          </Button>
          <Button onClick={handleCancelAppointment} variant="contained" color="error">
            Cancelar Agendamento
          </Button>
        </DialogActions>
      </Dialog>

      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        onClick={() => handleCreateAppointment()}
      >
        <Add />
      </Fab>
    </Box>
  );
}