import React from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export interface ChangeEmailProps {
  onBack: () => void;
}

const emailSchema = z.object({
  newEmail: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
});

type ChangeEmailFormData = z.infer<typeof emailSchema>;

export default function ChangeEmail({ onBack }: ChangeEmailProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangeEmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = (data: ChangeEmailFormData) => {
    alert(`Novo e-mail salvo: ${data.newEmail}`);
    onBack();
  };

  return (
    <Box maxWidth={480} mx="auto" mt={4}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Alterar E-mail
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="newEmail"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Novo E-mail"
                type="email"
                fullWidth
                error={!!errors.newEmail}
                helperText={errors.newEmail?.message}
                autoFocus
              />
            )}
          />

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button variant="outlined" onClick={onBack}>
              Voltar
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
            >
              Salvar
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
