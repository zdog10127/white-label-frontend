import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Alert,
  Divider,
  IconButton,
  Tooltip,
  Paper,
} from "@mui/material";
import {
  People,
  EventAvailable,
  CalendarToday,
  Cake,
  Warning,
  Phone,
  CheckCircle,
  Cancel,
  Schedule,
  TrendingUp,
  PersonAdd,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import patientService, { Patient } from "../services/patientService";
import appointmentService, { Appointment } from "../services/appointmentService";
import { format, isToday, differenceInYears } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function DashboardHome(): JSX.Element {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [patientsData, appointmentsData] = await Promise.all([
        patientService.getAll(),
        appointmentService.getAll(),
      ]);
      setPatients(patientsData);
      setAppointments(appointmentsData);
    } catch (error: any) {
      console.error("Erro ao carregar dados:", error);
      toast.error("Erro ao carregar dados do dashboard");
    } finally {
      setLoading(false);
    }
  };

  // Aniversariantes do dia
  const getBirthdays = () => {
    const today = new Date();
    return patients
      .filter((p) => {
        if (!p.birthDate || !p.active) return false;
        const birthDate = new Date(p.birthDate);
        return (
          birthDate.getMonth() === today.getMonth() &&
          birthDate.getDate() === today.getDate()
        );
      })
      .map((p) => ({
        ...p,
        age: differenceInYears(today, new Date(p.birthDate!)),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  // Agendamentos de hoje
  const getTodayAppointments = () => {
    return appointments
      .filter((a) => isToday(new Date(a.date)))
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  // Estatísticas gerais
  const stats = {
    totalPatients: patients.length,
    activePatients: patients.filter((p) => p.active).length,
    inactivePatients: patients.filter((p) => !p.active).length,
    todayAppointments: getTodayAppointments().length,
    thisMonthAppointments: appointments.filter((a) => {
      const date = new Date(a.date);
      const today = new Date();
      return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    }).length,
  };

  // Cadastros incompletos
  const getIncompleteRegistrations = () => {
    return patients
      .filter((p) => p.active)
      .map((p) => {
        const missing: string[] = [];
        
        if (!p.cpf || !p.phone || !p.email) missing.push("Dados Básicos");
        if (!p.address || !p.address.street || !p.address.city) missing.push("Endereço");
        if (!p.cancer || !p.cancer.type) missing.push("Dados do Câncer");
        if (!p.medicalHistory) missing.push("Histórico Médico");
        if (!p.documents || (!p.documents.identity && !p.documents.cpfDoc && !p.documents.addressProof)) missing.push("Documentos");

        return {
          patient: p,
          missingCount: missing.length,
          missingFields: missing,
        };
      })
      .filter((item) => item.missingCount > 0)
      .sort((a, b) => b.missingCount - a.missingCount);
  };

  // Dados para gráfico de cadastros incompletos
  const getIncompleteChartData = () => {
    const incomplete = getIncompleteRegistrations();
    const categories = ["Dados Básicos", "Endereço", "Dados do Câncer", "Histórico Médico", "Documentos"];
    
    return categories.map((category) => ({
      name: category,
      value: incomplete.filter((item) => item.missingFields.includes(category)).length,
    }));
  };

  // Dados para gráfico de status de agendamentos
  const getAppointmentStatusData = () => {
    const statuses = ["Agendado", "Confirmado", "Concluído", "Cancelado", "Faltou"];
    return statuses.map((status) => ({
      name: status,
      value: appointments.filter((a) => a.status === status).length,
    }));
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  const birthdays = getBirthdays();
  const todayAppointments = getTodayAppointments();
  const incompleteRegistrations = getIncompleteRegistrations();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box p={3}>
      {/* Cabeçalho */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          📊 Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Bem-vindo! Aqui está um resumo do sistema.
        </Typography>
      </Box>

      {/* Cards de Estatísticas */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="text.secondary" variant="body2" gutterBottom>
                    Total de Pacientes
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.totalPatients}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
                  <People fontSize="large" />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="text.secondary" variant="body2" gutterBottom>
                    Pacientes Ativos
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="success.main">
                    {stats.activePatients}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: "success.main", width: 56, height: 56 }}>
                  <CheckCircle fontSize="large" />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="text.secondary" variant="body2" gutterBottom>
                    Agendamentos Hoje
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="info.main">
                    {stats.todayAppointments}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: "info.main", width: 56, height: 56 }}>
                  <CalendarToday fontSize="large" />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography color="text.secondary" variant="body2" gutterBottom>
                    Agendamentos do Mês
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="secondary.main">
                    {stats.thisMonthAppointments}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: "secondary.main", width: 56, height: 56 }}>
                  <EventAvailable fontSize="large" />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Aniversariantes do Dia */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Cake sx={{ mr: 1, color: "secondary.main" }} />
                <Typography variant="h6" fontWeight="bold">
                  🎂 Aniversariantes de Hoje
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />

              {birthdays.length === 0 ? (
                <Alert severity="info">Nenhum aniversariante hoje</Alert>
              ) : (
                <List>
                  {birthdays.map((patient) => (
                    <ListItem key={patient.id} divider>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "secondary.main" }}>
                          <Cake />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="body1" fontWeight="bold">
                              {patient.name}
                            </Typography>
                            <Chip
                              label={`${patient.age} anos`}
                              size="small"
                              color="secondary"
                            />
                          </Box>
                        }
                        secondary={
                          <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                            <Phone fontSize="small" />
                            <Typography variant="body2">{patient.phone || "Sem telefone"}</Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Agendamentos de Hoje */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <CalendarToday sx={{ mr: 1, color: "info.main" }} />
                <Typography variant="h6" fontWeight="bold">
                  📅 Agendamentos de Hoje
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />

              {todayAppointments.length === 0 ? (
                <Alert severity="info">Nenhum agendamento para hoje</Alert>
              ) : (
                <List sx={{ maxHeight: 400, overflow: "auto" }}>
                  {todayAppointments.map((appointment) => (
                    <ListItem key={appointment.id} divider>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: appointmentService.getStatusColor(appointment.status) }}>
                          <Schedule />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="body1" fontWeight="bold">
                              {appointment.startTime} - {appointment.patientName}
                            </Typography>
                            <Chip
                              label={appointment.status}
                              size="small"
                              color={appointmentService.getStatusColor(appointment.status)}
                            />
                          </Box>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            {appointment.professionalName} • {appointment.type}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Gráfico de Cadastros Incompletos */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Warning sx={{ mr: 1, color: "warning.main" }} />
                <Typography variant="h6" fontWeight="bold">
                  ⚠️ Cadastros Incompletos ({incompleteRegistrations.length})
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />

              {incompleteRegistrations.length === 0 ? (
                <Alert severity="success">Todos os cadastros estão completos! 🎉</Alert>
              ) : (
                <>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={getIncompleteChartData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} fontSize={12} />
                      <YAxis />
                      <RechartsTooltip />
                      <Bar dataKey="value" fill="#ff9800" />
                    </BarChart>
                  </ResponsiveContainer>

                  <Box mt={2}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Top 5 pacientes com mais campos faltando:
                    </Typography>
                    <List dense>
                      {incompleteRegistrations.slice(0, 5).map((item, index) => (
                        <ListItem key={item.patient.id}>
                          <ListItemText
                            primary={item.patient.name}
                            secondary={`${item.missingCount} campos faltando: ${item.missingFields.join(", ")}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Gráfico de Status de Agendamentos */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <TrendingUp sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6" fontWeight="bold">
                  📈 Status dos Agendamentos
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />

              {appointments.length === 0 ? (
                <Alert severity="info">Nenhum agendamento cadastrado</Alert>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getAppointmentStatusData()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {getAppointmentStatusData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}