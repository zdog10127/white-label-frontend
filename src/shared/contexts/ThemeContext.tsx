import {
  createContext,
  useCallback,
  useState,
  useMemo,
  useContext,
} from "react";
import { ThemeProvider } from "@mui/material/styles";
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
      <ThemeProvider theme={theme}>
        <Box
          width="100vw"
          height="100vh"
          sx={{ backgroundColor: theme.palette.background.default }}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
