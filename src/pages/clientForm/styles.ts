import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import { device, max } from "../../constants/responsiveClient";

export const ClientFormContainer = styled(Box)(({ theme }) => ({
  maxWidth: 480,
  margin: "2rem auto",
  padding: "2rem",
  borderRadius: 8,
  backgroundColor: "#fff",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",

  [`@media ${max(device.mobile)}`]: {
    margin: "1rem 16px",
    padding: "1.5rem",
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: "1.5rem",
  fontWeight: 600,
  color: "#333",

  [`@media ${max(device.mobile)}`]: {
    fontSize: "1.25rem",
  },
}));

export const ClientFormStyled = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  [`@media ${max(device.mobile)}`]: {
    gap: "0.75rem",
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: "1rem",
  padding: "0.75rem",
  fontSize: "1rem",

  [`@media ${max(device.mobile)}`]: {
    fontSize: "0.9rem",
    padding: "0.6rem",
  },
}));

export const SuccessMessage = styled(Typography)(({ theme }) => ({
  marginTop: "1rem",
  color: "#2e7d32",
  textAlign: "center",
  fontWeight: 500,

  [`@media ${max(device.mobile)}`]: {
    fontSize: "0.9rem",
  },
}));
