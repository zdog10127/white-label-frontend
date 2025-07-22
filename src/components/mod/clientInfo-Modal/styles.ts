import styled from "styled-components";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 16px;
    padding: 8px;
    box-shadow: ${({ theme }) =>
      theme.palette.mode === "dark"
        ? "0 8px 32px rgba(255, 255, 255, 0.1)"
        : "0 8px 32px rgba(0, 0, 0, 0.1)"};
  }
`;

export const StyledDialogTitle = styled(DialogTitle)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  margin: 0;
  padding: 16px;
  border-radius: 16px 16px 0 0;
`;

export const StyledDialogContent = styled(DialogContent)`
  padding: 24px;

  .MuiTypography-root {
    margin-bottom: 8px;
    font-size: 0.95rem;

    strong {
      color: ${({ theme }) =>
        theme.palette.mode === "dark"
          ? "rgba(255, 255, 255, 0.87)"
          : "rgba(0, 0, 0, 0.87)"};
      font-weight: 600;
    }
  }

  .MuiGrid-item {
    padding-bottom: 8px;
  }
`;
