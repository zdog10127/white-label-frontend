import styled from "styled-components";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { max } from "../../../constants/responsiveClient";

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 12px;
    box-shadow: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "0 8px 20px rgba(255, 255, 255, 0.12)"
        : "0 8px 20px rgba(0, 0, 0, 0.12)"};
    padding: 16px;
    background-color: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? theme.palette.background.paper
        : "#ffffff"};
    max-width: 400px;
    width: 100%;
    margin: 16px;

    ${max("sm")} {
      margin: 8px;
      padding: 12px;
      border-radius: 8px;
      max-width: 95%;
    }
  }
`;

export const StyledDialogTitle = styled(DialogTitle)`
  font-weight: 700;
  font-size: 1.5rem;
  text-align: center;
  padding-bottom: 8px;
  color: ${({ theme }) =>
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.87)" : "#000000de"};

  ${max("sm")} {
    font-size: 1.3rem;
  }
`;

export const StyledDivider = styled(Divider)`
  border-color: ${({ theme }) =>
    theme.palette.mode === "dark" ? theme.palette.divider : "#e0e0e0"};
  margin-bottom: 16px;
`;

export const StyledDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 16px;
  padding: 0 24px;

  ${max("sm")} {
    gap: 20px;
    padding: 0 16px;
  }
`;

export const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    border-radius: 12px;
    background-color: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? theme.palette.action.selected
        : "#f5f5f5"};
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
    font-weight: 500;
    font-size: 14px;
  }

  .MuiSelect-select {
    padding-top: 12px;
    padding-bottom: 12px;
  }

  ${max("sm")} {
    .MuiInputBase-root {
      border-radius: 8px;
    }
  }
`;

export const StyledDialogActions = styled(DialogActions)`
  justify-content: space-between;
  padding: 16px 24px 16px 24px;

  ${max("sm")} {
    padding: 16px;
    flex-direction: column-reverse;
    gap: 8px;
  }
`;

export const CancelButton = styled(Button)`
  color: ${({ theme }) =>
    theme.palette.mode === "dark" ? theme.palette.text.secondary : "#6e6e6e"};
  font-weight: 600;
  border-radius: 8px;
  padding: 12px 24px;
  text-transform: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.04)"
        : "rgba(0, 0, 0, 0.04)"};
    transform: translateY(-1px);
  }

  ${max("sm")} {
    width: 100%;
    padding: 14px 24px;
  }
`;

export const SaveButton = styled(Button)`
  border-radius: 8px;
  padding: 12px 32px;
  font-weight: 700;
  text-transform: none;
  box-shadow: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? "0 4px 10px rgba(255, 255, 255, 0.12)"
      : "0 4px 10px rgba(0, 0, 0, 0.12)"};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "0 6px 15px rgba(255, 255, 255, 0.18)"
        : "0 6px 15px rgba(0, 0, 0, 0.18)"};
    transform: translateY(-1px);
  }

  ${max("sm")} {
    width: 100%;
    padding: 14px 32px;
  }
`;

export const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${max("sm")} {
    gap: 20px;
  }
`;
