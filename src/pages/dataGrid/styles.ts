import { styled } from "@mui/material/styles";
import { Box, Paper, Typography } from "@mui/material";
import { device, max } from "../../constants/responsiveClient";

export const PageContainer = styled(Box)(({ theme }) => ({
  padding: 24,

  [`@media ${max(device.mobile)}`]: {
    padding: 16,
  },
}));

export const CalendarPaper = styled(Paper)(({ theme }) => ({
  padding: 16,
  minWidth: 280,

  [`@media ${max(device.mobile)}`]: {
    padding: 12,
    minWidth: "100%",
  },
}));

export const SessionsPaper = styled(Paper)(({ theme }) => ({
  padding: 24,

  [`@media ${max(device.mobile)}`]: {
    padding: 16,
  },
}));

export const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  [`@media ${max(device.mobile)}`]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 12,
  },
}));

export const ButtonsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 8,

  [`@media ${max(device.mobile)}`]: {
    flexDirection: "column",
    gap: 6,
  },
}));

export const EmptyStateBox = styled(Box)(({ theme }) => ({
  marginTop: 48,
  textAlign: "center",

  [`@media ${max(device.mobile)}`]: {
    marginTop: 24,
    padding: "0 16px",
  },
}));

export const EmptyIcon = styled(Typography)(({ theme }) => ({
  opacity: 0.3,
  marginBottom: 0,

  [`@media ${max(device.mobile)}`]: {
    fontSize: "3rem",
  },
}));

export const SessionPaper = styled(Paper)(({ theme }) => ({
  padding: 16,
  marginBottom: 160,

  [`@media ${max(device.mobile)}`]: {
    marginBottom: 80,
    padding: 12,
  },
}));
