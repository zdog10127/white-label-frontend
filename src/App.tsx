import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./shared/routes/AppRoutes";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import { SideBar } from "./components/side-bar/SideBar";
import {
  DrawerProvider,
  useDrawerContext,
} from "./shared/contexts/IndexContexts";
import { AuthProvider, useAuth } from "./shared/contexts/AuthContext";
import Header from "./components/Header";
import { CircularProgress } from "@mui/material";

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <BrowserRouter>
      {user ? (
        <>
          <AppRoutes />
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
