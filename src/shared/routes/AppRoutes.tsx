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
import Login from "../../pages/Login";
import Home from "../../pages/dashboard/Home";
import ClientList from "../../components/ClientList";

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
        <Route path="/home" element={<Home />} />
        <Route path="/clientes" element={<ClientList />} />
      </Route>

      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
