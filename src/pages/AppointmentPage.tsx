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
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
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
  Edit,
  Delete,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import appointmentService, { Appointment, AppointmentStatus } from "../services/appointmentService";
import AppointmentModal from "../components/AppointmentModal";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";

// Função para calcular a Páscoa usando o Algoritmo de Meeus
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

// Feriados nacionais do Brasil
const getBrazilianHolidays = (year: number): Date[] => {
  const holidays: Date[] = [
    // Feriados Nacionais Fixos
    new Date(year, 0, 1),   // Ano Novo
    new Date(year, 3, 21),  // Tiradentes
    new Date(year, 4, 1),   // Dia do Trabalho
    new Date(year, 8, 7),   // Independência do Brasil
    new Date(year, 9, 12),  // Nossa Senhora Aparecida
    new Date(year, 10, 2),  // Finados
    new Date(year, 10, 15), // Proclamação da República
    new Date(year, 10, 20), // Dia da Consciência Negra (feriado nacional desde 2024)
    new Date(year, 11, 25), // Natal
    
    // Feriados Estaduais - Minas Gerais
    new Date(year, 3, 21),  // Tiradentes (também é estadual em MG, mas já está acima)
    
    // Feriados Municipais - Araxá/MG
    new Date(year, 7, 16),  // Aniversário de Araxá (16 de agosto)
  ];

  const easter = getEasterDate(year);
  
  // Feriados Móveis (baseados na Páscoa)
  
  // Carnaval (47 dias antes da Páscoa) - Terça-feira
  const carnival = new Date(easter);
  carnival.setDate(carnival.getDate() - 47);
  
  // Segunda-feira de Carnaval (48 dias antes da Páscoa)
  const carnivalMonday = new Date(easter);
  carnivalMonday.setDate(carnivalMonday.getDate() - 48);
  
  // Quarta-feira de Cinzas (46 dias antes da Páscoa) - Ponto facultativo até 14h
  const ashWednesday = new Date(easter);
  ashWednesday.setDate(ashWednesday.getDate() - 46);
  
  // Sexta-feira Santa (2 dias antes da Páscoa)
  const goodFriday = new Date(easter);
  goodFriday.setDate(goodFriday.getDate() - 2);
  
  // Páscoa (domingo)
  const easterSunday = new Date(easter);
  
  // Corpus Christi (60 dias após a Páscoa) - Quinta-feira
  const corpusChristi = new Date(easter);
  corpusChristi.setDate(corpusChristi.getDate() + 60);

  holidays.push(
    carnivalMonday,
    carnival,
    ashWednesday,
    goodFriday,
    easterSunday,
    corpusChristi
  );

  return holidays;
};

// Obter nome do feriado
const getHolidayName = (date: Date, year: number): string => {
  const month = date.getMonth();
  const day = date.getDate();
  
  // Feriados fixos
  if (month === 0 && day === 1) return "🎆 Ano Novo";
  if (month === 3 && day === 21) return "🇧🇷 Tiradentes";
  if (month === 4 && day === 1) return "👷 Dia do Trabalho";
  if (month === 7 && day === 16) return "🎂 Aniversário de Araxá";
  if (month === 8 && day === 7) return "🇧🇷 Independência do Brasil";
  if (month === 9 && day === 12) return "🙏 Nossa Senhora Aparecida";
  if (month === 10 && day === 2) return "🕯️ Finados";
  if (month === 10 && day === 15) return "🇧🇷 Proclamação da República";
  if (month === 10 && day === 20) return "✊🏿 Dia da Consciência Negra";
  if (month === 11 && day === 25) return "🎄 Natal";
  
  // Feriados móveis
  const easter = getEasterDate(year);
  
  const carnivalMonday = new Date(easter);
  carnivalMonday.setDate(carnivalMonday.getDate() - 48);
  
  const carnival = new Date(easter);
  carnival.setDate(carnival.getDate() - 47);
  
  const ashWednesday = new Date(easter);
  ashWednesday.setDate(ashWednesday.getDate() - 46);
  
  const goodFriday = new Date(easter);
  goodFriday.setDate(goodFriday.getDate() - 2);
  
  const corpusChristi = new Date(easter);
  corpusChristi.setDate(corpusChristi.getDate() + 60);
  
  if (isSameDay(date, carnivalMonday)) return "🎭 Segunda-feira de Carnaval";
  if (isSameDay(date, carnival)) return "🎭 Carnaval";
  if (isSameDay(date, ashWednesday)) return "⛪ Quarta-feira de Cinzas";
  if (isSameDay(date, goodFriday)) return "✝️ Sexta-feira Santa";
  if (isSameDay(date, easter)) return "🐰 Páscoa";
  if (isSameDay(date, corpusChristi)) return "✝️ Corpus Christi";
  
  return "🎉 Feriado";
};

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
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [appointmentToCancel, setAppointmentToCancel] = useState<Appointment | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<Appointment | null>(null);

  // Feriados do ano atual
  const holidays = getBrazilianHolidays(currentDate.getFullYear());

  // Função para verificar se é feriado
  const isHoliday = (date: Date): boolean => {
    return holidays.some(holiday => isSameDay(holiday, date));
  };

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

  const handleCancelAppointment = (appointment: Appointment) => {
    setAppointmentToCancel(appointment);
    setCancelDialogOpen(true);
    handleCloseAppointmentMenu();
  };

  const confirmCancelAppointment = async () => {
    console.log('🔍 Dados para cancelamento:', {
      appointmentToCancel: appointmentToCancel?.id,
      cancelReason: cancelReason,
      trim: cancelReason.trim()
    });
    
    if (!appointmentToCancel) {
      toast.error("Agendamento não encontrado");
      return;
    }
    
    if (!cancelReason || cancelReason.trim() === '') {
      toast.error("Digite o motivo do cancelamento");
      return;
    }

    try {
      console.log('📤 Enviando cancelamento...');
      await appointmentService.cancel(appointmentToCancel.id!, cancelReason.trim());
      toast.success("Agendamento cancelado!");
      setCancelDialogOpen(false);
      setCancelReason("");
      setAppointmentToCancel(null);
      loadAppointments();
    } catch (error: any) {
      console.error('❌ Erro ao cancelar:', error);
      toast.error(error.response?.data?.detail || "Erro ao cancelar agendamento");
    }
  };

  const handleDeleteAppointment = (appointment: Appointment) => {
    setAppointmentToDelete(appointment);
    setDeleteDialogOpen(true);
    handleCloseAppointmentMenu();
  };

  const confirmDeleteAppointment = async () => {
    if (!appointmentToDelete) return;

    try {
      await appointmentService.delete(appointmentToDelete.id!);
      toast.success("Agendamento excluído!");
      setDeleteDialogOpen(false);
      setAppointmentToDelete(null);
      loadAppointments();
    } catch (error: any) {
      console.error('❌ Erro ao excluir:', error);
      toast.error(error.response?.data?.detail || "Erro ao excluir agendamento");
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
          const isDayHoliday = isHoliday(date);

          return (
            <Grid item xs={12 / 7} key={index}>
              <Tooltip title={isDayHoliday ? getHolidayName(date, currentDate.getFullYear()) : ""}>
                <Paper
                  elevation={isCurrentDay ? 4 : 1}
                  sx={{
                    minHeight: 120,
                    p: 1,
                    cursor: "pointer",
                    bgcolor: isCurrentDay 
                      ? "primary.light" 
                      : isDayHoliday 
                        ? "error.light" 
                        : isCurrentMonth ? "background.paper" : "action.hover",
                    opacity: isCurrentMonth ? 1 : 0.5,
                    borderLeft: isDayHoliday ? 4 : 0,
                    borderColor: "error.main",
                    "&:hover": {
                      bgcolor: isCurrentDay ? "primary.main" : isDayHoliday ? "error.main" : "action.hover",
                    },
                  }}
                  onClick={() => handleCreateAppointment(date)}
                >
                  <Badge 
                    badgeContent={dayAppointments.length} 
                    color="primary"
                    invisible={dayAppointments.length === 0}
                  >
                    <Typography 
                      variant="body2" 
                      fontWeight={isCurrentDay ? "bold" : "normal"}
                      color={isCurrentDay || isDayHoliday ? "primary.contrastText" : "text.primary"}
                    >
                      {format(date, "d")}
                    </Typography>
                  </Badge>

                  <Box mt={0.5}>
                    {dayAppointments.slice(0, 3).map((appointment) => (
                      <Tooltip 
                        key={appointment.id} 
                        title={`${appointment.startTime} - ${appointment.endTime} | ${appointment.patientName} | ${appointment.professionalName}`}
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
              </Tooltip>
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
          <Edit fontSize="small" sx={{ mr: 1 }} />
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
          <Delete fontSize="small" sx={{ mr: 1 }} />
          Excluir
        </MenuItem>
      </Menu>

      {/* Dialog de Cancelamento */}
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
              autoFocus
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>
            Voltar
          </Button>
          <Button onClick={confirmCancelAppointment} variant="contained" color="error">
            Confirmar Cancelamento
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de Exclusão */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} maxWidth="sm">
        <DialogTitle>Excluir Agendamento</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir este agendamento?
          </Typography>
          {appointmentToDelete && (
            <Box mt={2}>
              <Typography variant="body2" color="text.secondary">
                <strong>Paciente:</strong> {appointmentToDelete.patientName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Data:</strong> {format(new Date(appointmentToDelete.date), "dd/MM/yyyy", { locale: ptBR })} às {appointmentToDelete.startTime}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Profissional:</strong> {appointmentToDelete.professionalName}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={confirmDeleteAppointment} variant="contained" color="error">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}