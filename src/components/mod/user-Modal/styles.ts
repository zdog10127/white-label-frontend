import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  TableHead,
  TableRow,
  Box,
  Chip,
} from "@mui/material";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    maxWidth: "700px",
    width: "100%",
    margin: "16px",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 24px 48px rgba(0,0,0,0.5)"
        : "0 24px 48px rgba(0,0,0,0.15)",
    [theme.breakpoints.down("sm")]: {
      margin: "8px",
      borderRadius: "12px",
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
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    padding: "20px 24px",
  },
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: "32px",
  background: theme.palette.background.default,
  [theme.breakpoints.down("sm")]: {
    padding: "24px",
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
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
}));

export const TableContainer = styled(Box)(({ theme }) => ({
  maxHeight: "400px",
  overflowY: "auto",
  marginTop: "20px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "12px",
  backgroundColor: theme.palette.background.paper,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 16px rgba(0,0,0,0.3)"
      : "0 4px 16px rgba(0,0,0,0.08)",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: theme.palette.action.hover,
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.text.disabled,
    borderRadius: "3px",
  },
}));

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 1,
  background:
    theme.palette.mode === "dark"
      ? theme.palette.grey[800]
      : theme.palette.grey[100],
  "& .MuiTableCell-root": {
    fontWeight: 700,
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    color: theme.palette.text.primary,
    borderBottom: `2px solid ${theme.palette.divider}`,
    padding: "20px 24px",
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "scale(1.002)",
  },
  "& .MuiTableCell-root": {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: "16px 24px",
  },
}));

export const UserInfo = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
}));

export const UserDetails = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  flex: 1,
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
}));

export const HeaderInfo = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flex: 1,
}));

export const CloseButton = styled(Button)(({ theme }) => ({
  minWidth: "40px",
  width: "40px",
  height: "40px",
  padding: 0,
  borderRadius: "50%",
  color: theme.palette.text.secondary,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
}));

export const ResultsChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main + "20",
  color: theme.palette.primary.main,
  fontWeight: 600,
  "& .MuiChip-label": {
    fontSize: "12px",
  },
}));

export const EmptyState = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: "60px 20px",
  color: theme.palette.text.secondary,
  "& .icon": {
    fontSize: "48px",
    marginBottom: "16px",
    opacity: 0.7,
  },
}));
