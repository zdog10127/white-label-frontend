import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
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
  background:
    theme.palette.mode === "dark"
      ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`
      : `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: "24px 32px",
  fontSize: "20px",
  fontWeight: 700,
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  [theme.breakpoints.down("sm")]: {
    padding: "20px 24px",
    fontSize: "18px",
  },
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: "32px",
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down("sm")]: {
    padding: "24px",
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginTop: "16px",
  "& .MuiInputBase-root": {
    borderRadius: "12px",
    backgroundColor: theme.palette.background.paper,
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow:
        theme.palette.mode === "dark"
          ? "0 4px 12px rgba(0,0,0,0.3)"
          : "0 4px 12px rgba(0,0,0,0.08)",
    },
    "&.Mui-focused": {
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
    },
  },
  "& .MuiInputLabel-root": {
    fontWeight: 500,
    fontSize: "14px",
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.divider,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.light,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: "2px",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& .MuiInputBase-root": {
      borderRadius: "8px",
    },
  },
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: "24px 32px",
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  gap: "12px",
  justifyContent: "flex-end",
  [theme.breakpoints.down("sm")]: {
    padding: "20px 24px",
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
  color: theme.palette.text.secondary,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translateY(-1px)",
    color: theme.palette.text.primary,
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "14px 24px",
  },
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  fontWeight: 600,
  padding: "12px 24px",
  textTransform: "none",
  fontSize: "14px",
  transition: "all 0.2s ease",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 12px rgba(0,0,0,0.4)"
      : "0 4px 12px rgba(0,0,0,0.15)",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 6px 20px rgba(0,0,0,0.5)"
        : "0 6px 20px rgba(0,0,0,0.2)",
  },
  "&:disabled": {
    backgroundColor: theme.palette.action.disabled,
    color: theme.palette.text.disabled,
    boxShadow: "none",
    transform: "none",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "14px 24px",
  },
}));

export const IconContainer = styled("span")(() => ({
  fontSize: "20px",
  marginRight: "4px",
}));
