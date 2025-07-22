import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ClientFormContainer,
  ClientFormStyled,
  SubmitButton,
  SuccessMessage,
  Title,
} from "./styles";
import { TextField } from "@mui/material";

const clientSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  birthdate: z.string().min(1, "Data de nascimento é obrigatória"),
});

type ClientFormData = z.infer<typeof clientSchema>;

const ClientForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthdate: "",
    },
  });

  const onSubmit = (data: ClientFormData) => {
    console.warn("Dados enviados:", data);
    reset();
  };

  return (
    <ClientFormContainer>
      <Title>Cadastro de Cliente</Title>
      <ClientFormStyled onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nome Completo"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="E-mail"
              type="email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Telefone"
              type="tel"
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          )}
        />

        <Controller
          name="birthdate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Data de nascimento"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              error={!!errors.birthdate}
              helperText={errors.birthdate?.message}
            />
          )}
        />

        <SubmitButton type="submit" color="primary">
          Cadastrar
        </SubmitButton>
      </ClientFormStyled>

      {isSubmitSuccessful && (
        <SuccessMessage>Formulário enviado com sucesso!</SuccessMessage>
      )}
    </ClientFormContainer>
  );
};

export default ClientForm;
