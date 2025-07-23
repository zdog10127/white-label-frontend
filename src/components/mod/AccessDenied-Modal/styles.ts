import styled from "styled-components";
import { Dialog, DialogTitle, Box, Chip } from "@mui/material";
import { max } from "../../../constants/responsiveClient";

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 16px;
    max-width: 500px;
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
      ? `linear-gradient(135deg, ${theme.palette.error.light}22 0%, ${theme.palette.error.light}11 100%)`
      : `linear-gradient(135deg, rgba(244, 67, 54, 0.125) 0%, rgba(244, 67, 54, 0.0625) 100%)`};
  border-bottom: 2px solid ${({ theme }) => theme.palette.error.main};
  padding: 24px 32px;
  display: flex;
  align-items: center;
  gap: 12px;

  color: ${({ theme }) => theme.palette.error.main};

  ${max("sm")} {
    padding: 20px 24px;
  }
`;

export const IconContainer = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  .icon {
    font-size: 64px;
    color: ${({ theme }) => theme.palette.error.main};
    opacity: 0.8;
  }

  ${max("sm")} {
    margin-bottom: 16px;

    .icon {
      font-size: 48px;
    }
  }
`;

export const PermissionChip = styled(Chip)`
  margin: 2px;
  background-color: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? "rgba(244, 67, 54, 0.2)"
      : "rgba(244, 67, 54, 0.125)"};
  color: ${({ theme }) => theme.palette.error.main};
  border: 1px solid
    ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "rgba(244, 67, 54, 0.7)"
        : "rgba(244, 67, 54, 0.5)"};
  font-weight: 500;
  font-size: 12px;

  ${max("sm")} {
    font-size: 11px;
  }
`;

export const UserPermissionChip = styled(Chip)`
  margin: 2px;
  background-color: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? "rgba(33, 150, 243, 0.2)"
      : "rgba(33, 150, 243, 0.125)"};
  color: ${({ theme }) => theme.palette.primary.main};
  border: 1px solid
    ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "rgba(33, 150, 243, 0.7)"
        : "rgba(33, 150, 243, 0.5)"};
  font-weight: 500;
  font-size: 12px;

  ${max("sm")} {
    font-size: 11px;
  }
`;

export const ContentContainer = styled(Box)`
  padding: 32px;
  text-align: center;

  ${max("sm")} {
    padding: 24px;
  }
`;

export const ActionsContainer = styled(Box)`
  padding: 24px 32px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;

  ${max("sm")} {
    padding: 20px 24px;
    flex-direction: column-reverse;
    gap: 8px;
  }
`;

export const StyledButton = styled(Box)`
  .MuiButton-root {
    border-radius: 8px;
    font-weight: 600;
    padding: 12px 24px;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px
        ${({ theme }) =>
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.15)"
            : "rgba(0, 0, 0, 0.15)"};
    }

    ${max("sm")} {
      width: 100%;
      padding: 14px 24px;
    }
  }
`;
