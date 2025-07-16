import { Button, TextField, Typography, Divider } from "@mui/material";
import { BoxContainer, StyledPaper, StyledDivider, ButtonsBox } from "./styles";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export interface ChangePasswordProps {
  onBack: () => void;
}

const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Senha deve ter ao menos 8 caracteres")
      .regex(/[A-Z]/, "Senha deve conter ao menos uma letra maiúscula")
      .regex(/[a-z]/, "Senha deve conter ao menos uma letra minúscula")
      .regex(/\d/, "Senha deve conter ao menos um número")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Senha deve conter ao menos um caractere especial"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type ChangePasswordFormData = z.infer<typeof passwordSchema>;

export default function ChangePassword({ onBack }: ChangePasswordProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    alert("Senha alterada com sucesso!");
    onBack();
  };

  return (
    <BoxContainer>
      <StyledPaper>
        <Typography variant="h5" gutterBottom>
          Alterar Senha
        </Typography>
        <StyledDivider />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="newPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Nova Senha"
                type="password"
                fullWidth
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                autoFocus
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Confirmar Nova Senha"
                type="password"
                fullWidth
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                sx={{ mt: 2 }}
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
    </BoxContainer>
  );
}
