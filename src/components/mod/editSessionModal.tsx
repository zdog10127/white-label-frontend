import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Divider,
} from "@mui/material";
import { SessaoType, Props } from "../../types/editSessionModal";

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
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 3,
          boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
          padding: 2,
          bgcolor: "background.paper",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: "700",
          fontSize: "1.5rem",
          textAlign: "center",
          pb: 1,
        }}
      >
        Editar Sessão
      </DialogTitle>
      <Divider />

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mt: 2,
        }}
      >
        <TextField
          label="Data"
          type="date"
          fullWidth
          value={form.Data}
          onChange={(e) => handleChange("Data", e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: 1.5,
              bgcolor: "background.default",
            },
          }}
        />
        <TextField
          label="Horário"
          type="time"
          fullWidth
          value={form.Horario}
          onChange={(e) => handleChange("Horario", e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: 1.5,
              bgcolor: "background.default",
            },
          }}
        />
        <TextField
          label="Situação"
          select
          fullWidth
          value={form.Status}
          onChange={(e) => handleChange("Status", e.target.value)}
          sx={{
            "& .MuiSelect-select": {
              borderRadius: 1.5,
              bgcolor: "background.default",
              paddingY: 1,
            },
          }}
        >
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Frequência"
          select
          fullWidth
          value={form.Frequencia}
          onChange={(e) => handleChange("Frequencia", e.target.value)}
          sx={{
            "& .MuiSelect-select": {
              borderRadius: 1.5,
              bgcolor: "background.default",
              paddingY: 1,
            },
          }}
        >
          {freqOptions.map((freq) => (
            <MenuItem key={freq} value={freq}>
              {freq}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>

      <DialogActions
        sx={{ justifyContent: "space-between", px: 3, pb: 2, pt: 1 }}
      >
        <Button
          onClick={onClose}
          sx={{
            color: "text.secondary",
            fontWeight: 600,
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1.2,
            fontWeight: 700,
            boxShadow: "0 4px 10px rgb(0 0 0 / 0.12)",
            "&:hover": {
              boxShadow: "0 6px 15px rgb(0 0 0 / 0.18)",
            },
          }}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditSessionModal;
