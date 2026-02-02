import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#64b5f6',      // Azul claro para dark mode
      dark: '#42a5f5',
      light: '#90caf9',
      contrastText: '#000000',
    },
    secondary: {
      main: '#ce93d8',      // Roxo claro para dark mode
      dark: '#ba68c8',
      light: '#e1bee7',
      contrastText: '#000000',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
    },
    warning: {
      main: '#ffa726',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    info: {
      main: '#29b6f6',
      light: '#4fc3f7',
      dark: '#0288d1',
    },
    success: {
      main: '#66bb6a',
      light: '#81c784',
      dark: '#4caf50',
    },
    background: {
      default: '#0a1929',   // Azul escuro muito escuro
      paper: '#1a2332',     // Azul escuro
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      color: '#ffffff',
    },
    h2: {
      fontWeight: 700,
      color: '#ffffff',
    },
    h3: {
      fontWeight: 600,
      color: '#ffffff',
    },
    h4: {
      fontWeight: 600,
      color: '#ffffff',
    },
    h5: {
      fontWeight: 600,
      color: '#ffffff',
    },
    h6: {
      fontWeight: 600,
      color: '#ffffff',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
    allVariants: {
      color: '#ffffff',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0,0,0,0.3)',
    '0px 4px 8px rgba(0,0,0,0.35)',
    '0px 6px 12px rgba(0,0,0,0.4)',
    '0px 8px 16px rgba(0,0,0,0.45)',
    '0px 10px 20px rgba(0,0,0,0.5)',
    '0px 12px 24px rgba(0,0,0,0.55)',
    '0px 14px 28px rgba(0,0,0,0.6)',
    '0px 16px 32px rgba(0,0,0,0.65)',
    '0px 18px 36px rgba(0,0,0,0.7)',
    '0px 20px 40px rgba(0,0,0,0.75)',
    '0px 22px 44px rgba(0,0,0,0.8)',
    '0px 24px 48px rgba(0,0,0,0.85)',
    '0px 26px 52px rgba(0,0,0,0.9)',
    '0px 28px 56px rgba(0,0,0,0.95)',
    '0px 30px 60px rgba(0,0,0,1)',
    '0px 32px 64px rgba(0,0,0,1)',
    '0px 34px 68px rgba(0,0,0,1)',
    '0px 36px 72px rgba(0,0,0,1)',
    '0px 38px 76px rgba(0,0,0,1)',
    '0px 40px 80px rgba(0,0,0,1)',
    '0px 42px 84px rgba(0,0,0,1)',
    '0px 44px 88px rgba(0,0,0,1)',
    '0px 46px 92px rgba(0,0,0,1)',
    '0px 48px 96px rgba(0,0,0,1)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '0.95rem',
        },
        contained: {
          boxShadow: '0 2px 8px rgba(100, 181, 246, 0.35)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(100, 181, 246, 0.45)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: 'none',
          backgroundColor: '#1a2332',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1a2332',
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.15)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.25)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#64b5f6',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});