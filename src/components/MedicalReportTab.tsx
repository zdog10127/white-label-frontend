import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Save as SaveIcon,
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import medicalReportService, { MedicalReport } from "../services/medicalReportService";

interface MedicalReportTabProps {
  patientId: string;
}

const MedicalReportTab: React.FC<MedicalReportTabProps> = ({ patientId }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [report, setReport] = useState<MedicalReport | null>(null);

  // Form fields
  const [diagnosis, setDiagnosis] = useState("");
  const [medications, setMedications] = useState("");
  const [allergies, setAllergies] = useState("");
  const [comorbidities, setComorbidities] = useState("");
  const [familyHistory, setFamilyHistory] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [generalNotes, setGeneralNotes] = useState("");

  useEffect(() => {
    loadReport();
  }, [patientId]);

  const loadReport = async () => {
    try {
      setLoading(true);
      const data = await medicalReportService.getReportByPatientId(patientId);
      
      if (data) {
        setReport(data);
        setDiagnosis(data.diagnosis || "");
        setMedications(data.medications || "");
        setAllergies(data.allergies || "");
        setComorbidities(data.comorbidities || "");
        setFamilyHistory(data.familyHistory || "");
        setTreatmentPlan(data.treatmentPlan || "");
        setRecommendations(data.recommendations || "");
        setRestrictions(data.restrictions || "");
        setGeneralNotes(data.generalNotes || "");
        setEditing(false);
      } else {
        // Não existe relatório, habilitar edição
        setEditing(true);
      }
    } catch (error: any) {
      console.error("Erro ao carregar prontuário:", error);
      toast.error("Erro ao carregar prontuário");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const reportData: MedicalReport = {
        patientId,
        diagnosis: diagnosis.trim() || undefined,
        medications: medications.trim() || undefined,
        allergies: allergies.trim() || undefined,
        comorbidities: comorbidities.trim() || undefined,
        familyHistory: familyHistory.trim() || undefined,
        treatmentPlan: treatmentPlan.trim() || undefined,
        recommendations: recommendations.trim() || undefined,
        restrictions: restrictions.trim() || undefined,
        generalNotes: generalNotes.trim() || undefined,
      };

      if (report?.id) {
        // Atualizar
        await medicalReportService.updateReport(report.id, reportData);
        toast.success("Prontuário atualizado com sucesso!");
      } else {
        // Criar
        await medicalReportService.createReport(reportData);
        toast.success("Prontuário criado com sucesso!");
      }

      loadReport();
    } catch (error: any) {
      console.error("Erro ao salvar prontuário:", error);
      toast.error(error.response?.data?.message || "Erro ao salvar prontuário");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (report) {
      // Restaurar valores
      setDiagnosis(report.diagnosis || "");
      setMedications(report.medications || "");
      setAllergies(report.allergies || "");
      setComorbidities(report.comorbidities || "");
      setFamilyHistory(report.familyHistory || "");
      setTreatmentPlan(report.treatmentPlan || "");
      setRecommendations(report.recommendations || "");
      setRestrictions(report.restrictions || "");
      setGeneralNotes(report.generalNotes || "");
      setEditing(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" gap={1}>
          <DescriptionIcon color="primary" />
          <Typography variant="h6">Prontuário Médico</Typography>
        </Box>

        {!editing && (
          <Button
            variant={report ? "outlined" : "contained"}
            startIcon={report ? <EditIcon /> : <SaveIcon />}
            onClick={() => setEditing(true)}
          >
            {report ? "Editar" : "Criar Prontuário"}
          </Button>
        )}
      </Box>

      {!report && !editing && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Este paciente ainda não possui prontuário médico. Clique em "Criar Prontuário" para começar.
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Informações Clínicas */}
        <Grid item xs={12}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Informações Clínicas</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Diagnóstico"
                    multiline
                    rows={4}
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    disabled={!editing}
                    placeholder="Diagnóstico completo do paciente..."
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Medicações em Uso"
                    multiline
                    rows={4}
                    value={medications}
                    onChange={(e) => setMedications(e.target.value)}
                    disabled={!editing}
                    placeholder="Liste as medicações..."
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Alergias"
                    multiline
                    rows={4}
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    disabled={!editing}
                    placeholder="Alergias conhecidas..."
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Comorbidades"
                    multiline
                    rows={4}
                    value={comorbidities}
                    onChange={(e) => setComorbidities(e.target.value)}
                    disabled={!editing}
                    placeholder="Outras doenças..."
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Histórico Familiar"
                    multiline
                    rows={4}
                    value={familyHistory}
                    onChange={(e) => setFamilyHistory(e.target.value)}
                    disabled={!editing}
                    placeholder="Histórico de doenças na família..."
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Plano de Tratamento */}
        <Grid item xs={12}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Plano de Tratamento</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Plano de Tratamento"
                    multiline
                    rows={4}
                    value={treatmentPlan}
                    onChange={(e) => setTreatmentPlan(e.target.value)}
                    disabled={!editing}
                    placeholder="Descreva o plano de tratamento..."
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Recomendações"
                    multiline
                    rows={4}
                    value={recommendations}
                    onChange={(e) => setRecommendations(e.target.value)}
                    disabled={!editing}
                    placeholder="Recomendações gerais..."
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Restrições"
                    multiline
                    rows={4}
                    value={restrictions}
                    onChange={(e) => setRestrictions(e.target.value)}
                    disabled={!editing}
                    placeholder="Restrições alimentares, atividades, etc..."
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Observações Gerais</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                fullWidth
                label="Observações"
                multiline
                rows={6}
                value={generalNotes}
                onChange={(e) => setGeneralNotes(e.target.value)}
                disabled={!editing}
                placeholder="Observações gerais sobre o paciente..."
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
        {editing && (
          <Grid item xs={12}>
            <Box display="flex" gap={2} justifyContent="flex-end">
              {report && (
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancelar
                </Button>
              )}
              <Button
                variant="contained"
                startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Salvando..." : "Salvar"}
              </Button>
            </Box>
          </Grid>
        )}
        {report && (
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="caption" color="text.secondary">
              {report.createdAt && `Criado em: ${medicalReportService.formatDateTime(report.createdAt)}`}
              {report.updatedAt && ` | Última atualização: ${medicalReportService.formatDateTime(report.updatedAt)}`}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default MedicalReportTab;