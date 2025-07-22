import { styled } from "@mui/material/styles";
import { Dialog, DialogTitle, Box, Chip } from "@mui/material";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    maxWidth: "500px",
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
  display: "flex",
  alignItems: "center",
  gap: "12px",
  color: theme.palette.error.main,
  [theme.breakpoints.down("sm")]: {
    padding: "20px 24px",
  },
}));

export const IconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px",
  "& .icon": {
    fontSize: "64px",
    color: theme.palette.error.main,
    opacity: 0.8,
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: "16px",
    "& .icon": {
      fontSize: "48px",
    },
  },
}));

export const PermissionChip = styled(Chip)(({ theme }) => ({
  margin: "2px",
  backgroundColor: theme.palette.error.light + "20",
  color: theme.palette.error.main,
  border: `1px solid ${theme.palette.error.light}`,
  fontWeight: 500,
  fontSize: "12px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "11px",
  },
}));

export const UserPermissionChip = styled(Chip)(({ theme }) => ({
  margin: "2px",
  backgroundColor: theme.palette.primary.light + "20",
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.light}`,
  fontWeight: 500,
  fontSize: "12px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "11px",
  },
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
  padding: "32px",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    padding: "24px",
  },
}));

export const ActionsContainer = styled(Box)(({ theme }) => ({
  padding: "24px 32px",
  display: "flex",
  gap: "12px",
  justifyContent: "flex-end",
  [theme.breakpoints.down("sm")]: {
    padding: "20px 24px",
    flexDirection: "column-reverse",
    gap: "8px",
  },
}));

export const StyledButton = styled(Box)(({ theme }) => ({
  "& .MuiButton-root": {
    borderRadius: "8px",
    fontWeight: 600,
    padding: "12px 24px",
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
  },
}));
