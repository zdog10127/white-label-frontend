import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./shared/routes/AppRoutes";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import { DrawerProvider } from "./shared/contexts/IndexContexts";
import { AuthProvider, useAuth } from "./shared/contexts/AuthContext";
import Loading from "./shared/loading/loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const AppContent: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
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
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </DrawerProvider>
    </AuthProvider>
  </AppThemeProvider>
);