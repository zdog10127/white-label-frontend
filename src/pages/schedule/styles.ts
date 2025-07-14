import { styled } from "@mui/material";
import { device, max } from "../../constants/responsiveClient";

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

  [`@media ${max(device.mobile)}`]: {
    flexDirection: "column",
    gap: "0.5rem",
    alignItems: "flex-start",
  },
}));

export const WeekdayHeader = styled("div")(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  textAlign: "center",
  marginBottom: "0.5rem",

  [`@media ${max(device.mobile)}`]: {
    fontSize: "0.75rem",
  },
}));

export const WeekGrid = styled("div")(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "8px",

  [`@media ${max(device.mobile)}`]: {
    gap: "4px",
  },
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

    [`@media ${max(device.mobile)}`]: {
      height: 70,
      padding: theme.spacing(0.5),
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

  [`@media ${max(device.mobile)}`]: {
    flexDirection: "column",
    gap: "0.5rem",
    alignItems: "flex-start",
  },
}));

export const DayContainer = styled("div")(() => ({
  width: "100%",
}));
