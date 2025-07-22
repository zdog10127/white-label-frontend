import styled from "styled-components";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  TableHead,
  TableRow,
  Box,
  Chip,
} from "@mui/material";

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 16px;
    max-width: 700px;
    width: 100%;
    margin: 16px;
    box-shadow: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "0 24px 48px rgba(0,0,0,0.7)"
        : "0 24px 48px rgba(0,0,0,0.15)"};

    ${({ theme }) => theme.breakpoints.down("sm")} {
      margin: 8px;
      border-radius: 12px;
    }
  }
`;

export const StyledDialogTitle = styled(DialogTitle)`
  background: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
      : `linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)`};
  border-bottom: 2px solid
    ${({ theme }) =>
      theme.palette.mode === "dark" ? theme.palette.divider : "#e0e0e0"};
  padding: 24px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 20px 24px;
  }
`;

export const StyledDialogContent = styled(DialogContent)`
  padding: 32px;
  background: ${({ theme }) => theme.palette.background.paper};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 24px;
  }
`;

export const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    border-radius: 12px;
    background-color: ${({ theme }) => theme.palette.background.paper};
    transition: all 0.2s ease;

    &:hover {
      box-shadow: ${({ theme }) =>
        theme.palette.mode === "dark"
          ? "0 4px 12px rgba(0, 0, 0, 0.6)"
          : "0 4px 12px rgba(0, 0, 0, 0.08)"};
    }

    &.Mui-focused {
      box-shadow: 0 0 0 2px ${({ theme }) => theme.palette.primary.main}20;
    }
  }
`;

export const TableContainer = styled(Box)`
  max-height: 400px;
  overflow-y: auto;
  margin-top: 20px;
  border: 1px solid
    ${({ theme }) =>
      theme.palette.mode === "dark" ? theme.palette.divider : "#e0e0e0"};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? "0 4px 16px rgba(0, 0, 0, 0.7)"
      : "0 4px 16px rgba(0, 0, 0, 0.08)"};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? theme.palette.background.default
        : "#f0f0f0"};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.palette.mode === "dark" ? "#555" : "#bdbdbd"};
    border-radius: 3px;
  }
`;

export const StyledTableHead = styled(TableHead)`
  position: sticky;
  top: 0;
  z-index: 1;
  background: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? theme.palette.background.default
      : "#f5f5f5"};

  .MuiTableCell-root {
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.palette.text.primary};
    border-bottom: 2px solid ${({ theme }) => theme.palette.divider};
    padding: 20px 24px;
  }
`;

export const StyledTableRow = styled(TableRow)`
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) =>
      theme.palette.mode === "dark" ? theme.palette.action.hover : "#f5f5f5"};
    transform: scale(1.002);
  }

  .MuiTableCell-root {
    border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
    padding: 16px 24px;
  }
`;

export const UserInfo = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const UserDetails = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

export const StyledDialogActions = styled(DialogActions)`
  padding: 24px 32px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-top: 1px solid ${({ theme }) => theme.palette.divider};
  gap: 12px;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 20px 24px;
    flex-direction: column-reverse;

    & > :not(:first-of-type) {
      margin-left: 0;
      margin-bottom: 8px;
    }
  }
`;

export const StyledButton = styled(Button)`
  border-radius: 8px;
  font-weight: 600;
  padding: 12px 24px;
  text-transform: none;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "0 4px 12px rgba(0,0,0,0.7)"
        : "0 4px 12px rgba(0,0,0,0.15)"};
  }
`;

export const HeaderInfo = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

export const CloseButton = styled(Button)`
  min-width: 40px;
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 50%;
  color: ${({ theme }) =>
    theme.palette.mode === "dark" ? theme.palette.text.secondary : "#757575"};

  &:hover {
    background-color: ${({ theme }) =>
      theme.palette.mode === "dark" ? theme.palette.action.hover : "#f0f0f0"};
    color: ${({ theme }) =>
      theme.palette.mode === "dark" ? theme.palette.text.primary : "#212121"};
  }
`;

export const ResultsChip = styled(Chip)`
  background-color: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? "rgba(25, 118, 210, 0.25)"
      : "rgba(25, 118, 210, 0.125)"};
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: 600;

  .MuiChip-label {
    font-size: 12px;
  }
`;

export const EmptyState = styled(Box)`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) =>
    theme.palette.mode === "dark" ? theme.palette.text.secondary : "#757575"};

  .icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.7;
  }
`;
