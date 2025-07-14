import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";

export const ClientFormContainer = styled(Box)({
  maxWidth: 480,
  margin: "2rem auto",
  padding: "2rem",
  borderRadius: 8,
  backgroundColor: "#fff",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
});

export const Title = styled(Typography)({
  textAlign: "center",
  marginBottom: "1.5rem",
  fontWeight: 600,
  color: "#333",
});

export const ClientFormStyled = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const SubmitButton = styled(Button)({
  marginTop: "1rem",
  padding: "0.75rem",
  fontSize: "1rem",
});

export const SuccessMessage = styled(Typography)({
  marginTop: "1rem",
  color: "#2e7d32",
  textAlign: "center",
  fontWeight: 500,
});
