import { createTheme } from "@mui/material";
import { blue, blueGrey, grey, yellow } from "@mui/material/colors";
import { dark } from "@mui/material/styles/createPalette";

export const DarkTheme = createTheme({
    palette: {mode: "dark",
        primary: {
            main: yellow[700],
            dark: blue[800],
            light: blueGrey[500],
            contrastText: '#000000',
        },

        secondary: {
            main: grey[500],
            dark: blue[400],
            light: blueGrey[300],
            contrastText: '#000000',
        },
        background: {
            default: '#303134',
            paper: '#202124',
        }
    },
    typography: {
        allVariants: {
            color: "white",
        }
    }
});
