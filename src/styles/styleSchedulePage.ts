import styled from "styled-components";
import { Box } from "@mui/material";

export const ScheduleContainer = styled(Box)`
  padding: 24px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const ScheduleHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

export const ViewToggleGroup = styled.div`
  margin-bottom: 16px;
`;

export const ScheduleTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  margin-top: 16px;
`;

export const ScheduleTh = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  background-color: #f5f5f5;
  font-weight: bold;
  color: #333;
`;

export const ScheduleTd = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  position: relative;
  height: 60px;

  &:hover {
    background-color: #fafafa;
    cursor: pointer;
  }
`;

export const Event = styled.div`
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  padding: 4px;
  font-size: 0.75rem;
  color: #fff;
  background-color: #64b5f6; /* Azul claro */
  border-radius: 4px;
  z-index: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

export const EventConsult = styled(Event)`
  background-color: #4caf50; /* Verde */
`;

export const EventBlocked = styled(Event)`
  background-color: #ef5350; /* Vermelho */
`;

export const EventHoliday = styled(EventBlocked)`
  background-color: #ffeb3b; /* Amarelo */
  color: #333;
  font-weight: bold;
`;
