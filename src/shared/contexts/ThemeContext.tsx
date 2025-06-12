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

interface IThemeContextData {
  themeName: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => useContext(ThemeContext);

interface IAppThemeProviderProps {
  children: React.ReactNode;
}

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
