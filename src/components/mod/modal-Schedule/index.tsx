import React from "react";
import { MenuItem, InputLabel, Select, ToggleButton } from "@mui/material";
import { Autocomplete } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import dayjs from "dayjs";
import { ClientType, ScheduleModalProps } from "../../../types/sheduleModal";
import * as S from "./styles";

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

  const isFormValid = client && date && startTime && endTime && service;

  return (
    <S.StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <S.StyledDialogTitle>📅 Cadastrar Evento</S.StyledDialogTitle>

      <S.StyledDialogContent>
        <S.FieldGroup>
          <S.SectionTitle>Que tipo de evento é esse?</S.SectionTitle>
          <S.StyledToggleButtonGroup
            value={eventType}
            exclusive
            onChange={(_, val) => val && setEventType(val)}
            fullWidth
          >
            <ToggleButton value="individual">
              <PersonIcon sx={{ mr: 1, fontSize: 18 }} />
              Individual
            </ToggleButton>
            <ToggleButton value="geral">
              <GroupIcon sx={{ mr: 1, fontSize: 18 }} />
              Evento Geral
            </ToggleButton>
          </S.StyledToggleButtonGroup>
        </S.FieldGroup>

        <S.FieldGroup>
          <Autocomplete
            options={clients}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <S.StyledTextField
                {...params}
                label="Cliente *"
                variant="outlined"
              />
            )}
            value={client}
            onChange={(_, newValue) => setClient(newValue)}
            fullWidth
          />
        </S.FieldGroup>

        <S.FieldGroup>
          <S.RequiredLabel>
            📅 Quando acontece o evento? <span className="required">*</span>
          </S.RequiredLabel>
          <S.TimeContainer>
            <S.StyledTextField
              type="date"
              label="Data"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <S.StyledTextField
              type="time"
              label="Início"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <S.StyledTextField
              type="time"
              label="Fim"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </S.TimeContainer>
        </S.FieldGroup>

        <S.FieldGroup>
          <S.StyledFormControl fullWidth>
            <InputLabel id="recurrence-label">
              🔄 Esse evento é recorrente?
            </InputLabel>
            <Select
              labelId="recurrence-label"
              value={recurrence}
              onChange={(e) =>
                setRecurrence(e.target.value as "none" | "semanal" | "mensal")
              }
              label="🔄 Esse evento é recorrente?"
            >
              <MenuItem value="none">
                Não, quero cadastrar somente esse horário
              </MenuItem>
              <MenuItem value="semanal">Semanal</MenuItem>
              <MenuItem value="mensal">Mensal</MenuItem>
            </Select>
          </S.StyledFormControl>
        </S.FieldGroup>

        <S.FieldGroup>
          <S.StyledFormControl fullWidth>
            <InputLabel id="method-label">
              🌐 Como os eventos acontecerão?
            </InputLabel>
            <Select
              labelId="method-label"
              value={method}
              onChange={(e) =>
                setMethod(e.target.value as "presencial" | "online")
              }
              label="🌐 Como os eventos acontecerão?"
            >
              <MenuItem value="presencial">🏢 Presencial</MenuItem>
              <MenuItem value="online">💻 Online</MenuItem>
            </Select>
          </S.StyledFormControl>
        </S.FieldGroup>

        <S.FieldGroup>
          <S.StyledFormControl fullWidth>
            <InputLabel id="service-label">
              Qual o serviço oferecido? <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <Select
              labelId="service-label"
              value={service}
              onChange={(e) => setService(e.target.value)}
              label="Qual o serviço oferecido? *"
            >
              <MenuItem value="terapia">
                🧠 Terapia Cognitivo Comportamental
              </MenuItem>
              <MenuItem value="psicanalise">💭 Psicanálise</MenuItem>
            </Select>
          </S.StyledFormControl>
        </S.FieldGroup>

        <S.FieldGroup>
          <S.StyledFormControl fullWidth>
            <InputLabel id="status-label">📋 Status da sessão</InputLabel>
            <Select
              labelId="status-label"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "Confirmado" | "Pendente")
              }
              label="📋 Status da sessão"
            >
              <MenuItem value="Confirmado">✅ Confirmado</MenuItem>
              <MenuItem value="Pendente">⏳ Pendente</MenuItem>
            </Select>
          </S.StyledFormControl>
        </S.FieldGroup>
      </S.StyledDialogContent>

      <S.StyledDialogActions>
        <S.StyledButton onClick={onClose} color="inherit">
          Cancelar
        </S.StyledButton>
        <S.StyledButton
          onClick={handleSave}
          variant="contained"
          disabled={!isFormValid}
        >
          {isFormValid
            ? "✅ Salvar Evento"
            : "⚠️ Preencha os campos obrigatórios"}
        </S.StyledButton>
      </S.StyledDialogActions>
    </S.StyledDialog>
  );
};

export default ScheduleModal;
