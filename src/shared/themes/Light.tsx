import { createTheme } from "@mui/material";
import { blue, indigo, grey, teal } from "@mui/material/colors";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563eb",
      dark: "#1d4ed8",
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
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
    },
    divider: "#e2e8f0",
    grey: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
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
      contrastText: "#ffffff",
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
      color: "#1e293b",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.3,
      color: "#1e293b",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.4,
      color: "#1e293b",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      color: "#1e293b",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
      color: "#64748b",
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0px 1px 3px rgba(0, 0, 0, 0.05)",
    "0px 1px 6px rgba(0, 0, 0, 0.05)",
    "0px 3px 16px rgba(0, 0, 0, 0.06)",
    "0px 4px 24px rgba(0, 0, 0, 0.08)",
    "0px 6px 32px rgba(0, 0, 0, 0.1)",
    "0px 8px 40px rgba(0, 0, 0, 0.12)",
    "0px 12px 48px rgba(0, 0, 0, 0.14)",
    "0px 16px 56px rgba(0, 0, 0, 0.16)",
    "0px 20px 64px rgba(0, 0, 0, 0.18)",
    "0px 24px 72px rgba(0, 0, 0, 0.2)",
    "0px 28px 80px rgba(0, 0, 0, 0.22)",
    "0px 32px 88px rgba(0, 0, 0, 0.24)",
    "0px 36px 96px rgba(0, 0, 0, 0.26)",
    "0px 40px 104px rgba(0, 0, 0, 0.28)",
    "0px 44px 112px rgba(0, 0, 0, 0.3)",
    "0px 48px 120px rgba(0, 0, 0, 0.32)",
    "0px 52px 128px rgba(0, 0, 0, 0.34)",
    "0px 56px 136px rgba(0, 0, 0, 0.36)",
    "0px 60px 144px rgba(0, 0, 0, 0.38)",
    "0px 64px 152px rgba(0, 0, 0, 0.4)",
    "0px 68px 160px rgba(0, 0, 0, 0.42)",
    "0px 72px 168px rgba(0, 0, 0, 0.44)",
    "0px 76px 176px rgba(0, 0, 0, 0.46)",
    "0px 80px 184px rgba(0, 0, 0, 0.48)",
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
          border: "1px solid #e2e8f0",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});
