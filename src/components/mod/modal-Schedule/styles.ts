import { styled } from "@mui/material/styles";
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

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    maxWidth: "600px",
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
      ? `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[900]} 100%)`
      : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[100]} 100%)`,
  borderBottom: `2px solid ${theme.palette.divider}`,
  padding: "24px 32px",
  fontSize: "20px",
  fontWeight: 700,
  color: theme.palette.text.primary,
  [theme.breakpoints.down("sm")]: {
    padding: "20px 24px",
    fontSize: "18px",
  },
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: "32px",
  background: theme.palette.background.default,
  [theme.breakpoints.down("sm")]: {
    padding: "24px",
  },
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: "24px 32px",
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  gap: "12px",
  [theme.breakpoints.down("sm")]: {
    padding: "20px 24px",
    flexDirection: "column-reverse",
    "& > :not(:first-of-type)": {
      marginLeft: 0,
      marginBottom: "8px",
    },
  },
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: "12px",
  fontSize: "16px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  [theme.breakpoints.down("sm")]: {
    fontSize: "15px",
    marginBottom: "10px",
  },
}));

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(
  ({ theme }) => ({
    marginBottom: "24px",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "12px",
    border: `1px solid ${theme.palette.divider}`,
    overflow: "hidden",
    "& .MuiToggleButton-root": {
      borderRadius: "0",
      padding: "14px 24px",
      fontSize: "14px",
      fontWeight: 500,
      border: "none",
      color: theme.palette.text.secondary,
      transition: "all 0.2s ease",
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
        color: theme.palette.text.primary,
      },
      "&.Mui-selected": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
        },
      },
      "&:not(:last-of-type)": {
        borderRight: `1px solid ${theme.palette.divider}`,
      },
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "20px",
      "& .MuiToggleButton-root": {
        padding: "12px 16px",
        fontSize: "13px",
      },
    },
  })
);

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "20px",
  "& .MuiOutlinedInput-root": {
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
    fontSize: "14px",
    fontWeight: 500,
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: "16px",
  },
}));

export const TimeContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "12px",
  marginBottom: "20px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "8px",
    marginBottom: "16px",
  },
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: "20px",
  "& .MuiOutlinedInput-root": {
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
    fontSize: "14px",
    fontWeight: 500,
  },
  "& .MuiSelect-select": {
    padding: "14px 16px",
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: "16px",
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
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
  "&.MuiButton-contained": {
    "&:disabled": {
      backgroundColor: theme.palette.action.disabled,
      color: theme.palette.text.disabled,
    },
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "14px 24px",
  },
}));

export const FieldGroup = styled(Box)(({ theme }) => ({
  marginBottom: "24px",
  [theme.breakpoints.down("sm")]: {
    marginBottom: "20px",
  },
}));

export const RequiredLabel = styled(Typography)(({ theme }) => ({
  marginBottom: "12px",
  fontSize: "14px",
  fontWeight: 500,
  color: theme.palette.text.primary,
  "& .required": {
    color: theme.palette.error.main,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "13px",
    marginBottom: "10px",
  },
}));
