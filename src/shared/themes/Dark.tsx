import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3b82f6",
      dark: "#2563eb",
      light: "#60a5fa",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#06b6d4",
      dark: "#0891b2",
      light: "#67e8f9",
      contrastText: "#ffffff",
    },
    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },
    text: {
      primary: "#f8fafc",
      secondary: "#cbd5e1",
    },
    divider: "#334155",
    grey: {
      50: "#0f172a",
      100: "#1e293b",
      200: "#334155",
      300: "#475569",
      400: "#64748b",
      500: "#94a3b8",
      600: "#cbd5e1",
      700: "#e2e8f0",
      800: "#f1f5f9",
      900: "#f8fafc",
    },
    success: {
      main: "#10b981",
      dark: "#059669",
      light: "#34d399",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#f59e0b",
      dark: "#d97706",
      light: "#fbbf24",
      contrastText: "#000000",
    },
    error: {
      main: "#ef4444",
      dark: "#dc2626",
      light: "#f87171",
      contrastText: "#ffffff",
    },
    info: {
      main: "#3b82f6",
      dark: "#2563eb",
      light: "#60a5fa",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.2,
      color: "#f8fafc",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.3,
      color: "#f8fafc",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.4,
      color: "#f8fafc",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      color: "#f8fafc",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
      color: "#cbd5e1",
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0px 1px 3px rgba(0, 0, 0, 0.3)",
    "0px 1px 6px rgba(0, 0, 0, 0.3)",
    "0px 3px 16px rgba(0, 0, 0, 0.4)",
    "0px 4px 24px rgba(0, 0, 0, 0.4)",
    "0px 6px 32px rgba(0, 0, 0, 0.5)",
    "0px 8px 40px rgba(0, 0, 0, 0.5)",
    "0px 12px 48px rgba(0, 0, 0, 0.6)",
    "0px 16px 56px rgba(0, 0, 0, 0.6)",
    "0px 20px 64px rgba(0, 0, 0, 0.7)",
    "0px 24px 72px rgba(0, 0, 0, 0.7)",
    "0px 28px 80px rgba(0, 0, 0, 0.8)",
    "0px 32px 88px rgba(0, 0, 0, 0.8)",
    "0px 36px 96px rgba(0, 0, 0, 0.9)",
    "0px 40px 104px rgba(0, 0, 0, 0.9)",
    "0px 44px 112px rgba(0, 0, 0, 1)",
    "0px 48px 120px rgba(0, 0, 0, 1)",
    "0px 52px 128px rgba(0, 0, 0, 1)",
    "0px 56px 136px rgba(0, 0, 0, 1)",
    "0px 60px 144px rgba(0, 0, 0, 1)",
    "0px 64px 152px rgba(0, 0, 0, 1)",
    "0px 68px 160px rgba(0, 0, 0, 1)",
    "0px 72px 168px rgba(0, 0, 0, 1)",
    "0px 76px 176px rgba(0, 0, 0, 1)",
    "0px 80px 184px rgba(0, 0, 0, 1)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
          padding: "10px 20px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: "1px solid #334155",
          backgroundColor: "#1e293b",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: "#1e293b",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#cbd5e1",
          "&:hover": {
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            color: "#3b82f6",
          },
        },
      },
    },
  },
});
