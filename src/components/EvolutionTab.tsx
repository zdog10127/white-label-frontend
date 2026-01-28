import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Chip,
  IconButton,
  Dialog,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Timeline as TimelineIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import medicalReportService, { Evolution } from "../services/medicalReportService";
import EvolutionModal from "../components/EvolutionModal";

interface EvolutionsTabProps {
  patientId: string;
}

const EvolutionsTab: React.FC<EvolutionsTabProps> = ({ patientId }) => {
  const [loading, setLoading] = useState(true);
  const [evolutions, setEvolutions] = useState<Evolution[]>([]);
  const [selectedEvolution, setSelectedEvolution] = useState<Evolution | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [evolutionToDelete, setEvolutionToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadEvolutions();
  }, [patientId]);

  const loadEvolutions = async () => {
    try {
      setLoading(true);
      const data = await medicalReportService.getEvolutionsByPatientId(patientId);
      setEvolutions(data);
    } catch (error: any) {
      console.error("Erro ao carregar evoluções:", error);
      toast.error("Erro ao carregar evoluções");
    } finally {
      setLoading(false);
    }
  };

  const handleNew = () => {
    setSelectedEvolution(null);
    setModalOpen(true);
  };

  const handleEdit = (evolution: Evolution) => {
    setSelectedEvolution(evolution);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    setEvolutionToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!evolutionToDelete) return;

    try {
      await medicalReportService.deleteEvolution(evolutionToDelete);
      toast.success("Evolução excluída com sucesso!");
      loadEvolutions();
    } catch (error: any) {
      console.error("Erro ao excluir evolução:", error);
      toast.error("Erro ao excluir evolução");
    } finally {
      setDeleteDialogOpen(false);
      setEvolutionToDelete(null);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedEvolution(null);
  };

  const handleModalSave = () => {
    loadEvolutions();
    handleModalClose();
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" gap={1}>
          <TimelineIcon color="primary" />
          <Typography variant="h6">Evoluções e Atendimentos</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNew}
        >
          Nova Evolução
        </Button>
      </Box>
      {evolutions.length === 0 ? (
        <Alert severity="info">
          Nenhuma evolução registrada ainda. Clique em "Nova Evolução" para registrar o primeiro atendimento.
        </Alert>
      ) : (
        <List sx={{ bgcolor: "background.paper" }}>
          {evolutions.map((evolution, index) => (
            <React.Fragment key={evolution.id}>
              {index > 0 && <Divider />}
              <ListItem
                disablePadding
                secondaryAction={
                  <Box>
                    <IconButton
                      edge="end"
                      onClick={() => handleEdit(evolution)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => handleDelete(evolution.id!)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemButton onClick={() => handleEdit(evolution)}>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                        <CalendarIcon fontSize="small" color="action" />
                        <Typography variant="subtitle1" fontWeight="medium">
                          {medicalReportService.formatDate(evolution.date)}
                          {evolution.time && ` às ${evolution.time}`}
                        </Typography>
                        <Chip
                          label={evolution.type}
                          size="small"
                          color={medicalReportService.getTypeColor(evolution.type)}
                        />
                        {evolution.adherence && (
                          <Chip
                            label={`Aderência: ${evolution.adherence}`}
                            size="small"
                            color={medicalReportService.getAdherenceColor(evolution.adherence)}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box mt={1}>
                        {evolution.chiefComplaint && (
                          <Typography variant="body2" color="text.secondary">
                            <strong>Queixa:</strong> {evolution.chiefComplaint}
                          </Typography>
                        )}
                        {evolution.assessment && (
                          <Typography variant="body2" color="text.secondary">
                            <strong>Avaliação:</strong> {evolution.assessment}
                          </Typography>
                        )}
                        {evolution.notes && (
                          <Typography variant="body2" color="text.secondary" noWrap>
                            <strong>Obs:</strong> {evolution.notes}
                          </Typography>
                        )}
                        {evolution.attendedBy && (
                          <Typography variant="caption" color="text.secondary">
                            Atendido por: {evolution.attendedBy}
                            {evolution.duration && ` | Duração: ${evolution.duration} min`}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      )}
      <EvolutionModal
        open={modalOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
        patientId={patientId}
        evolution={selectedEvolution}
      />
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <Box p={3}>
          <Typography variant="h6" gutterBottom>
            Confirmar Exclusão
          </Typography>
          <Typography variant="body1" gutterBottom>
            Tem certeza que deseja excluir esta evolução?
          </Typography>
          <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
            <Button onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={confirmDelete}
              variant="contained"
              color="error"
            >
              Excluir
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default EvolutionsTab;