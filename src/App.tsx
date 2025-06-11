import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./shared/routes/AppRoutes";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import { SideBar } from "./componentes/side-bar/SideBar";
import { DrawerProvider, useDrawerContext } from "./shared/contexts";
import { AuthProvider, useAuth } from "./shared/contexts/AuthContext";
import Header from "./componentes/Header";

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <BrowserRouter>
      {user ? (
        <>
          <Header onMenuClick={toggleDrawerOpen} />
          <SideBar>
            <AppRoutes />
          </SideBar>
        </>
      ) : (
        <AppRoutes />
      )}
    </BrowserRouter>
  );
};

export const App: React.FC = () => (
  <AppThemeProvider>
    <AuthProvider>
      <DrawerProvider>
        <AppContent />
      </DrawerProvider>
    </AuthProvider>
  </AppThemeProvider>
);
