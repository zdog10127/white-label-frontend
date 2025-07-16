import {
  createContext,
  useCallback,
  useState,
  useMemo,
  useContext,
} from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { Box } from "@mui/system";
import { DarkTheme, lightTheme } from "../themes";
import {
  IThemeContextData,
  IAppThemeProviderProps,
} from "../../types/themeContext";

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => useContext(ThemeContext);

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({
  children,
}) => {
  const [themeName, setThemeName] = useState<"light" | "dark">("light");

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) =>
      oldThemeName === "light" ? "dark" : "light"
    );
  }, []);

  const theme = useMemo(() => {
    return themeName === "light" ? lightTheme : DarkTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <Box
            width="100vw"
            height="100vh"
            sx={{ backgroundColor: theme.palette.background.default }}
          >
            {children}
          </Box>
        </StyledThemeProvider>
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
