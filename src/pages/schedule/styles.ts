import { styled } from "@mui/material";

interface DayBoxProps {
  isToday: boolean;
  isHoliday: boolean;
  hasAgendamento: boolean;
}

export const MonthContainer = styled("div")(() => ({
  width: "100%",
}));

export const MonthHeader = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1rem",
}));

export const WeekdayHeader = styled("div")(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  textAlign: "center",
  marginBottom: "0.5rem",
}));

export const WeekGrid = styled("div")(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "8px",
}));

export const DayBox = styled("div")<DayBoxProps>(
  ({ theme, isToday, isHoliday, hasAgendamento }) => ({
    cursor: "pointer",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    height: 100,
    backgroundColor: isToday
      ? theme.palette.primary.main
      : isHoliday
      ? theme.palette.error.light
      : hasAgendamento
      ? theme.palette.info.light
      : theme.palette.background.default,
    color: isToday
      ? theme.palette.primary.contrastText
      : theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    overflow: "hidden",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.text.primary,
    },
  })
);

export const WeekContainer = styled("div")(() => ({
  width: "100%",
}));

export const WeekNavigation = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "1rem",
}));

export const DayContainer = styled("div")(() => ({
  width: "100%",
}));

export interface AgendamentoType {
  id: string;
  name: string;
  data: string;
  startTime: string;

  frequencia: string;
  status: string;
}
