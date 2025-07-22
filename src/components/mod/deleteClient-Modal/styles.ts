import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    maxWidth: "450px",
    width: "100%",
    margin: "16px",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 24px 48px rgba(0,0,0,0.5)"
        : "0 24px 48px rgba(0,0,0,0.15)",
    [theme.breakpoints.down("sm")]: {
      margin: "8px",
      borderRadius: "12px",
      maxWidth: "95%",
    },
  },
}));

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.error.main}20 0%, ${theme.palette.error.light}10 100%)`,
  borderBottom: `2px solid ${theme.palette.error.main}`,
  padding: "24px 32px",
  fontSize: "20px",
  fontWeight: 700,
  color: theme.palette.error.main,
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    padding: "20px 24px",
    fontSize: "18px",
  },
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: "32px",
  textAlign: "center",
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down("sm")]: {
    padding: "24px",
  },
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: "24px 32px",
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down("sm")]: {
    padding: "20px 24px",
  },
}));

export const MessageContainer = styled(Box)(({ theme }) => ({
  fontSize: "16px",
  lineHeight: 1.6,
  color: theme.palette.text.primary,
  "& strong": {
    color: theme.palette.error.main,
    fontWeight: 600,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "15px",
  },
}));

export const ActionsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  gap: "12px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
    gap: "8px",
  },
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  fontWeight: 600,
  padding: "12px 24px",
  textTransform: "none",
  fontSize: "14px",
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 4px 12px rgba(0,0,0,0.4)"
        : "0 4px 12px rgba(0,0,0,0.15)",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "14px 24px",
  },
}));

export const DeleteButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  fontWeight: 600,
  padding: "12px 24px",
  textTransform: "none",
  fontSize: "14px",
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 4px 12px rgba(244,67,54,0.4)"
        : "0 4px 12px rgba(244,67,54,0.3)",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "14px 24px",
  },
}));
