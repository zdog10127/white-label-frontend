import styled from "styled-components";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { max } from "../../../constants/responsiveClient";

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 16px;
    max-width: 450px;
    width: 100%;
    margin: 16px;
    box-shadow: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "0 24px 48px rgba(255, 255, 255, 0.05)"
        : "0 24px 48px rgba(0, 0, 0, 0.15)"};

    ${max("sm")} {
      margin: 8px;
      border-radius: 12px;
      max-width: 95%;
    }
  }
`;

export const StyledDialogTitle = styled(DialogTitle)`
  background: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? `linear-gradient(
          135deg,
          ${theme.palette.error.light}22 0%,
          ${theme.palette.error.light}11 100%
        )`
      : `linear-gradient(
          135deg,
          rgba(244, 67, 54, 0.125) 0%,
          rgba(244, 67, 54, 0.0625) 100%
        )`};
  border-bottom: 2px solid ${({ theme }) => theme.palette.error.main};
  padding: 24px 32px;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.error.main};
  text-align: center;

  ${max("sm")} {
    padding: 20px 24px;
    font-size: 18px;
  }
`;

export const StyledDialogContent = styled(DialogContent)`
  padding: 32px;
  text-align: center;
  background-color: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? theme.palette.background.default
      : "#f5f5f5"};

  ${max("sm")} {
    padding: 24px;
  }
`;

export const StyledDialogActions = styled(DialogActions)`
  padding: 24px 32px;
  background-color: ${({ theme }) =>
    theme.palette.mode === "dark" ? theme.palette.background.paper : "#ffffff"};
  border-top: 1px solid
    ${({ theme }) =>
      theme.palette.mode === "dark" ? theme.palette.divider : "#e0e0e0"};

  ${max("sm")} {
    padding: 20px 24px;
  }
`;

export const MessageContainer = styled(Box)`
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) =>
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.87)" : "#000000de"};

  strong {
    color: ${({ theme }) => theme.palette.error.main};
    font-weight: 600;
  }

  ${max("sm")} {
    font-size: 15px;
  }
`;

export const ActionsContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 12px;

  ${max("sm")} {
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

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "0 4px 12px rgba(255, 255, 255, 0.15)"
        : "0 4px 12px rgba(0, 0, 0, 0.15)"};
  }

  ${max("sm")} {
    width: 100%;
    padding: 14px 24px;
  }
`;

export const DeleteButton = styled(Button)`
  border-radius: 8px;
  font-weight: 600;
  padding: 12px 24px;
  text-transform: none;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px
      ${({ theme }) =>
        theme.palette.mode === "dark"
          ? "rgba(244, 67, 54, 0.3)"
          : "rgba(244, 67, 54, 0.3)"};
  }

  ${max("sm")} {
    width: 100%;
    padding: 14px 24px;
  }
`;
