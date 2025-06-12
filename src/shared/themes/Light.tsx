import { createTheme } from "@mui/material";
import { blue, blueGrey, grey, cyan } from "@mui/material/colors";

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: blue[700],
      dark: blue[800],
      light: blueGrey[500],
      contrastText: "#000000",
    },

    secondary: {
      main: grey[500],
      dark: blue[400],
      light: blueGrey[300],
      contrastText: "#000000",
    },
    background: {
      default: "#ffffff",
      paper: "#f7f6f3",
    },
  },
});
