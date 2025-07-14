import { styled } from "@mui/material/styles";
import { Box, Paper, Typography } from "@mui/material";

export const PageContainer = styled(Box)({
  padding: 24,
});

export const CalendarPaper = styled(Paper)({
  padding: 16,
  minWidth: 280,
});

export const SessionsPaper = styled(Paper)({
  padding: 24,
});

export const HeaderBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const ButtonsBox = styled(Box)({
  display: "flex",
  gap: 8,
});

export const EmptyStateBox = styled(Box)({
  marginTop: 48,
  textAlign: "center",
});

export const EmptyIcon = styled(Typography)({
  opacity: 0.3,
  marginBottom: 0,
});

export const SessionPaper = styled(Paper)({
  padding: 16,
  marginBottom: 160,
});
