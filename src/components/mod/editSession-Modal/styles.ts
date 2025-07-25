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
    border-radius: 20px;
    box-shadow: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "0 20px 60px rgba(0, 0, 0, 0.8), 0 8px 25px rgba(0, 0, 0, 0.6)"
        : "0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 25px rgba(0, 0, 0, 0.08)"};
    padding: 0;
    background: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[100]})`
        : `linear-gradient(145deg, #ffffff, #f8fafc)`};
    border: 1px solid ${({ theme }) => theme.palette.divider};
    max-width: 480px;
    width: 100%;
    margin: 20px;
    overflow: hidden;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(
        90deg,
        ${({ theme }) => theme.palette.primary.main},
        ${({ theme }) => theme.palette.secondary.main}
      );
    }

    ${max("sm")} {
      margin: 16px;
      border-radius: 16px;
      max-width: calc(100vw - 32px);
    }
  }

  .MuiBackdrop-root {
    background: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "rgba(0, 0, 0, 0.8)"
        : "rgba(0, 0, 0, 0.5)"};
    backdrop-filter: blur(8px);
  }
`;

export const StyledDialogTitle = styled(DialogTitle)`
  font-weight: 800;
  font-size: 1.75rem;
  text-align: center;
  padding: 32px 32px 16px 32px;
  color: ${({ theme }) => theme.palette.text.primary};
  background: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[100]})`
      : `linear-gradient(145deg, #ffffff, #f8fafc)`};
  position: relative;
  letter-spacing: -0.5px;
  line-height: 1.2;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: ${({ theme }) => theme.palette.primary.main};
    border-radius: 2px;
  }

  ${max("sm")} {
    font-size: 1.5rem;
    padding: 24px 24px 16px 24px;

    &::after {
      width: 40px;
      height: 2px;
    }
  }
`;

export const StyledDivider = styled(Divider)`
  border-color: ${({ theme }) => theme.palette.divider};
  margin: 16px 0;
  opacity: 0.7;
`;

export const StyledDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 24px 32px;
  background: ${({ theme }) => theme.palette.background.default};
  position: relative;

  ${max("sm")} {
    gap: 24px;
    padding: 20px 24px;
  }
`;

export const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    border-radius: 12px;
    background: ${({ theme }) => theme.palette.background.paper};
    border: 2px solid ${({ theme }) => theme.palette.divider};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: 500;
    box-shadow: ${({ theme }) => theme.shadows[1]};

    &:hover {
      border-color: ${({ theme }) => theme.palette.primary.light};
      box-shadow: ${({ theme }) => theme.shadows[3]};
      transform: translateY(-1px);
    }

    &.Mui-focused {
      border-color: ${({ theme }) => theme.palette.primary.main};
      box-shadow: 0 0 0 4px
        ${({ theme }) =>
          theme.palette.mode === "dark"
            ? "rgba(59, 130, 246, 0.15)"
            : "rgba(37, 99, 235, 0.1)"};
      transform: translateY(-2px);
    }

    &.Mui-error {
      border-color: ${({ theme }) => theme.palette.error.main};

      &:hover,
      &.Mui-focused {
        border-color: ${({ theme }) => theme.palette.error.main};
        box-shadow: 0 0 0 4px
          ${({ theme }) =>
            theme.palette.mode === "dark"
              ? "rgba(239, 68, 68, 0.15)"
              : "rgba(239, 68, 68, 0.1)"};
      }
    }
  }

  .MuiInputLabel-root {
    font-weight: 600;
    font-size: 14px;
    color: ${({ theme }) => theme.palette.text.secondary};

    &.Mui-focused {
      color: ${({ theme }) => theme.palette.primary.main};
      font-weight: 700;
    }
  }

  .MuiSelect-select {
    padding: 16px 20px;
    font-weight: 500;
  }

  .MuiOutlinedInput-input {
    padding: 16px 20px;
    font-weight: 500;
  }

  .MuiFormHelperText-root {
    margin-left: 8px;
    margin-top: 8px;
    font-weight: 500;
  }

  ${max("sm")} {
    .MuiInputBase-root {
      border-radius: 10px;
    }

    .MuiOutlinedInput-input,
    .MuiSelect-select {
      padding: 14px 16px;
    }
  }
`;

export const StyledDialogActions = styled(DialogActions)`
  justify-content: space-between;
  padding: 24px 32px 32px 32px;
  background: ${({ theme }) => theme.palette.background.paper};
  border-top: 1px solid ${({ theme }) => theme.palette.divider};
  gap: 16px;

  ${max("sm")} {
    padding: 20px 24px 24px 24px;
    flex-direction: column-reverse;
    gap: 12px;
  }
`;

export const CancelButton = styled(Button)`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-weight: 600;
  border-radius: 10px;
  padding: 14px 28px;
  text-transform: none;
  font-size: 15px;
  border: 2px solid ${({ theme }) => theme.palette.divider};
  background: ${({ theme }) => theme.palette.background.paper};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 120px;

  &:hover {
    background: ${({ theme }) => theme.palette.action.hover};
    border-color: ${({ theme }) => theme.palette.text.secondary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows[3]};
  }

  &:active {
    transform: translateY(0);
  }

  ${max("sm")} {
    width: 100%;
    padding: 16px 28px;
    font-size: 16px;
  }
`;

export const SaveButton = styled(Button)`
  border-radius: 10px;
  padding: 14px 32px;
  font-weight: 700;
  text-transform: none;
  font-size: 15px;
  min-width: 140px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.palette.primary.main},
    ${({ theme }) => theme.palette.primary.dark}
  );
  box-shadow: ${({ theme }) => theme.shadows[4]};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.6s ease;
  }

  &:hover {
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.palette.primary.dark},
      ${({ theme }) => theme.palette.primary.main}
    );
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows[8]};

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
  }

  &:disabled {
    background: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? theme.palette.grey[200]
        : theme.palette.grey[300]};
    color: ${({ theme }) => theme.palette.text.disabled};
    box-shadow: none;
    transform: none;
  }

  ${max("sm")} {
    width: 100%;
    padding: 16px 32px;
    font-size: 16px;
  }
`;

export const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;

  ${max("sm")} {
    gap: 24px;
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  box-shadow: ${({ theme }) => theme.shadows[1]};
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.palette.primary.main},
      ${({ theme }) => theme.palette.secondary.main}
    );
    border-radius: 16px 16px 0 0;
  }

  ${max("sm")} {
    gap: 16px;
    padding: 20px;
    border-radius: 12px;
  }
`;

export const FieldLabel = styled.h3`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.text.primary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "";
    width: 4px;
    height: 16px;
    background: ${({ theme }) => theme.palette.primary.main};
    border-radius: 2px;
  }

  ${max("sm")} {
    font-size: 14px;
    margin-bottom: 12px;

    &::before {
      width: 3px;
      height: 14px;
    }
  }
`;
