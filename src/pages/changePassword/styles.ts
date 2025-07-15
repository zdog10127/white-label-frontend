import styled from "styled-components";
import { Box, Paper, Divider } from "@mui/material";
import { device, max } from "../../constants/responsiveClient";

export const BoxContainer = styled(Box)(({ theme }) => ({
  maxWidth: 480,
  margin: "2rem auto 0",

  [`@media ${max(device.mobile)}`]: {
    margin: "1rem 16px 0",
  },
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: 32,

  [`@media ${max(device.mobile)}`]: {
    padding: 16,
  },
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  marginBottom: 24,

  [`@media ${max(device.mobile)}`]: {
    marginBottom: 16,
  },
}));

export const ButtonsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginTop: 24,

  [`@media ${max(device.mobile)}`]: {
    flexDirection: "column",
    gap: 16,
  },
}));
