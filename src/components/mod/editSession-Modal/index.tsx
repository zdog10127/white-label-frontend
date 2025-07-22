import React, { useState, useEffect } from "react";
import { MenuItem } from "@mui/material";
import { SessaoType, Props } from "../../../types/editSessionModal";
import * as S from "./styles";

const statusOptions = ["Pago", "Pagar", "Liberado", "Isento"];
const freqOptions = ["Semanal", "Quinzenal", "Mensal", "Trimestral"];

const EditSessionModal: React.FC<Props> = ({
  open,
  onClose,
  session,
  onSave,
}) => {
  const [form, setForm] = useState<SessaoType>({
    Data: "",
    Horario: "",
    Status: "",
    Frequencia: "",
  });

  useEffect(() => {
    if (session) {
      setForm(session);
    } else {
      setForm({
        Data: "",
        Horario: "",
        Status: "",
        Frequencia: "",
      });
    }
  }, [session]);

  const handleChange = (field: keyof SessaoType, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <S.StyledDialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <S.StyledDialogTitle>✏️ Editar Sessão</S.StyledDialogTitle>

      <S.StyledDivider />

      <S.StyledDialogContent>
        <S.FieldsContainer>
          <S.StyledTextField
            label="📅 Data"
            type="date"
            fullWidth
            value={form.Data}
            onChange={(e) => handleChange("Data", e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <S.StyledTextField
            label="🕐 Horário"
            type="time"
            fullWidth
            value={form.Horario}
            onChange={(e) => handleChange("Horario", e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <S.StyledTextField
            label="💰 Situação"
            select
            fullWidth
            value={form.Status}
            onChange={(e) => handleChange("Status", e.target.value)}
          >
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {getStatusIcon(status)} {status}
              </MenuItem>
            ))}
          </S.StyledTextField>

          <S.StyledTextField
            label="🔄 Frequência"
            select
            fullWidth
            value={form.Frequencia}
            onChange={(e) => handleChange("Frequencia", e.target.value)}
          >
            {freqOptions.map((freq) => (
              <MenuItem key={freq} value={freq}>
                {getFrequencyIcon(freq)} {freq}
              </MenuItem>
            ))}
          </S.StyledTextField>
        </S.FieldsContainer>
      </S.StyledDialogContent>

      <S.StyledDialogActions>
        <S.CancelButton onClick={onClose}>Cancelar</S.CancelButton>

        <S.SaveButton variant="contained" onClick={handleSubmit}>
          💾 Salvar Alterações
        </S.SaveButton>
      </S.StyledDialogActions>
    </S.StyledDialog>
  );
};

const getStatusIcon = (status: string): string => {
  switch (status) {
    case "Pago":
      return "✅";
    case "Pagar":
      return "💳";
    case "Liberado":
      return "🆓";
    case "Isento":
      return "🎁";
    default:
      return "💰";
  }
};

const getFrequencyIcon = (freq: string): string => {
  switch (freq) {
    case "Semanal":
      return "📅";
    case "Quinzenal":
      return "📆";
    case "Mensal":
      return "🗓️";
    case "Trimestral":
      return "📊";
    default:
      return "🔄";
  }
};

export default EditSessionModal;
