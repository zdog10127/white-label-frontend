import { ReactNode, CSSProperties } from "react";

export interface IDrawerOptions {
  icon: ReactNode;
  path: string;
  label: string;
  flexDirection?: CSSProperties["flexDirection"];
}

export interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
  drawerOptions: IDrawerOptions[];
  setDrawerOptions: (newDrawerOptions: IDrawerOptions[]) => void;
}

export interface DrawerProviderProps {
  children: ReactNode;
}
