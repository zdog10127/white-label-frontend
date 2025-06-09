import { createContext, useCallback, useState, useContext, ReactNode, CSSProperties  } from "react";

interface IDrawerOptions {
  icon: ReactNode;
  path: string;
  label: string;
  flexDirection?: CSSProperties["flexDirection"];
}

interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
  drawerOptions: IDrawerOptions[];
  setDrawerOptions: (newDrawerOptions: IDrawerOptions[]) => void;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => useContext(DrawerContext);

interface IAppThemeProviderProps {
  children: React.ReactNode;
}

export const DrawerProvider: React.FC<IAppThemeProviderProps> = ({children}) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([]);

  const toggleDrawerOpen = useCallback(() => {
    setDrawerOpen((oldDrawerOpen) => !oldDrawerOpen);
  }, []);

   const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOptions[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions }}>
      {children}
    </DrawerContext.Provider>
  );
};
