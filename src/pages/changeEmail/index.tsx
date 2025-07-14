import React from "react";
import { Button, TextField, Typography, Divider } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Container, StyledPaper, StyledDivider, ButtonsBox } from "./styles";

export interface ChangeEmailProps {
  onBack: () => void;
  clientEmail: string;
}

const emailSchema = z
  .object({
    newEmail: z
      .string()
      .min(1, "E-mail é obrigatório")
      .email("E-mail inválido"),
    confirmEmail: z.string().min(1, "Confirmação é obrigatória"),
  })
  .refine((data) => data.newEmail === data.confirmEmail, {
    message: "Os e-mails não coincidem",
    path: ["confirmEmail"],
  });

type ChangeEmailFormData = z.infer<typeof emailSchema>;

export default function ChangeEmail({ onBack, clientEmail }: ChangeEmailProps) {
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
    <Container>
      <StyledPaper>
        <Typography variant="h5" gutterBottom>
          Alterar E-mail
        </Typography>
        <StyledDivider />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="E-mail atual"
            type="email"
            fullWidth
            value={clientEmail}
            margin="normal"
            InputProps={{ readOnly: true }}
          />

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
                margin="normal"
                error={!!errors.newEmail}
                helperText={errors.newEmail?.message}
              />
            )}
          />

          <Controller
            name="confirmEmail"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Confirmar Novo E-mail"
                type="email"
                fullWidth
                margin="normal"
                error={!!errors.confirmEmail}
                helperText={errors.confirmEmail?.message}
              />
            )}
          />

          <ButtonsBox>
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
          </ButtonsBox>
        </form>
      </StyledPaper>
    </Container>
  );
}
