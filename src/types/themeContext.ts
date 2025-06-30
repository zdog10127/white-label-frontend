export interface IThemeContextData {
  themeName: "light" | "dark";
  toggleTheme: () => void;
}

export interface IAppThemeProviderProps {
  children: React.ReactNode;
}
