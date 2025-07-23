import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDrawerContext } from "../contexts/DrawerContext";
import { useEffect } from "react";
import {
  Apartment,
  Article,
  CalendarMonth,
  Campaign,
  Groups2,
  Paid,
  PersonalVideo,
  Settings,
} from "@mui/icons-material";

import { useAuth } from "../contexts/AuthContext";
import {
  PermissionGuard,
  usePermissions,
  ROUTE_PERMISSIONS,
} from "../../components/guards/permissionGuard";

import ProtectedRoute from "./PrivateRoute";
import UserProfile from "../../pages/userPage";
import Login from "../../pages/Login";
import Home from "../../pages/Home";
import ClientList from "../../pages/clientList";
import ClientRegisterReturn from "../../pages/clientRegisterReturn";
import PrivateLayout from "../layouts/PrivateLayout";
import Agenda from "../../pages/schedule";
import FinancialPage from "../../pages/financialPage";
import ReportPage from "../../pages/reportPage";
import MarketingPage from "../../pages/marketingPage";
import SettingsPage from "../../pages/settingsPage";
import MyClinicPage from "../../pages/myClinicPage";
import ChangeEmail from "../../pages/changeEmail";
import ChangePassword from "../../pages/changePassword";
import PermissionUsers from "../../pages/settingsPage/permissionUser/index";

function ChangeEmailWrapper() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <ChangeEmail
      clientEmail={user?.email ?? ""}
      onBack={() => navigate("/perfil")}
    />
  );
}

function ChangePasswordWrapper() {
  const navigate = useNavigate();
  return <ChangePassword onBack={() => navigate("/perfil")} />;
}

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();
  const { canAccessRoute } = usePermissions();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading || !user) {
      return;
    }

    const allDrawerOptions = [
      {
        label: "Painel",
        path: "/home",
        icon: <PersonalVideo fontSize="large" />,
        flexDirection: "column" as const,
      },
      {
        label: "Clientes",
        path: "/clientes",
        icon: <Groups2 fontSize="large" />,
      },
      {
        label: "Agenda",
        path: "/agenda",
        icon: <CalendarMonth fontSize="large" />,
      },
      {
        label: "Financeiro",
        path: "/financeiro",
        icon: <Paid fontSize="large" />,
      },
      {
        label: "Relatórios",
        path: "/relatorios",
        icon: <Article fontSize="large" />,
      },
      {
        label: "Marketing",
        path: "/marketing",
        icon: <Campaign fontSize="large" />,
      },
      {
        label: "Configuração",
        path: "/configuracao",
        icon: <Settings fontSize="large" />,
      },
      {
        label: "Minha Clínica",
        path: "/minhaclinica",
        icon: <Apartment fontSize="large" />,
      },
    ];

    const allowedOptions = allDrawerOptions.filter((option) => {
      const canAccess = canAccessRoute(option.path);

      return canAccess;
    });

    setDrawerOptions(allowedOptions);
  }, [setDrawerOptions, canAccessRoute, user, loading]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<PrivateLayout />}>
          <Route
            path="/home"
            element={
              <PermissionGuard
                requiredPermissions={ROUTE_PERMISSIONS["/home"]}
                routePath="/home"
              >
                <Home />
              </PermissionGuard>
            }
          />

          <Route
            path="/clientes"
            element={
              <PermissionGuard
                requiredPermissions={ROUTE_PERMISSIONS["/clientes"]}
                routePath="/clientes"
              >
                <ClientList />
              </PermissionGuard>
            }
          />

          <Route
            path="/agenda"
            element={
              <PermissionGuard
                requiredPermissions={ROUTE_PERMISSIONS["/agenda"]}
                routePath="/agenda"
              >
                <Agenda />
              </PermissionGuard>
            }
          />

          <Route
            path="/financeiro"
            element={
              <PermissionGuard
                requiredPermissions={ROUTE_PERMISSIONS["/financeiro"]}
                routePath="/financeiro"
              >
                <FinancialPage />
              </PermissionGuard>
            }
          />

          <Route
            path="/relatorios"
            element={
              <PermissionGuard
                requiredPermissions={ROUTE_PERMISSIONS["/relatorios"]}
                routePath="/relatorios"
              >
                <ReportPage />
              </PermissionGuard>
            }
          />

          <Route
            path="/marketing"
            element={
              <PermissionGuard
                requiredPermissions={ROUTE_PERMISSIONS["/marketing"]}
                routePath="/marketing"
              >
                <MarketingPage />
              </PermissionGuard>
            }
          />

          <Route
            path="/configuracao"
            element={
              <PermissionGuard
                requiredPermissions={ROUTE_PERMISSIONS["/configuracao"]}
                routePath="/configuracao"
              >
                <SettingsPage />
              </PermissionGuard>
            }
          />

          <Route
            path="/permissions/:permissionName"
            element={
              <PermissionGuard
                requiredPermissions={
                  ROUTE_PERMISSIONS["/permissions/:permissionName"]
                }
                routePath="/permissions/:permissionName"
              >
                <PermissionUsers />
              </PermissionGuard>
            }
          />

          <Route
            path="/minhaclinica"
            element={
              <PermissionGuard
                requiredPermissions={ROUTE_PERMISSIONS["/minhaclinica"]}
                routePath="/minhaclinica"
              >
                <MyClinicPage />
              </PermissionGuard>
            }
          />

          <Route
            path="/perfil"
            element={
              <PermissionGuard
                requiredPermissions={ROUTE_PERMISSIONS["/perfil"]}
                routePath="/perfil"
              >
                <UserProfile />
              </PermissionGuard>
            }
          />

          <Route
            path="/alterar-email"
            element={
              <PermissionGuard
                requiredPermissions={ROUTE_PERMISSIONS["/alterar-email"]}
                routePath="/alterar-email"
              >
                <ChangeEmailWrapper />
              </PermissionGuard>
            }
          />

          <Route
            path="/alterar-senha"
            element={
              <PermissionGuard
                requiredPermissions={ROUTE_PERMISSIONS["/alterar-senha"]}
                routePath="/alterar-senha"
              >
                <ChangePasswordWrapper />
              </PermissionGuard>
            }
          />

          <Route
            path="/cadastro-usuario"
            element={
              <PermissionGuard
                requiredPermissions={ROUTE_PERMISSIONS["/cadastro-usuario"]}
                routePath="/cadastro-usuario"
              >
                <ClientRegisterReturn />
              </PermissionGuard>
            }
          />

          <Route
            path="/clientes/novo"
            element={
              <PermissionGuard
                requiredPermissions={ROUTE_PERMISSIONS["/clientes/novo"]}
                routePath="/clientes/novo"
              >
                <ClientRegisterReturn />
              </PermissionGuard>
            }
          />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
