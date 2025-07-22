import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Divider,
} from "@mui/material";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "12px",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 24px 48px rgba(0,0,0,0.5)"
        : "0 8px 20px rgba(0,0,0,0.12)",
    padding: "16px",
    backgroundColor: theme.palette.background.paper,
    maxWidth: "400px",
    width: "100%",
    margin: "16px",
    [theme.breakpoints.down("sm")]: {
      margin: "8px",
      padding: "12px",
      borderRadius: "8px",
      maxWidth: "95%",
    },
  },
}));

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.5rem",
  textAlign: "center",
  paddingBottom: "8px",
  color: theme.palette.text.primary,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.3rem",
  },
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.divider,
  marginBottom: "16px",
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  marginTop: "16px",
  padding: "0 24px",
  [theme.breakpoints.down("sm")]: {
    gap: "20px",
    padding: "0 16px",
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: "12px",
    backgroundColor: theme.palette.background.default,
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
  },
  "& .MuiSelect-select": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
  [theme.breakpoints.down("sm")]: {
    "& .MuiInputBase-root": {
      borderRadius: "8px",
    },
  },
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  justifyContent: "space-between",
  padding: "16px 24px",
  paddingBottom: "16px",
  paddingTop: "8px",
  [theme.breakpoints.down("sm")]: {
    padding: "16px",
    flexDirection: "column-reverse",
    gap: "8px",
  },
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 600,
  borderRadius: "8px",
  padding: "12px 24px",
  textTransform: "none",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translateY(-1px)",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "14px 24px",
  },
}));

export const SaveButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  padding: "12px 32px",
  fontWeight: 700,
  textTransform: "none",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 12px rgba(0,0,0,0.4)"
      : "0 4px 10px rgba(0,0,0,0.12)",
  transition: "all 0.2s ease",
  "&:hover": {
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 6px 20px rgba(0,0,0,0.5)"
        : "0 6px 15px rgba(0,0,0,0.18)",
    transform: "translateY(-1px)",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "14px 32px",
  },
}));

export const FieldsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  [theme.breakpoints.down("sm")]: {
    gap: "20px",
  },
}));
