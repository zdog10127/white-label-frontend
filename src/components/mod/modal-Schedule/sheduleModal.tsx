import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Typography,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import { Autocomplete } from "@mui/material";
import dayjs from "dayjs";
import { ClientType, ScheduleModalProps } from "../../../types/sheduleModal";

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  open,
  onClose,
  clients,
  onSave,
}) => {
  const [eventType, setEventType] = React.useState<"individual" | "geral">(
    "individual"
  );
  const [client, setClient] = React.useState<ClientType | null>(null);
  const [date, setDate] = React.useState<string>("");
  const [startTime, setStartTime] = React.useState<string>("");
  const [endTime, setEndTime] = React.useState<string>("");
  const [recurrence, setRecurrence] = React.useState<
    "none" | "semanal" | "mensal"
  >("none");
  const [method, setMethod] = React.useState<"presencial" | "online">(
    "presencial"
  );
  const [service, setService] = React.useState<string>("");
  const [status, setStatus] = React.useState<"Confirmado" | "Pendente">(
    "Confirmado"
  );

  const handleSave = () => {
    if (!client || !date || !startTime || !endTime || !service) return;

    const novaSessao = {
      id: crypto.randomUUID(),
      cpf: client.id,
      data: dayjs(date).format("YYYY-MM-DD"),
      titulo: service,
      name: client.name,
      startTime,
      endTime,
      frequencia: recurrence,
      status: status,
    };

    onSave(novaSessao);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Cadastrar evento</DialogTitle>
      <DialogContent>
        <Typography mb={1}>Que tipo de evento é esse?:</Typography>
        <ToggleButtonGroup
          value={eventType}
          exclusive
          onChange={(_, val) => val && setEventType(val)}
          fullWidth
          sx={{ mb: 2 }}
        >
          <ToggleButton value="individual">Individual</ToggleButton>
          <ToggleButton value="geral">Evento geral</ToggleButton>
        </ToggleButtonGroup>

        <Autocomplete
          options={clients}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Cliente *" variant="outlined" />
          )}
          value={client}
          onChange={(_, newValue) => setClient(newValue)}
          sx={{ mb: 2 }}
          fullWidth
        />

        <Typography mb={1}>Quando acontece o evento?: *</Typography>
        <Box display="flex" gap={1} mb={2}>
          <TextField
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
          />
          <TextField
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            fullWidth
          />
          <TextField
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            fullWidth
          />
        </Box>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="recurrence-label">
            Esse evento é recorrente?
          </InputLabel>
          <Select
            labelId="recurrence-label"
            value={recurrence}
            onChange={(e) =>
              setRecurrence(e.target.value as "none" | "semanal" | "mensal")
            }
            label="Esse evento é recorrente?"
          >
            <MenuItem value="none">
              Não, quero cadastrar somente esse horário
            </MenuItem>
            <MenuItem value="semanal">Semanal</MenuItem>
            <MenuItem value="mensal">Mensal</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="method-label">
            Como os eventos acontecerão?
          </InputLabel>
          <Select
            labelId="method-label"
            value={method}
            onChange={(e) =>
              setMethod(e.target.value as "presencial" | "online")
            }
            label="Como os eventos acontecerão?"
          >
            <MenuItem value="presencial">Presencial</MenuItem>
            <MenuItem value="online">Online</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="service-label">Qual o serviço oferecido?</InputLabel>
          <Select
            labelId="service-label"
            value={service}
            onChange={(e) => setService(e.target.value)}
            label="Qual o serviço oferecido?"
          >
            <MenuItem value="terapia">
              Terapia Cognitivo Comportamental
            </MenuItem>
            <MenuItem value="psicanalise">Psicanálise</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="status-label">Status da sessão</InputLabel>
          <Select
            labelId="status-label"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "Confirmado" | "Pendente")
            }
            label="Status da sessão"
          >
            <MenuItem value="Confirmado">Confirmado</MenuItem>
            <MenuItem value="Pendente">Pendente</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!client || !date || !startTime || !endTime || !service}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleModal;
