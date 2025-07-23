import styled from "styled-components";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

export const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    border-radius: 16px;
    max-width: 450px;
    width: 100%;
    margin: 16px;
    box-shadow: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "0 24px 48px rgba(0,0,0,0.5)"
        : "0 24px 48px rgba(0,0,0,0.15)"};

    ${({ theme }) => theme.breakpoints.down("sm")} {
      margin: 8px;
      border-radius: 12px;
      max-width: 95%;
    }
  }
`;

export const StyledDialogTitle = styled(DialogTitle)`
  background: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`
      : `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  padding: 24px 32px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 20px 24px;
    font-size: 18px;
  }
`;

export const StyledDialogContent = styled(DialogContent)`
  padding: 32px;
  background-color: ${({ theme }) => theme.palette.background.default};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 24px;
  }
`;

export const StyledTextField = styled(TextField)`
  margin-top: 16px;

  & .MuiInputBase-root {
    border-radius: 12px;
    background-color: ${({ theme }) => theme.palette.background.paper};
    transition: all 0.2s ease;

    &:hover {
      box-shadow: ${({ theme }) =>
        theme.palette.mode === "dark"
          ? "0 4px 12px rgba(0,0,0,0.3)"
          : "0 4px 12px rgba(0,0,0,0.08)"};
    }

    &.Mui-focused {
      box-shadow: ${({ theme }) => `0 0 0 2px ${theme.palette.primary.main}20`};
    }
  }

  & .MuiInputLabel-root {
    font-weight: 500;
    font-size: 14px;

    &.Mui-focused {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }

  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: ${({ theme }) => theme.palette.divider};
    }

    &:hover fieldset {
      border-color: ${({ theme }) => theme.palette.primary.light};
    }

    &.Mui-focused fieldset {
      border-color: ${({ theme }) => theme.palette.primary.main};
      border-width: 2px;
    }
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    & .MuiInputBase-root {
      border-radius: 8px;
    }
  }
`;

export const StyledDialogActions = styled(DialogActions)`
  padding: 24px 32px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-top: 1px solid ${({ theme }) => theme.palette.divider};
  gap: 12px;
  justify-content: flex-end;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 20px 24px;
    flex-direction: column-reverse;
    gap: 8px;
  }
`;

export const CancelButton = styled(Button)`
  border-radius: 8px;
  font-weight: 600;
  padding: 12px 24px;
  text-transform: none;
  font-size: 14px;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.palette.text.secondary};

  &:hover {
    background-color: ${({ theme }) => theme.palette.action.hover};
    transform: translateY(-1px);
    color: ${({ theme }) => theme.palette.text.primary};
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 100%;
    padding: 14px 24px;
  }
`;

export const ActionButton = styled(Button)`
  border-radius: 8px;
  font-weight: 600;
  padding: 12px 24px;
  text-transform: none;
  font-size: 14px;
  transition: all 0.2s ease;
  box-shadow: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? "0 4px 12px rgba(0,0,0,0.4)"
      : "0 4px 12px rgba(0,0,0,0.15)"};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "0 6px 20px rgba(0,0,0,0.5)"
        : "0 6px 20px rgba(0,0,0,0.2)"};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.palette.action.disabled};
    color: ${({ theme }) => theme.palette.text.disabled};
    box-shadow: none;
    transform: none;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 100%;
    padding: 14px 24px;
  }
`;

export const IconContainer = styled.span`
  font-size: 20px;
  margin-right: 4px;
`;
