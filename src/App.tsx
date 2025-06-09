import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./shared/routes";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import { MenuLateral } from "./componentes/Index";
import { DrawerProvider } from "./shared/contexts";
import { AuthProvider, useAuth } from "./shared/contexts/AuthContext";

const AppContent = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      {user ? (
        <MenuLateral>
          <AppRoutes />
        </MenuLateral>
      ) : (
        <AppRoutes />
      )}
    </BrowserRouter>
  );
};

export const App = () => {
  return (
    <AppThemeProvider>
      <AuthProvider>
      <DrawerProvider>
        
            <AppContent />
         
      </DrawerProvider>
      </AuthProvider>
    </AppThemeProvider>
  );
};
