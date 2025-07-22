import { styled } from "@mui/material/styles";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1),
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
}));

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontSize: "1.25rem",
  fontWeight: 600,
  textAlign: "center",
  margin: 0,
  padding: theme.spacing(2),
  borderRadius: `${theme.spacing(2)} ${theme.spacing(2)} 0 0`,
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
  "& .MuiTypography-root": {
    marginBottom: theme.spacing(1),
    fontSize: "0.95rem",
    "& strong": {
      color: theme.palette.text.primary,
      fontWeight: 600,
    },
  },
  "& .MuiGrid-item": {
    paddingBottom: theme.spacing(1),
  },
}));
