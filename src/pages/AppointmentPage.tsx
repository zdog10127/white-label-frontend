import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
  Paper,
  Tooltip,
  Menu,
  MenuItem,
  Fab,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  Add,
  FilterList,
  Today,
  MoreVert,
  CheckCircle,
  Cancel,
  EventAvailable,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import appointmentService, { Appointment, AppointmentStatus } from "../services/appointmentService";
import AppointmentModal from "../components/AppointmentModal";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function AgendaPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<AppointmentStatus | "all">("all");
  const [appointmentMenuAnchorEl, setAppointmentMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [appointmentForMenu, setAppointmentForMenu] = useState<Appointment | null>(null);

  useEffect(() => {
    loadAppointments();
  }, [currentDate]);

  useEffect(() => {
    applyFilter();
  }, [appointments, selectedFilter]);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      
      const data = await appointmentService.getByDateRange(
        format(start, "yyyy-MM-dd"),
        format(end, "yyyy-MM-dd")
      );
      
      setAppointments(data);
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
      toast.error("Erro ao carregar agendamentos");
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = () => {
    if (selectedFilter === "all") {
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments(appointments.filter(a => a.status === selectedFilter));
    }
  };

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleCreateAppointment = (date?: Date) => {
    setSelectedDate(date || null);
    setSelectedAppointment(null);
    setOpenModal(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setOpenModal(true);
    handleCloseAppointmentMenu();
  };

  const handleSaveAppointment = () => {
    loadAppointments();
    setOpenModal(false);
  };

  const handleConfirmAppointment = async (appointment: Appointment) => {
    try {
      await appointmentService.update(appointment.id!, { status: "Confirmado" });
      toast.success("Agendamento confirmado!");
      loadAppointments();
      handleCloseAppointmentMenu();
    } catch (error) {
      toast.error("Erro ao confirmar agendamento");
    }
  };

  const handleCancelAppointment = async (appointment: Appointment) => {
    const reason = prompt("Motivo do cancelamento:");
    if (!reason) return;

    try {
      await appointmentService.cancel(appointment.id!, reason);
      toast.success("Agendamento cancelado!");
      loadAppointments();
      handleCloseAppointmentMenu();
    } catch (error) {
      toast.error("Erro ao cancelar agendamento");
    }
  };

  const handleDeleteAppointment = async (appointment: Appointment) => {
    if (!confirm("Tem certeza que deseja excluir este agendamento?")) return;

    try {
      await appointmentService.delete(appointment.id!);
      toast.success("Agendamento excluído!");
      loadAppointments();
      handleCloseAppointmentMenu();
    } catch (error) {
      toast.error("Erro ao excluir agendamento");
    }
  };

  const handleOpenAppointmentMenu = (event: React.MouseEvent<HTMLElement>, appointment: Appointment) => {
    setAppointmentMenuAnchorEl(event.currentTarget);
    setAppointmentForMenu(appointment);
  };

  const handleCloseAppointmentMenu = () => {
    setAppointmentMenuAnchorEl(null);
    setAppointmentForMenu(null);
  };

  const getAppointmentsForDate = (date: Date) => {
    return filteredAppointments.filter(appointment => 
      isSameDay(new Date(appointment.date), date)
    );
  };

  const getStatusColor = (status: AppointmentStatus) => {
    return appointmentService.getStatusColor(status);
  };

  const renderCalendarDays = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });

    // Adicionar dias do mês anterior para preencher semana
    const firstDayOfWeek = start.getDay();
    const previousMonthDays = [];
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(start);
      date.setDate(date.getDate() - (i + 1));
      previousMonthDays.push(date);
    }

    const allDays = [...previousMonthDays, ...days];

    return (
      <Grid container spacing={1}>
        {/* Cabeçalho dos dias da semana */}
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
          <Grid item xs={12 / 7} key={day}>
            <Typography variant="subtitle2" align="center" fontWeight="bold" color="text.secondary">
              {day}
            </Typography>
          </Grid>
        ))}

        {/* Dias do calendário */}
        {allDays.map((date, index) => {
          const dayAppointments = getAppointmentsForDate(date);
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          const isCurrentDay = isToday(date);

          return (
            <Grid item xs={12 / 7} key={index}>
              <Paper
                elevation={isCurrentDay ? 4 : 1}
                sx={{
                  minHeight: 120,
                  p: 1,
                  cursor: "pointer",
                  bgcolor: isCurrentDay ? "primary.light" : isCurrentMonth ? "background.paper" : "action.hover",
                  opacity: isCurrentMonth ? 1 : 0.5,
                  "&:hover": {
                    bgcolor: isCurrentDay ? "primary.main" : "action.hover",
                  },
                }}
                onClick={() => handleCreateAppointment(date)}
              >
                <Typography 
                  variant="body2" 
                  fontWeight={isCurrentDay ? "bold" : "normal"}
                  color={isCurrentDay ? "primary.contrastText" : "text.primary"}
                >
                  {format(date, "d")}
                </Typography>

                <Box mt={0.5}>
                  {dayAppointments.slice(0, 3).map((appointment, idx) => (
                    <Tooltip 
                      key={appointment.id} 
                      title={`${appointment.startTime} - ${appointment.patientName} (${appointment.professionalName})`}
                    >
                      <Chip
                        size="small"
                        label={`${appointment.startTime} ${appointment.patientName?.split(' ')[0]}`}
                        color={getStatusColor(appointment.status)}
                        sx={{ 
                          fontSize: "0.65rem", 
                          height: 20, 
                          mb: 0.5,
                          width: "100%",
                          "& .MuiChip-label": {
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenAppointmentMenu(e, appointment);
                        }}
                      />
                    </Tooltip>
                  ))}
                  {dayAppointments.length > 3 && (
                    <Typography variant="caption" color="text.secondary">
                      +{dayAppointments.length - 3} mais
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  const renderTodayAppointments = () => {
    const todayAppointments = filteredAppointments
      .filter(a => isToday(new Date(a.date)))
      .sort((a, b) => a.startTime.localeCompare(b.startTime));

    if (todayAppointments.length === 0) {
      return (
        <Alert severity="info">
          Nenhum agendamento para hoje
        </Alert>
      );
    }

    return (
      <Box>
        {todayAppointments.map((appointment) => (
          <Card key={appointment.id} sx={{ mb: 2 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h6">
                    {appointment.startTime} - {appointment.endTime}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {appointment.patientName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {appointment.professionalName} • {appointment.specialty || appointment.type}
                  </Typography>
                  {appointment.notes && (
                    <Typography variant="caption" display="block" mt={1}>
                      Obs: {appointment.notes}
                    </Typography>
                  )}
                </Box>
                <Box display="flex" gap={1} alignItems="center">
                  <Chip 
                    label={appointment.status} 
                    color={getStatusColor(appointment.status)}
                    size="small"
                  />
                  <IconButton 
                    size="small"
                    onClick={(e) => handleOpenAppointmentMenu(e, appointment)}
                  >
                    <MoreVert />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  };

  const filterOptions = [
    { value: "all", label: "Todos", count: appointments.length },
    { value: "Agendado", label: "Agendado", count: appointments.filter(a => a.status === "Agendado").length },
    { value: "Confirmado", label: "Confirmado", count: appointments.filter(a => a.status === "Confirmado").length },
    { value: "Concluído", label: "Concluído", count: appointments.filter(a => a.status === "Concluído").length },
  ];

  return (
    <Box p={3}>
      {/* Cabeçalho */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          📅 Agenda
        </Typography>

        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={(e) => setFilterAnchorEl(e.currentTarget)}
          >
            Filtrar ({selectedFilter === "all" ? "Todos" : selectedFilter})
          </Button>
          <Button
            variant="outlined"
            startIcon={<Today />}
            onClick={handleToday}
          >
            Hoje
          </Button>
        </Box>
      </Box>

      {/* Filtros */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={() => setFilterAnchorEl(null)}
      >
        {filterOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => {
              setSelectedFilter(option.value as any);
              setFilterAnchorEl(null);
            }}
            selected={selectedFilter === option.value}
          >
            {option.label} ({option.count})
          </MenuItem>
        ))}
      </Menu>

      <Grid container spacing={3}>
        {/* Calendário */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              {/* Navegação do mês */}
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <IconButton onClick={handlePreviousMonth}>
                  <ChevronLeft />
                </IconButton>
                <Typography variant="h5" fontWeight="bold">
                  {format(currentDate, "MMMM 'de' yyyy", { locale: ptBR })}
                </Typography>
                <IconButton onClick={handleNextMonth}>
                  <ChevronRight />
                </IconButton>
              </Box>

              {/* Calendário */}
              {loading ? (
                <Box display="flex" justifyContent="center" p={4}>
                  <CircularProgress />
                </Box>
              ) : (
                renderCalendarDays()
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Agendamentos de Hoje */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Agendamentos de Hoje
              </Typography>
              {loading ? (
                <Box display="flex" justifyContent="center" p={2}>
                  <CircularProgress />
                </Box>
              ) : (
                renderTodayAppointments()
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* FAB para criar agendamento */}
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        onClick={() => handleCreateAppointment()}
      >
        <Add />
      </Fab>

      {/* Modal de Agendamento */}
      <AppointmentModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveAppointment}
        appointment={selectedAppointment}
        preSelectedDate={selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined}
      />

      {/* Menu de Ações do Agendamento */}
      <Menu
        anchorEl={appointmentMenuAnchorEl}
        open={Boolean(appointmentMenuAnchorEl)}
        onClose={handleCloseAppointmentMenu}
      >
        <MenuItem onClick={() => appointmentForMenu && handleEditAppointment(appointmentForMenu)}>
          Editar
        </MenuItem>
        {appointmentForMenu?.status === "Agendado" && (
          <MenuItem onClick={() => appointmentForMenu && handleConfirmAppointment(appointmentForMenu)}>
            <CheckCircle fontSize="small" sx={{ mr: 1 }} />
            Confirmar
          </MenuItem>
        )}
        {appointmentForMenu?.status !== "Cancelado" && (
          <MenuItem onClick={() => appointmentForMenu && handleCancelAppointment(appointmentForMenu)}>
            <Cancel fontSize="small" sx={{ mr: 1 }} />
            Cancelar
          </MenuItem>
        )}
        <MenuItem onClick={() => appointmentForMenu && handleDeleteAppointment(appointmentForMenu)}>
          Excluir
        </MenuItem>
      </Menu>
    </Box>
  );
}