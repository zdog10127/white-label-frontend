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
  PersonalVideo,
  Settings,
} from "@mui/icons-material";

import ProtectedRoute from "./PrivateRoute";
import UserProfile from "../../pages/userPage";
import Login from "../../pages/Login";
import Home from "../../pages/Home";
import ClientList from "../../components/ClientList";
import ClientRegister from "../../pages/clientRegister";
import PrivateLayout from "../layouts/PrivateLayout";
import Agenda from "../../pages/Schedule";
import AlterCredentials from "../../pages/alterCredentials";

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
          <Route path="/cadastro-usuario" element={<ClientRegister />} />
          <Route path="/perfil" element={<UserProfile />} />
          <Route path="/alterar-credenciais" element={<AlterCredentials />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
