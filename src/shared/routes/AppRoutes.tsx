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

import ProtectedRoute from "./PrivateRoute";
import UserProfile from "../../pages/userPage/userPage";
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

  useEffect(() => {
    setDrawerOptions([
      {
        label: "Painel",
        path: "/home",
        icon: <PersonalVideo fontSize="large" />,
        flexDirection: "column",
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
    ]);
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<PrivateLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/clientes" element={<ClientList />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/cadastro-usuario" element={<ClientRegisterReturn />} />
          <Route path="/perfil" element={<UserProfile />} />
          <Route path="/alterar-email" element={<ChangeEmailWrapper />} />
          <Route path="/alterar-senha" element={<ChangePasswordWrapper />} />
          <Route path="/clientes/novo" element={<ClientRegisterReturn />} />

          <Route path="/financeiro" element={<FinancialPage />} />
          <Route path="/relatorios" element={<ReportPage />} />
          <Route path="/marketing" element={<MarketingPage />} />
          <Route path="/configuracao" element={<SettingsPage />} />
          <Route path="/minhaclinica" element={<MyClinicPage />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
