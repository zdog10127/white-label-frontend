import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./shared/routes/AppRoutes";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import { DrawerProvider } from "./shared/contexts/IndexContexts";
import { AuthProvider, useAuth } from "./shared/contexts/AuthContext";
import { CircularProgress } from "@mui/material";
import "@fortawesome/fontawesome-free/css/all.min.css";

const AppContent: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CircularProgress size={60} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppRoutes />
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
