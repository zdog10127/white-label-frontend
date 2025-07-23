import styled from "styled-components";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Typography,
  FormControl,
} from "@mui/material";

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 16px;
    max-width: 600px;
    width: 100%;
    margin: 16px;
    box-shadow: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "0 24px 48px rgba(255, 255, 255, 0.05)"
        : "0 24px 48px rgba(0, 0, 0, 0.15)"};

    @media (max-width: 600px) {
      margin: 8px;
      border-radius: 12px;
      max-width: 95%;
    }
  }
`;

export const StyledDialogTitle = styled(DialogTitle)`
  background: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? theme.palette.background.paper
      : "linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)"};
  border-bottom: 2px solid
    ${({ theme }) =>
      theme.palette.mode === "dark" ? theme.palette.divider : "#e0e0e0"};
  padding: 24px 32px;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) =>
    theme.palette.mode === "dark" ? theme.palette.text.primary : "#212121"};

  @media (max-width: 600px) {
    padding: 20px 24px;
    font-size: 18px;
  }
`;

export const StyledDialogContent = styled(DialogContent)`
  padding: 32px;
  background: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? theme.palette.background.default
      : "#f0f0f0"};

  @media (max-width: 600px) {
    padding: 24px;
  }
`;

export const StyledDialogActions = styled(DialogActions)`
  padding: 24px 32px;
  background-color: ${({ theme }) =>
    theme.palette.mode === "dark" ? theme.palette.background.paper : "#fff"};
  border-top: 1px solid
    ${({ theme }) =>
      theme.palette.mode === "dark" ? theme.palette.divider : "#e0e0e0"};
  gap: 12px;

  @media (max-width: 600px) {
    padding: 20px 24px;
    flex-direction: column-reverse;

    & > :not(:first-of-type) {
      margin-left: 0;
      margin-bottom: 8px;
    }
  }
`;

export const SectionTitle = styled(Typography)`
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) =>
    theme.palette.mode === "dark" ? theme.palette.text.primary : "#212121"};

  @media (max-width: 600px) {
    font-size: 15px;
    margin-bottom: 10px;
  }
`;

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  margin-bottom: 24px;
  background-color: ${({ theme }) =>
    theme.palette.mode === "dark" ? theme.palette.background.paper : "#fff"};
  border-radius: 12px;
  border: 1px solid
    ${({ theme }) =>
      theme.palette.mode === "dark" ? theme.palette.divider : "#e0e0e0"};
  overflow: hidden;

  .MuiToggleButton-root {
    border-radius: 0;
    padding: 14px 24px;
    font-size: 14px;
    font-weight: 500;
    border: none;
    color: ${({ theme }) =>
      theme.palette.mode === "dark" ? theme.palette.text.secondary : "#757575"};
    transition: all 0.2s ease;

    &:hover {
      background-color: ${({ theme }) =>
        theme.palette.mode === "dark" ? theme.palette.action.hover : "#f5f5f5"};
      color: ${({ theme }) =>
        theme.palette.mode === "dark" ? theme.palette.text.primary : "#212121"};
    }

    &.Mui-selected {
      background-color: ${({ theme }) => theme.palette.primary.main};
      color: #fff;

      &:hover {
        background-color: ${({ theme }) => theme.palette.primary.dark};
      }
    }

    &:not(:last-of-type) {
      border-right: 1px solid
        ${({ theme }) =>
          theme.palette.mode === "dark" ? theme.palette.divider : "#e0e0e0"};
    }
  }

  @media (max-width: 600px) {
    margin-bottom: 20px;

    .MuiToggleButton-root {
      padding: 12px 16px;
      font-size: 13px;
    }
  }
`;

export const StyledTextField = styled(TextField)`
  margin-bottom: 20px;

  .MuiOutlinedInput-root {
    border-radius: 12px;
    background-color: ${({ theme }) =>
      theme.palette.mode === "dark" ? theme.palette.background.paper : "#fff"};
    transition: all 0.2s ease;

    &:hover {
      box-shadow: ${({ theme }) =>
        theme.palette.mode === "dark"
          ? "0 4px 12px rgba(255, 255, 255, 0.08)"
          : "0 4px 12px rgba(0, 0, 0, 0.08)"};
    }

    &.Mui-focused {
      box-shadow: 0 0 0 2px
        ${({ theme }) =>
          theme.palette.mode === "dark"
            ? "rgba(25, 118, 210, 0.25)"
            : "rgba(25, 118, 210, 0.125)"};
    }
  }

  .MuiInputLabel-root {
    font-size: 14px;
    font-weight: 500;
  }

  @media (max-width: 600px) {
    margin-bottom: 16px;
  }
`;

export const TimeContainer = styled(Box)`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
  }
`;

export const StyledFormControl = styled(FormControl)`
  margin-bottom: 20px;

  .MuiOutlinedInput-root {
    border-radius: 12px;
    background-color: ${({ theme }) =>
      theme.palette.mode === "dark" ? theme.palette.background.paper : "#fff"};
    transition: all 0.2s ease;

    &:hover {
      box-shadow: ${({ theme }) =>
        theme.palette.mode === "dark"
          ? "0 4px 12px rgba(255, 255, 255, 0.08)"
          : "0 4px 12px rgba(0, 0, 0, 0.08)"};
    }

    &.Mui-focused {
      box-shadow: 0 0 0 2px
        ${({ theme }) =>
          theme.palette.mode === "dark"
            ? "rgba(25, 118, 210, 0.25)"
            : "rgba(25, 118, 210, 0.125)"};
    }
  }

  .MuiInputLabel-root {
    font-size: 14px;
    font-weight: 500;
  }

  .MuiSelect-select {
    padding: 14px 16px;
  }

  @media (max-width: 600px) {
    margin-bottom: 16px;
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
        ? "0 4px 12px rgba(255, 255, 255, 0.15)"
        : "0 4px 12px rgba(0, 0, 0, 0.15)"};
  }

  &.MuiButton-contained:disabled {
    background-color: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? theme.palette.action.disabledBackground
        : "#e0e0e0"};
    color: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? theme.palette.action.disabled
        : "#9e9e9e"};
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 14px 24px;
  }
`;

export const FieldGroup = styled(Box)`
  margin-bottom: 24px;

  @media (max-width: 600px) {
    margin-bottom: 20px;
  }
`;

export const RequiredLabel = styled(Typography)`
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) =>
    theme.palette.mode === "dark" ? theme.palette.text.primary : "#212121"};

  .required {
    color: ${({ theme }) => theme.palette.error.main};
  }

  @media (max-width: 600px) {
    font-size: 13px;
    margin-bottom: 10px;
  }
`;
