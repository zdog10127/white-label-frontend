import styled from "styled-components";
import { Box } from "@mui/material";
import { device, max } from "../../constants/responsiveClient";

interface DayBoxProps {
  isToday: boolean;
  isHoliday: boolean;
  hasAgendamento: boolean;
}

export const MonthContainer = styled(Box)`
  width: 100%;
`;

export const MonthHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  @media ${max(device.mobile)} {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
`;

export const WeekdayHeader = styled(Box)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 0.5rem;

  @media ${max(device.mobile)} {
    font-size: 0.75rem;
  }
`;

export const WeekGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;

  @media ${max(device.mobile)} {
    gap: 4px;
  }
`;

export const DayBox = styled(Box)<DayBoxProps>`
  ${({ theme, isToday, isHoliday, hasAgendamento }) => `
    cursor: pointer;
    border-radius: ${theme.spacing(1)};
    padding: ${theme.spacing(1)};
    height: 100px;
    background-color: ${
      isToday
        ? theme.palette.primary.main
        : isHoliday
        ? theme.palette.error.light
        : hasAgendamento
        ? theme.palette.info.light
        : theme.palette.background.default
    };
    color: ${
      isToday ? theme.palette.primary.contrastText : theme.palette.text.primary
    };
    border: 1px solid ${theme.palette.divider};
    overflow: hidden;

    &:hover {
      background-color: ${theme.palette.action.hover};
      color: ${theme.palette.text.primary};
    }

    @media ${max(device.mobile)} {
      height: 70px;
      padding: ${theme.spacing(0.5)};
    }
  `}
`;

export const WeekContainer = styled(Box)`
  width: 100%;
`;

export const WeekNavigation = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  @media ${max(device.mobile)} {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
`;

export const DayContainer = styled(Box)`
  width: 100%;
`;
