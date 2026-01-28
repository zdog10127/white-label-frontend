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
  CircularProgress,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { toast } from "react-toastify";
import medicalReportService, { Evolution, VitalSigns } from "../services/medicalReportService";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

interface EvolutionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  patientId: string;
  evolution?: Evolution | null;
}

const EvolutionModal: React.FC<EvolutionModalProps> = ({
  open,
  onClose,
  onSave,
  patientId,
  evolution,
}) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [time, setTime] = useState("");
  const [type, setType] = useState<Evolution["type"]>("Sessão");
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [physicalExam, setPhysicalExam] = useState("");
  const [assessment, setAssessment] = useState("");
  const [conduct, setConduct] = useState("");
  const [prescriptions, setPrescriptions] = useState("");
  const [examsRequested, setExamsRequested] = useState("");
  const [treatmentEvolution, setTreatmentEvolution] = useState("");
  const [sideEffects, setSideEffects] = useState("");
  const [adherence, setAdherence] = useState<Evolution["adherence"] | "">("");
  const [notes, setNotes] = useState("");
  const [nextAppointment, setNextAppointment] = useState<Dayjs | null>(null);
  const [attendedBy, setAttendedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [temperature, setTemperature] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [oxygenSaturation, setOxygenSaturation] = useState("");

  useEffect(() => {
    if (open) {
      if (evolution) {
        loadEvolutionData();
      } else {
        resetForm();
      }
    }
  }, [open, evolution]);

  const loadEvolutionData = () => {
    if (!evolution) return;

    setDate(dayjs(evolution.date));
    setTime(evolution.time || "");
    setType(evolution.type);
    setChiefComplaint(evolution.chiefComplaint || "");
    setSymptoms(evolution.symptoms || "");
    setPhysicalExam(evolution.physicalExam || "");
    setAssessment(evolution.assessment || "");
    setConduct(evolution.conduct || "");
    setPrescriptions(evolution.prescriptions || "");
    setExamsRequested(evolution.examsRequested || "");
    setTreatmentEvolution(evolution.treatmentEvolution || "");
    setSideEffects(evolution.sideEffects || "");
    setAdherence(evolution.adherence || "");
    setNotes(evolution.notes || "");
    setNextAppointment(evolution.nextAppointment ? dayjs(evolution.nextAppointment) : null);
    setAttendedBy(evolution.attendedBy || "");
    setDuration(evolution.duration?.toString() || "");
    setBloodPressure(evolution.vitalSigns?.bloodPressure || "");
    setHeartRate(evolution.vitalSigns?.heartRate?.toString() || "");
    setTemperature(evolution.vitalSigns?.temperature?.toString() || "");
    setWeight(evolution.vitalSigns?.weight?.toString() || "");
    setHeight(evolution.vitalSigns?.height?.toString() || "");
    setOxygenSaturation(evolution.vitalSigns?.oxygenSaturation?.toString() || "");
  };

  const resetForm = () => {
    setDate(dayjs());
    setTime(dayjs().format("HH:mm"));
    setType("Sessão");
    setChiefComplaint("");
    setSymptoms("");
    setPhysicalExam("");
    setAssessment("");
    setConduct("");
    setPrescriptions("");
    setExamsRequested("");
    setTreatmentEvolution("");
    setSideEffects("");
    setAdherence("");
    setNotes("");
    setNextAppointment(null);
    setAttendedBy("");
    setDuration("45");
    setBloodPressure("");
    setHeartRate("");
    setTemperature("");
    setWeight("");
    setHeight("");
    setOxygenSaturation("");
  };

  const handleSubmit = async () => {
    if (!date) {
      toast.error("Selecione uma data");
      return;
    }

    try {
      setLoading(true);

      const vitalSigns: VitalSigns = {
        bloodPressure: bloodPressure.trim() || undefined,
        heartRate: heartRate ? parseInt(heartRate) : undefined,
        temperature: temperature ? parseFloat(temperature) : undefined,
        weight: weight ? parseFloat(weight) : undefined,
        height: height ? parseFloat(height) : undefined,
        oxygenSaturation: oxygenSaturation ? parseInt(oxygenSaturation) : undefined,
      };

      const evolutionData: Evolution = {
        patientId,
        date: date.format("YYYY-MM-DD"),
        time: time.trim() || undefined,
        type,
        chiefComplaint: chiefComplaint.trim() || undefined,
        symptoms: symptoms.trim() || undefined,
        vitalSigns: Object.values(vitalSigns).some(v => v !== undefined) ? vitalSigns : undefined,
        physicalExam: physicalExam.trim() || undefined,
        assessment: assessment.trim() || undefined,
        conduct: conduct.trim() || undefined,
        prescriptions: prescriptions.trim() || undefined,
        examsRequested: examsRequested.trim() || undefined,
        treatmentEvolution: treatmentEvolution.trim() || undefined,
        sideEffects: sideEffects.trim() || undefined,
        adherence: adherence || undefined,
        notes: notes.trim() || undefined,
        nextAppointment: nextAppointment ? nextAppointment.format("YYYY-MM-DD") : undefined,
        attendedBy: attendedBy.trim() || undefined,
        duration: duration ? parseInt(duration) : undefined,
      };

      if (evolution?.id) {
        await medicalReportService.updateEvolution(evolution.id, evolutionData);
        toast.success("Evolução atualizada com sucesso!");
      } else {
        await medicalReportService.createEvolution(evolutionData);
        toast.success("Evolução criada com sucesso!");
      }

      onSave();
    } catch (error: any) {
      console.error("Erro ao salvar evolução:", error);
      toast.error(error.response?.data?.message || "Erro ao salvar evolução");
    } finally {
      setLoading(false);
    }
  };

  const evolutionTypes: Evolution["type"][] = [
    "Consulta",
    "Sessão",
    "Retorno",
    "Emergência",
    "Acompanhamento",
    "Outros",
  ];

  const adherenceOptions: Evolution["adherence"][] = [
    "Ótima",
    "Boa",
    "Regular",
    "Ruim",
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {evolution ? "Editar Evolução" : "Nova Evolução"}
      </DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <DatePicker
                  label="Data *"
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Horário"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Tipo *</InputLabel>
                  <Select
                    value={type}
                    onChange={(e) => setType(e.target.value as Evolution["type"])}
                    label="Tipo *"
                  >
                    {evolutionTypes.map((t) => (
                      <MenuItem key={t} value={t}>
                        {t}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Queixa e Sintomas</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Queixa Principal"
                          value={chiefComplaint}
                          onChange={(e) => setChiefComplaint(e.target.value)}
                          multiline
                          rows={2}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Sintomas"
                          value={symptoms}
                          onChange={(e) => setSymptoms(e.target.value)}
                          multiline
                          rows={2}
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Sinais Vitais</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Pressão Arterial (ex: 120/80)"
                          value={bloodPressure}
                          onChange={(e) => setBloodPressure(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Frequência Cardíaca (bpm)"
                          type="number"
                          value={heartRate}
                          onChange={(e) => setHeartRate(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          label="Temperatura (°C)"
                          type="number"
                          inputProps={{ step: "0.1" }}
                          value={temperature}
                          onChange={(e) => setTemperature(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          label="Peso (kg)"
                          type="number"
                          inputProps={{ step: "0.1" }}
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          label="Saturação O2 (%)"
                          type="number"
                          value={oxygenSaturation}
                          onChange={(e) => setOxygenSaturation(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Exame Físico"
                  value={physicalExam}
                  onChange={(e) => setPhysicalExam(e.target.value)}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Avaliação"
                  value={assessment}
                  onChange={(e) => setAssessment(e.target.value)}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Conduta"
                  value={conduct}
                  onChange={(e) => setConduct(e.target.value)}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Prescrições"
                  value={prescriptions}
                  onChange={(e) => setPrescriptions(e.target.value)}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Exames Solicitados"
                  value={examsRequested}
                  onChange={(e) => setExamsRequested(e.target.value)}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Evolução do Tratamento</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Como está evoluindo"
                          value={treatmentEvolution}
                          onChange={(e) => setTreatmentEvolution(e.target.value)}
                          multiline
                          rows={2}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Efeitos Colaterais"
                          value={sideEffects}
                          onChange={(e) => setSideEffects(e.target.value)}
                          multiline
                          rows={2}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Aderência ao Tratamento</InputLabel>
                          <Select
                            value={adherence}
                            onChange={(e) => setAdherence(e.target.value as Evolution["adherence"])}
                            label="Aderência ao Tratamento"
                          >
                            <MenuItem value="">Nenhuma</MenuItem>
                            {adherenceOptions.map((a) => (
                              <MenuItem key={a} value={a}>
                                {a}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Observações Gerais"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <DatePicker
                  label="Próxima Consulta"
                  value={nextAppointment}
                  onChange={(newValue) => setNextAppointment(newValue)}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Atendido por"
                  value={attendedBy}
                  onChange={(e) => setAttendedBy(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Duração (minutos)"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : evolution ? "Salvar" : "Criar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EvolutionModal;