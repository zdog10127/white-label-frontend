import styled from "styled-components";
import { Box, Typography, Divider } from "@mui/material";
import { device, max } from "../../constants/responsiveClient";

export const Container = styled(Box)(({ theme }) => ({
  display: "flex",

  [`@media ${max(device.mobile)}`]: {
    flexDirection: "column",
  },
}));

export const ContentBox = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: "40px",
  marginLeft: "220px",
  maxWidth: 700,
  marginRight: "auto",

  [`@media ${max(device.mobile)}`]: {
    padding: "24px 16px",
    marginLeft: 0,
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  marginBottom: 32,
  fontWeight: 600,

  [`@media ${max(device.mobile)}`]: {
    fontSize: "1.5rem",
  },
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: 16,
  fontWeight: 600,

  [`@media ${max(device.mobile)}`]: {
    fontSize: "1.25rem",
  },
}));

export const FormControlLabelWrapper = styled(Box)(({ theme }) => ({
  marginBottom: 24,

  [`@media ${max(device.mobile)}`]: {
    marginBottom: 16,
  },
}));

export const FormHelperText = styled(Typography)(({ theme }) => ({
  marginTop: 4,
  marginLeft: 12,

  [`@media ${max(device.mobile)}`]: {
    fontSize: "0.85rem",
  },
}));

export const GridWithMarginBottom = styled(Box)(({ theme }) => ({
  marginBottom: 80,

  [`@media ${max(device.mobile)}`]: {
    marginBottom: 40,
  },
}));

export const SectionDivider = styled(Divider)(({ theme }) => ({
  marginTop: 16,
  marginBottom: 16,

  [`@media ${max(device.mobile)}`]: {
    marginTop: 12,
    marginBottom: 12,
  },
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 32,

  [`@media ${max(device.mobile)}`]: {
    flexDirection: "column",
    gap: 16,
  },
}));

export const PersonalInfoSwitchWrapper = styled(Box)(({ theme }) => ({
  marginBottom: 24,
  display: "flex",
  alignItems: "center",
  gap: 4,

  [`@media ${max(device.mobile)}`]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
  },
}));

export const ErrorText = styled(Typography)(({ theme }) => ({
  marginTop: 4,
  marginLeft: 12,

  [`@media ${max(device.mobile)}`]: {
    fontSize: "0.85rem",
  },
}));
