import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../contexts/DrawerContext";
import { useEffect } from "react";
import {
  Apartment,
  Article,
  CalendarMonth,
  Campaign,
  Groups2,
  Paid,
  People,
  PersonalVideo,
  Settings,
} from "@mui/icons-material";

import ProtectedRoute from "./PrivateRoute";
import PermissionProtectedRoute from "../../components/ProtectedRoute";
import { Permissions } from "../../hooks/userPermission";
import UserProfile from "../../pages/userPage";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Home from "../../pages/Home";
import ClientList from "../../components/ClientList";
import ClientRegister from "../../pages/clientRegister";
import ClientDetails from "../../pages/ClientDetails";
import ClientEdit from "../../pages/ClientEdit";
import PrivateLayout from "../layouts/PrivateLayout";
import Agenda from "../../pages/AppointmentPage";
import AlterCredentials from "../../pages/alterCredentials";
import SettingsPage from "../../pages/settingsPage";
import PatientReportPage from "../../pages/PatientReportPage";
import ConsolidatedReportPage from "../../pages/ConsolidatedReportPage";
import UsersListPage from "../../pages/UserListPage";
import ReportsPage from "../../pages/ReportPage";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    // Pegar usuário do localStorage
    const userJson = localStorage.getItem('user');
    let user = null;
    if (userJson) {
      try {
        user = JSON.parse(userJson);
      } catch {}
    }

    // Verificar se tem permissão
    const hasPermission = (permission: string) => {
      if (!user) return false;
      if (user.role?.toLowerCase() === 'administrator') return true;
      if (!user.permissions || user.permissions.length === 0) return false;
      return user.permissions.includes(permission);
    };

    // Montar menu baseado em permissões
    const menuItems = [
      {
        label: "Painel",
        path: "/home",
        icon: <PersonalVideo fontSize="large" />,
        flexDirection: "column" as const, // FIX: adicionar 'as const'
      },
      {
        label: "Clientes",
        path: "/clientes",
        icon: <Groups2 fontSize="large" />,
      },
    ];

    // Adicionar Usuários apenas se tiver permissão
    if (hasPermission(Permissions.ViewUsers)) {
      menuItems.push({
        label: "Usuários",
        path: "/usuarios",
        icon: <People fontSize="large" />,
      });
    }

    // Resto do menu
    menuItems.push(
      {
        label: "Agenda",
        path: "/agenda",
        icon: <CalendarMonth fontSize="large" />,
      },
    );

    // Adicionar Relatórios apenas se tiver permissão
    if (hasPermission(Permissions.ViewReports)) {
      menuItems.push({
        label: "Relatórios",
        path: "/relatorios",
        icon: <Article fontSize="large" />,
      });
    }

    // menuItems.push(
    //   {
    //     label: "Configuração",
    //     path: "/configuracao",
    //     icon: <Settings fontSize="large" />,
    //   },
    // );

    setDrawerOptions(menuItems);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/criar-conta" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<PrivateLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/clientes" element={<ClientList />} />
          <Route path="/clientes/:id" element={<ClientDetails />} />
          <Route 
            path="/clientes/:id/editar" 
            element={
              <PermissionProtectedRoute 
                requiredPermissions={[Permissions.EditPatients]}
                showAsModal
              >
                <ClientEdit />
              </PermissionProtectedRoute>
            } 
          />
          <Route 
            path="/cadastro-usuario" 
            element={
              <PermissionProtectedRoute 
                requiredPermissions={[Permissions.CreatePatients]}
                showAsModal
              >
                <ClientRegister />
              </PermissionProtectedRoute>
            } 
          />
          <Route 
            path="/usuarios" 
            element={
              <PermissionProtectedRoute requiredPermissions={[Permissions.ViewUsers]}>
                <UsersListPage />
              </PermissionProtectedRoute>
            } 
          />
          <Route path="/agenda" element={<Agenda />} />
          <Route 
            path="/relatorios" 
            element={
              <PermissionProtectedRoute requiredPermissions={[Permissions.ViewReports]}>
                <ReportsPage />
              </PermissionProtectedRoute>
            } 
          />
          <Route 
            path="/relatorios/paciente/:patientId" 
            element={
              <PermissionProtectedRoute requiredPermissions={[Permissions.ViewReports]}>
                <PatientReportPage />
              </PermissionProtectedRoute>
            } 
          />
          <Route 
            path="/relatorios/consolidado" 
            element={
              <PermissionProtectedRoute requiredPermissions={[Permissions.ViewReports]}>
                <ConsolidatedReportPage />
              </PermissionProtectedRoute>
            } 
          />
          <Route path="/configuracao" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};