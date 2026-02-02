import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  CircularProgress,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { toast } from "react-toastify";
import appointmentService, { 
  Appointment, 
  AppointmentType, 
  AppointmentStatus,
  CreateAppointmentDto 
} from "../services/appointmentService";
import patientService from "../services/patientService";
import userService from "../services/userService";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

interface AppointmentModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  appointment?: Appointment | null;
  preSelectedPatientId?: string;
  preSelectedDate?: string;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  open,
  onClose,
  onSave,
  appointment,
  preSelectedPatientId,
  preSelectedDate,
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [loadingProfessionals, setLoadingProfessionals] = useState(false);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  
  const [patients, setPatients] = useState<any[]>([]);
  const [professionals, setProfessionals] = useState<any[]>([]);
  
  // Form fields
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<any | null>(null);
  const [type, setType] = useState<AppointmentType>("Consulta");
  const [specialty, setSpecialty] = useState<string>("");
  const [status, setStatus] = useState<AppointmentStatus>("Agendado");
  const [date, setDate] = useState<Dayjs | null>(preSelectedDate ? dayjs(preSelectedDate) : dayjs());
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs().hour(9).minute(0));
  const [duration, setDuration] = useState<number>(60);
  const [notes, setNotes] = useState<string>("");
  const [availabilityMessage, setAvailabilityMessage] = useState<string>("");

  useEffect(() => {
    if (open) {
      loadPatients();
      loadProfessionals();
      if (appointment) {
        loadAppointmentData();
      } else {
        resetForm();
        if (preSelectedPatientId) {
          loadPreSelectedPatient();
        }
        if (preSelectedDate) {
          setDate(dayjs(preSelectedDate));
        }
      }
    }
  }, [open, appointment, preSelectedPatientId, preSelectedDate]);

  // Verificar disponibilidade quando mudar profissional, data ou hora
  useEffect(() => {
    if (selectedProfessional && date && startTime && open) {
      checkAvailability();
    }
  }, [selectedProfessional, date, startTime, duration]);

  const loadPatients = async () => {
    try {
      setLoadingPatients(true);
      const data = await patientService.getAllPatients();
      setPatients(data.filter(p => p.active));
    } catch (error) {
      console.error("Erro ao carregar pacientes:", error);
      toast.error("Erro ao carregar lista de pacientes");
    } finally {
      setLoadingPatients(false);
    }
  };

  const loadProfessionals = async () => {
    try {
      setLoadingProfessionals(true);
      const data = await userService.getAll();
      
      // Filtrar apenas profissionais de saúde
      const healthProfessionals = data.filter(user => 
        user.active && 
        user.role && 
        ['SocialWorker', 'Nutritionist', 'Psychologist', 'Physiotherapist', 'Administrator'].includes(user.role)
      );
      
      setProfessionals(healthProfessionals);
    } catch (error) {
      console.error("Erro ao carregar profissionais:", error);
      toast.error("Erro ao carregar lista de profissionais");
    } finally {
      setLoadingProfessionals(false);
    }
  };

  const loadPreSelectedPatient = async () => {
    if (!preSelectedPatientId) return;
    try {
      const patient = await patientService.getById(preSelectedPatientId);
      setSelectedPatient(patient);
    } catch (error) {
      console.error("Erro ao carregar paciente:", error);
    }
  };

  const loadAppointmentData = () => {
    if (!appointment) return;
    
    const patient = patients.find(p => p.id === appointment.patientId);
    const professional = professionals.find(p => p.id === appointment.professionalId);
    
    setSelectedPatient(patient || null);
    setSelectedProfessional(professional || null);
    setType(appointment.type);
    setSpecialty(appointment.specialty || "");
    setStatus(appointment.status);
    setDate(dayjs(appointment.date));
    setStartTime(dayjs(`2000-01-01T${appointment.startTime}`));
    setDuration(appointment.duration || 60);
    setNotes(appointment.notes || "");
  };

  const resetForm = () => {
    setSelectedPatient(null);
    setSelectedProfessional(null);
    setType("Consulta");
    setSpecialty("");
    setStatus("Agendado");
    setDate(preSelectedDate ? dayjs(preSelectedDate) : dayjs());
    setStartTime(dayjs().hour(9).minute(0));
    setDuration(60);
    setNotes("");
    setAvailabilityMessage("");
  };

  const checkAvailability = async () => {
    if (!selectedProfessional || !date || !startTime) return;

    try {
      setCheckingAvailability(true);
      setAvailabilityMessage("");

      const endTime = appointmentService.calculateEndTime(
        startTime.format("HH:mm"),
        duration
      );

      const isAvailable = await appointmentService.checkAvailability(
        selectedProfessional.id,
        date.format("YYYY-MM-DD"),
        startTime.format("HH:mm"),
        endTime
      );

      if (!isAvailable) {
        setAvailabilityMessage("⚠️ Horário não disponível para este profissional");
      } else {
        setAvailabilityMessage("✅ Horário disponível");
      }
    } catch (error) {
      console.error("Erro ao verificar disponibilidade:", error);
    } finally {
      setCheckingAvailability(false);
    }
  };

  const handleSubmit = async () => {
    // Validações
    if (!selectedPatient) {
      toast.error("Selecione um paciente");
      return;
    }
    if (!selectedProfessional) {
      toast.error("Selecione um profissional");
      return;
    }
    if (!date) {
      toast.error("Selecione uma data");
      return;
    }
    if (!startTime) {
      toast.error("Selecione um horário");
      return;
    }

    try {
      setLoading(true);

      const endTime = appointmentService.calculateEndTime(
        startTime.format("HH:mm"),
        duration
      );

      if (appointment?.id) {
        // Atualizar
        await appointmentService.update(appointment.id, {
          date: date.format("YYYY-MM-DD"),
          startTime: startTime.format("HH:mm"),
          endTime: endTime,
          duration: duration,
          type: type,
          specialty: specialty || undefined,
          status: status,
          notes: notes || undefined,
        });
        toast.success("Agendamento atualizado com sucesso!");
      } else {
        // Criar
        const appointmentData: CreateAppointmentDto = {
          patientId: selectedPatient.id!,
          patientName: selectedPatient.name,
          professionalId: selectedProfessional.id!,
          professionalName: selectedProfessional.name,
          date: date.format("YYYY-MM-DD"),
          startTime: startTime.format("HH:mm"),
          endTime: endTime,
          duration: duration,
          type: type,
          specialty: specialty || undefined,
          notes: notes || undefined,
        };

        await appointmentService.create(appointmentData);
        toast.success("Agendamento criado com sucesso!");
      }

      onSave();
      handleClose();
    } catch (error: any) {
      console.error("Erro ao salvar agendamento:", error);
      
      if (error.response?.status === 409) {
        toast.error("Horário não disponível para este profissional");
      } else {
        toast.error(error.response?.data?.detail || "Erro ao salvar agendamento");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const appointmentTypes: AppointmentType[] = [
    "Consulta",
    "Retorno",
    "Avaliação",
    "Sessão",
    "Emergência",
    "Outros",
  ];

  const appointmentStatuses: AppointmentStatus[] = [
    "Agendado",
    "Confirmado",
    "EmAtendimento",
    "Concluído",
    "Cancelado",
    "Faltou",
  ];

  const specialties = [
    "Nutrição",
    "Psicologia",
    "Fisioterapia",
    "Assistência Social",
    "Outros",
  ];

  const durations = [30, 45, 60, 90, 120];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {appointment ? "Editar Agendamento" : "Novo Agendamento"}
      </DialogTitle>

      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <Box mt={2}>
            <Grid container spacing={3}>
              {/* Paciente */}
              <Grid item xs={12}>
                <Autocomplete
                  value={selectedPatient}
                  onChange={(_, newValue) => setSelectedPatient(newValue)}
                  options={patients}
                  getOptionLabel={(option) => `${option.name} - ${option.cpf || 'Sem CPF'}`}
                  loading={loadingPatients}
                  disabled={!!preSelectedPatientId || loading}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Paciente *"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loadingPatients && <CircularProgress size={20} />}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Profissional */}
              <Grid item xs={12}>
                <Autocomplete
                  value={selectedProfessional}
                  onChange={(_, newValue) => setSelectedProfessional(newValue)}
                  options={professionals}
                  getOptionLabel={(option) => `${option.name} - ${option.role || 'Sem função'}`}
                  loading={loadingProfessionals}
                  disabled={loading}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Profissional *"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loadingProfessionals && <CircularProgress size={20} />}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Tipo e Especialidade */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Tipo *</InputLabel>
                  <Select 
                    value={type} 
                    onChange={(e) => setType(e.target.value as AppointmentType)} 
                    label="Tipo *"
                    disabled={loading}
                  >
                    {appointmentTypes.map((t) => (
                      <MenuItem key={t} value={t}>
                        {t}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Especialidade</InputLabel>
                  <Select 
                    value={specialty} 
                    onChange={(e) => setSpecialty(e.target.value)} 
                    label="Especialidade"
                    disabled={loading}
                  >
                    <MenuItem value="">
                      <em>Nenhuma</em>
                    </MenuItem>
                    {specialties.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Data e Hora */}
              <Grid item xs={12} md={4}>
                <DatePicker
                  label="Data *"
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  disabled={loading}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TimePicker
                  label="Horário Início *"
                  value={startTime}
                  onChange={(newValue) => setStartTime(newValue)}
                  ampm={false}
                  disabled={loading}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Duração</InputLabel>
                  <Select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    label="Duração"
                    disabled={loading}
                  >
                    {durations.map((d) => (
                      <MenuItem key={d} value={d}>
                        {d} minutos
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Mensagem de Disponibilidade */}
              {availabilityMessage && (
                <Grid item xs={12}>
                  <Alert 
                    severity={availabilityMessage.includes("✅") ? "success" : "warning"}
                    icon={checkingAvailability ? <CircularProgress size={20} /> : undefined}
                  >
                    {checkingAvailability ? "Verificando disponibilidade..." : availabilityMessage}
                  </Alert>
                </Grid>
              )}

              {/* Status (apenas ao editar) */}
              {appointment && (
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Status *</InputLabel>
                    <Select 
                      value={status} 
                      onChange={(e) => setStatus(e.target.value as AppointmentStatus)} 
                      label="Status *"
                      disabled={loading}
                    >
                      {appointmentStatuses.map((s) => (
                        <MenuItem key={s} value={s}>
                          {s}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}

              {/* Observações */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Observações"
                  multiline
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={loading}
                />
              </Grid>
            </Grid>
          </Box>
        </LocalizationProvider>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading || (availabilityMessage.includes("⚠️") && !appointment)}
        >
          {loading ? <CircularProgress size={24} /> : appointment ? "Salvar" : "Criar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentModal;